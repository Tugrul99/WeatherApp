import React, { useState } from 'react';
import './Weather.css';
import searchIcon from './img/search-interface-symbol.png';
import humidityIcon from './img/humidity.png';
import windIcon from './img/wind.png';
import presureIcon from './img/pressure-gauge.png'
import sunIcon from './img/clear.png';
import cloud from './img/cloud.png';
import rain from './img/rain.png';
import snow from './img/snow.png';
import drizzle from './img/drizzle.png';

console.log('API Key from .env:', process.env.REACT_APP_API_KEY);


function Weather() {
    const [weather, setWeather] = useState({
        humidity: null,
        windSpeed: null,
        temperature: null,
        location: '',
        pressure: null,
        weatherDescripton: ''
    });

    const [img, setImg] = useState(cloud);
    const api_key = process.env.REACT_APP_API_KEY; 


    async function fetchWeatherData(location) {
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${api_key}&units=metric`;
            const response = await fetch(url);
            if (!response.ok) throw new Error('Network response was not ok');

            const data = await response.json();
            setWeather({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: data.main.temp,
                location: data.name,
                pressure: data.main.pressure
            });

            switch (data.weather[0].icon.slice(0, -1)) {
                case '01': setImg(sunIcon); break;
                case '02': setImg(cloud); break;
                case '03': case '04': setImg(drizzle); break;
                case '09': case '10': setImg(rain); break;
                case '13': setImg(snow); break;
                default: setImg(sunIcon);
            }
        } catch (error) {
            
            console.error('Error fetching weather data:', error);
        }
    }

    const handleSearch = () => {
        const location = document.querySelector('.searchInput').value.trim();
        if (location) fetchWeatherData(location);
    };
    

   function handleKeyDown(event) {
    if (event.key === 'Enter') {
        handleSearch();
    }
}


    return (
        <div className="container">
            <div className="top-part">
                <input onKeyDown={handleKeyDown}  className="searchInput" placeholder='Type city name..' type="text" />
                <div className="search-main" onClick={handleSearch}>
                    <img className='search-icon' src={searchIcon} alt="" />
                </div>
            </div>
            <div className="city-name">
                <h1 className="city-text">{weather.location ? `${(weather.location).toUpperCase()}` :  "City Name"}</h1>
                <img className='weather-img' src={img} alt="" />
                <h1>{weather.temperature ? `${Math.floor(weather.temperature)}°C` : 'Temp °'}</h1>
            </div>
            <div className="weather-components">
                <div className='weather-status'>
                    <img src={humidityIcon} alt="" />
                    <div>{weather.humidity ? `${Math.floor(weather.humidity)}%` : ''}</div>
                    <p>Humidity</p>
                </div>
                <div className='weather-status'>
                    <img src={windIcon} alt="" />
                    <div>{weather.windSpeed ? `${Math.floor(weather.windSpeed)} km/h` : ''}</div>
                    <p>Wind Speed</p>
                </div>
                <div className='weather-status'>
                    <img src={presureIcon} alt="" />
                    <div>{weather.pressure ? `${Math.floor(weather.pressure)}` : ''}</div>
                    <p>Pressure</p>
                </div>
            </div>
        </div>
    );
}

export default Weather;
