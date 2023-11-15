
    const cityInput = document.getElementById('search');
    const findButton = document.getElementById('find-weather');
    const contentDiv=document.querySelector(".content");


    

function getWeather() {



    const existingForecast=document.querySelector('.forecast');
    const existingDetails = document.querySelector('.main-details')
    const existingOtherDetails = document.querySelector('.other-details')

        if(existingForecast){
            existingForecast.remove(); 
        }
        if(existingDetails){
            existingDetails.remove();
        }
        if(existingOtherDetails){
            existingOtherDetails.remove();
        }
    const city = cityInput.value;
    fetch(`
    https://api.weatherapi.com/v1/forecast.json?key=40df1897895146cbbe4211346231211&q=${city}&days=3&aqi=yes&alerts=yes`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
                let WeatherCondition= data.current.condition.text;
                console.log(WeatherCondition);
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

            let forecastContainer=document.createElement('div');
                forecastContainer.className='forecast-container'
                let forecast=document.createElement('div');
                forecast.className='forecast'
                forecast.innerHTML=`<p>3 Days Forecast</p>`
                data.forecast.forecastday.forEach(days => {
                    let forecastDetails=document.createElement('div');
                    forecastDetails.className="forecast-main";
                    forecastDetails.innerHTML=`
                      <p>${days.date}</p> 
                        <div class="forecast-data">
                            <p>${days.day.condition.text}</p>
                            <img src="${days.day.condition.icon}" alt="${days.day.condition.text}">
                        </div>
                        <div class="temp">
                            <p>Min: ${days.day.mintemp_c}</p>
                            <p>Max: ${days.day.maxtemp_c}</p>
                        </div>
                        `
                            forecastContainer.appendChild(forecastDetails)
                            forecast.appendChild(forecastContainer)
                })    
                
                contentDiv.appendChild(forecast) ;


                let otherDetailes=document.createElement('div');
                otherDetailes.className='other-details'
                otherDetailes.innerHTML=`
                    <div class="humidity">
                
                        <div class="feels-like">
                            <p>Feelslike</p>
                            <p>${data.current.feelslike_c}</p>
                        </div>
                        <div class="humidity-data">
                            <p>Humidity</p>
                            <p>${data.current.humidity}</p>
                        </div>
                    </div>
                    <div class="wind">
                        <div class="wind-kph">
                        <p>${data.current.wind_kph}</p>
                            <div class="measurement">
                                <p>KPH</p>
                                <p>Wind</p>
                            </div>
                        </div>
                        <div class="wind-gust">
                        <p>${data.current.gust_kph}</p>
                            <div class="measurement">
                                <p>KPH</p>
                                <p>Guests</p>
                            </div>
                        </div>
                    </div>
                `
                contentDiv.appendChild(otherDetailes) ;
                   
    
        })
        .catch(error => {
            // console.error('Error fetching data:', error);
            // temperature.innerText="No Data Found"
            // cityName.innerHTML="";
            // weatherInfo.innerText="";  
            // temperature.style.fontSize="1.5rem";
        });
}


findButton.addEventListener('click',getWeather);



  function backgroundGenerator(apiKey){
    let bgImg=contentDiv;
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
        case "Rain":
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