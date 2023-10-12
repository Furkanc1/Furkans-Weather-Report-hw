const openWeatherApiKey = 'e77365f4013c7543eca0a224e6a01e78';
const locationText = document.querySelector(`.locationValue`);
const dateText = document.querySelector(`.dateValue`);
const temp = document.querySelector(`.tempValue`);
const wind = document.querySelector(`.windValue`);
const humidity = document.querySelector(`.humidityValue`);
const searchForm = document.querySelector(`.searchForm`);
const locationField = document.querySelector(`.locationField`);

const convertFromKelvinToFahrenheit = (tempInKelvin) => ((tempInKelvin - 273.15) * (9/5) + 32).toFixed(2);
const convertFromMSToMPH = (speedInMS) => (speedInMS * 2.237).toFixed(2);

const refreshWeatherData = (weatherData) => {
    locationText.innerHTML = `${weatherData?.name}, ${weatherData?.sys.country}`;
    // fill in date (XX/XX/XXXX)
    dateText.innerHTML = dayjs().format(`MM/DD/YYYY`);
    // fills in temp (F)
    temp.innerHTML = convertFromKelvinToFahrenheit(weatherData.main.temp);
    // fills in weather (MPH)
    wind.innerHTML = convertFromMSToMPH(weatherData.wind.speed);
    humidity.innerHTML = weatherData.main.humidity;
}

// to improve this fetch call, later on i will implement javascript
// ASYNC await + try catch
// async await = a way for javacript to see a function and run it in the backround and continue to do its work.
// try catch = javascript sends a bot to see if a function will fail, if a function will fail the bot tells javascript, "dont even run that function at all."

const fetchWeatherData = async (city) => {
  try {
    await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${openWeatherApiKey}`).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            alert(`Error fetching data`);
        }
    }).then(weatherData => {
        if (weatherData != undefined) {
            console.log(`Raw data from Open Weather`, weatherData);
            refreshWeatherData(weatherData);
        }
    }).catch(error => {
        console.log(error);
    }) 
  } catch (error) {
    console.log(error);
  }
}

// forms by defualt want to refresh page --> we want to prevent default behavior `formSubmitEvent.preventDefault();`
searchForm.addEventListener(`submit`, formSubmitEvent => {
    formSubmitEvent.preventDefault();
    if (locationField.value != ``) {
        if (locationField.value.length > 3) {
            fetchWeatherData(locationField.value);
        } else {
            console.log(`Please type valid city`);
        }
    }    
});