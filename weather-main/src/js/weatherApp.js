import { createHourlyCards, createDailyCards } from "./weatherForecastCards.js";
import { startLoadingState, endLoadingState } from "./setLoadingState.js";
import { handleError } from "./handleError.js";
import { currentWeatherData } from "./currentWeatherData.js";
import { weatherForecastData } from "./weatherForecastData.js";

const API_KEY = import.meta.env.VITE_API_KEY;

const searchBoxInput = document.querySelector(".search-box-input");
const gpsButton = document.querySelector(".gps-button");
const ctaButton = document.querySelector(".cta-button");
const topButton = document.querySelector(".top-button");

createHourlyCards();
createDailyCards();

const fetchWeatherData = async (data) => {
  try {
    await startLoadingState();
    await currentWeatherData(data, API_KEY);
    await weatherForecastData(data, API_KEY);
    await endLoadingState();
    console.log(data);
  } catch (error) {
    handleApiError(error);
    console.log(error);
  }
};

const handleApiError = (error) => {
  if (error.message === "Failed to fetch") {
    handleError(
      "Uh oh! It looks like you're not connected to the internet. Please check your connection and try again.",
      "Refresh Page"
    );
  } else {
    handleError(error.message, "Try Again");
  }
};

const getUserLocation = async () => {
  const successCallback = async (position) => {
    const data = {
      lat: position.coords.latitude,
      lon: position.coords.longitude,
    };

    await fetchWeatherData(data);
  };

  const errorCallback = (error) => {
    console.log(error);
    fetchWeatherData("Malkajgiri");
  };

  navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

searchBoxInput.addEventListener("keyup", async (event) => {
  if (event.key === "Enter") {
    await fetchWeatherData({ lat: "", lon: "" }); // Assuming initial values are empty strings
  }
});

gpsButton.addEventListener("click", getUserLocation);

ctaButton.addEventListener("click", () => {
  window.open("https://github.com/nandu6565/weather/");
});

topButton.addEventListener("click", scrollToTop);

getUserLocation();
