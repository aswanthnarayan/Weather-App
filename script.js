    // const apiKey = '40df1897895146cbbe4211346231211';
    const mainDetails = document.querySelector('.main-details')
    const cityInput = document.getElementById('search');
    const temperature = document.getElementById('temperature');
    const weatherInfo = document.getElementById('weather-info');
    const cityName = document.getElementById('city-name')
    const findButton = document.getElementById('find-weather');
    const infoImg=document.querySelector(".condition img");
    const contentDiv=document.querySelector(".content");


    

function getWeather() {
  const existingCity=document.querySelector('.forecast-container');
        if(existingCity){
            existingCity.remove(); /// to remove the existing forecast details
        }
    const city = cityInput.value;
    fetch(`
    https://api.weatherapi.com/v1/forecast.json?key=40df1897895146cbbe4211346231211&q=${city}&days=3&aqi=yes&alerts=yes`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
                const temp = data.current.temp_c; 
                temperature.innerText=Math.round(temp); //add current temp value
                cityName.innerHTML=data.location.name; //add city name
                //add weather info& icon
                weatherInfo.innerText=data.current.condition.text;  
                let src=data.current.condition.icon; 
                infoImg.setAttribute('src',src)
                infoImg.style.display="block"

              
            let forecastContainer=document.createElement('div');
            forecastContainer.className='forecast-container'
                data.forecast.forecastday.forEach(days => {
                    let forecastDetails=document.createElement('div');
                    forecastDetails.className="forecast";
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
                            contentDiv.appendChild(forecastContainer)
                })    
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



  