import { formatDate } from "./convertUnits";

export const filterForecastData = async (weatherForecastData) => {
  const previousFilterContainer = document.querySelector(".filter-container");
  const uniqueDates = new Set();
  const body = document.querySelector("body");

  if (previousFilterContainer) {
    previousFilterContainer.remove();
  }

  for (let i = 0; i < weatherForecastData.list.length; i++) {
    uniqueDates.add(await formatDate(weatherForecastData.list[i].dt, "short"));
  }

  const filterContainer = document.createElement("div");
  filterContainer.classList.add("filter-container");

  body.insertBefore(filterContainer, body.children[4]);

  filterContainer.addEventListener("wheel", (event) => {
    event.preventDefault();

    filterContainer.scrollLeft += event.deltaY * 2;
  });

  uniqueDates.forEach(async (uniqueDate) => {
    const filterItem = document.createElement("div");
    filterItem.classList.add("filter-item");

    filterItem.innerHTML = uniqueDate;

    filterContainer.appendChild(filterItem);
  });

  const filterItems = document.querySelectorAll(".filter-item");

  const firstActiveDate = [...uniqueDates][0];
  const dailyWeatherForecastDates = document.querySelectorAll(
    ".daily-weather-forecast-date"
  );

  const firstFilterItem = document.querySelector(".filter-item");
  console.log(firstActiveDate);
  if (firstFilterItem === firstActiveDate) {
    firstFilterItem.classList.add("active");

    dailyWeatherForecastDates.forEach((dailyWeatherForecastDate) => {
      if (dailyWeatherForecastDate.innerHTML === firstActiveDate) {
        dailyWeatherForecastDate.parentElement.parentElement.style.display =
          "flex";
      } else {
        dailyWeatherForecastDate.parentElement.parentElement.style.display =
          "none";
      }
    });
  }

  filterItems.forEach(async (filterItem) => {
    filterItem.addEventListener("click", async () => {
      const dailyWeatherForecastDates = document.querySelectorAll(
        ".daily-weather-forecast-date"
      );

      dailyWeatherForecastDates.forEach((dailyWeatherForecastDate) => {
        dailyWeatherForecastDate.parentElement.parentElement.style.display =
          "none";
      });

      dailyWeatherForecastDates.forEach((dailyWeatherForecastDate) => {
        if (dailyWeatherForecastDate.innerHTML === filterItem.innerHTML) {
          dailyWeatherForecastDate.parentElement.parentElement.style.display =
            "flex";
        }
      });

      filterItems.forEach((filterItem) => {
        filterItem.classList.remove("active");
      });
      filterItem.classList.add("active");
    });
  });
};
