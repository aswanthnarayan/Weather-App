    const apiKey = 'caffb233f28f9a323b52742e3bb9525d';
    const mainDetails = document.querySelector('.main-details')
    const cityInput = document.getElementById('search');
    const temperature = document.getElementById('temperature');
    const weatherInfo = document.getElementById('weather-info');
    const cityName = document.getElementById('city-name')
    const findButton = document.getElementById('find-weather');
   
    

function getWeather() {
  const city = cityInput.value;
  console.log('City:', city); 
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
             const temp = data.main.temp;
             temperature.innerText=Math.round(temp);
             cityName.innerHTML=data.name;
             weatherInfo.innerText=data.weather[0].description;              
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            temperature.innerText="No Data Found"
            cityName.innerHTML="";
            weatherInfo.innerText="";  
            temperature.style.fontSize="1.5rem";
        });
}


findButton.addEventListener('click',getWeather);
