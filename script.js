
    const cityInput = document.getElementById('search');
    const findButton = document.getElementById('find-weather');
    const contentDiv=document.querySelector(".content");


    //Default screen for weather app
    function onloadFetch(){
        let city = 'kannur';
        fetch(`
        https://api.weatherapi.com/v1/forecast.json?key=40df1897895146cbbe4211346231211&q=${city}&days=3&aqi=yes&alerts=yes`)
            .then(response => response.json())
            .then(data => {
                    WeatherDataCreation(data);
                    forecastDataCreation(data);
                    otherDataCreation(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                
            });
    }


// main function to fetch api and show data on the screen
function getWeather() {
    const existingForecast=document.querySelector('.forecast');
    const existingDetails = document.querySelector('.main-details')
    const existingOtherDetails = document.querySelector('.other-details')

        if(existingForecast||existingDetails||existingOtherDetails){
            existingForecast.remove(); 
            existingDetails.remove();
            existingOtherDetails.remove();
        }
    const city = cityInput.value;
    fetch(`
    https://api.weatherapi.com/v1/forecast.json?key=40df1897895146cbbe4211346231211&q=${city}&days=3&aqi=yes&alerts=yes`)
        .then(response => response.json())
        .then(data => {
                WeatherDataCreation(data);
                forecastDataCreation(data);
                otherDataCreation(data);
        })
        .catch(error => {
            // contentDiv.innerHTML = '';
            const errorImage = document.createElement('img');
            errorImage.className='error';
            errorImage.src = 'Images/error.png';
            errorImage.alt = 'Error Image';
            errorImage.style.width = '100%';
            errorImage.style.height = '100%';
            errorImage.style.backgroundSize = 'cover';
            contentDiv.appendChild(errorImage);

            setTimeout(() => {
                contentDiv.innerHTML = ''; 
                onloadFetch(); 
            }, 3000)

        });
        
}




//function for creating top div to show temprature and details 

function WeatherDataCreation(data){
    let WeatherCondition= data.current.condition.text;
    // console.log(WeatherCondition);
    const temp = data.current.temp_c;
    let imgSrc=`https:${data.current.condition.icon}`;
    const mainDetails = document.createElement('div');
    mainDetails.className='main-details';
    mainDetails.innerHTML=`
       <p id="city-name">${data.location.name}</p>
       <div class="data">
          <h1 id="temperature">${Math.round(temp)}&deg</h1>
        <div class="condition">
          <p id="weather-info">${data.current.condition.text}</p>
        <img src=${imgSrc} alt=${data.current.condition.text}>
        </div>
    `
    contentDiv.appendChild(mainDetails)
    backgroundGenerator(WeatherCondition);
}

//function for creating forecast-details

function forecastDataCreation(data){
    let forecastContainer=document.createElement('div');
                forecastContainer.className='forecast-container'
                let forecast=document.createElement('div');
                forecast.className='forecast'

                forecast.innerHTML=`<p>3 Days Forecast</p>`
                data.forecast.forecastday.forEach(days => {
                    let forecastDetails=document.createElement('div');
                    forecastDetails.className="forecast-main";
                    let forecastDate=dateConverter(days.date)
                    forecastDetails.innerHTML=`
                      <p class="date">${forecastDate}</p> 
                        <div class="forecast-data">
                            <p>${days.day.condition.text}</p>
                            <img src="${days.day.condition.icon}" alt="${days.day.condition.text}">
                        </div>
                        <div class="temp">
                            <p>Min: ${Math.round(days.day.mintemp_c)}&degc</p>
                            <p>Max: ${Math.round(days.day.maxtemp_c)}&degc</p>
                        </div>
                        `
                            forecastContainer.appendChild(forecastDetails)
                            forecast.appendChild(forecastContainer)
                })    
                contentDiv.appendChild(forecast) ;
}


//function for creating last two divs for wind and humidity data

        function otherDataCreation(data){

            let otherDetailes=document.createElement('div');
            otherDetailes.className='other-details'
            otherDetailes.innerHTML=`
                <div class="humidity">
            
                    <div class="feels-like">
                        <p>Feelslike</p>
                        <p>${data.current.feelslike_c}&degc</p>
                    </div>
                    <div class="humidity-data">
                        <p>Humidity</p>
                        <p>${data.current.humidity}</p>
                    </div>
                </div>
                <div class="wind">
                    <div class="wind-kph">
                    <p>${Math.round(data.current.wind_kph)}</p>
                        <div class="measurement">
                            <p>KPH</p>
                            <p>Wind</p>
                        </div>
                    </div>
                    <div class="wind-gust">
                    <p>${Math.round(data.current.gust_kph)}</p>
                        <div class="measurement">
                            <p>KPH</p>
                            <p>Guests</p>
                        </div>
                    </div>
                </div>
            `
            contentDiv.appendChild(otherDetailes) ;
               
        }




//function for changing the background according to weather condition 

  function backgroundGenerator(apiKey){
    let bgImg=contentDiv;
    bgImg.style.backgroundSize = 'cover';
    switch (apiKey) {
        case "Clear":
            bgImg.style.backgroundImage = "url('/Images/Clear.png')";
            break;
        case "Sunny":
                bgImg.style.backgroundImage = "url('/Images/Sunny.png')";
                break;
        case "Cloudy":
                bgImg.style.backgroundImage = "url('/Images/Cloudy.png')";
                
                break;
        case "Overcast":
                bgImg.style.backgroundImage = "url('/Images/Cloudy.png')";
                break;
        case "Rain"||"Moderate or heavy rain shower":
                bgImg.style.backgroundImage = "url('/Images/Rainy.png')";
                break;
        case "Moderate or heavy rain shower":
                bgImg.style.backgroundImage = "url('/Images/Rainy.png')";
                break;
        case "Snow":
                bgImg.style.backgroundImage = "url('/Images/Snow.png')";
                break;
        case "Thunderstorms":
                bgImg.style.backgroundImage = "url('/Images/Thunderstorm.png')";
                break;
        case "Fog":
                bgImg.style.backgroundImage = "url('/Images/Fog.png')";
                break;
        case "Mist":
                bgImg.style.backgroundImage = "url('/Images/Mist.png')";
                break;
        case "Mist":
                bgImg.style.backgroundImage = "url('/Images/Mist.png')";
                break;
        case "Windy":
                bgImg.style.backgroundImage = "url('/Images/Windy.png')";
                break;
        case "Partly Cloudy":
                bgImg.style.backgroundImage = "url('/Images/Partly Cloudy.png')";
                break;
        case "Hail":
                bgImg.style.backgroundImage = "url('/Images/Hail.png')";
                break;
        case "Sleet":
                bgImg.style.backgroundImage = "url('/Images/Sleet.png')";
                break;
        default:
                bgImg.style.backgroundImage = "url('/Images/default.png')";
                break;

    }
  }

  // function for correcting the date format
  function dateConverter(date){
    //date='2023-05-10';
    let newFormat=date.split('-');
    let newDate=newFormat[2]+'/'+newFormat[1]+'/'+newFormat[0];
    return newDate;
  }



window.addEventListener('DOMContentLoaded',onloadFetch)
findButton.addEventListener('click',getWeather);
