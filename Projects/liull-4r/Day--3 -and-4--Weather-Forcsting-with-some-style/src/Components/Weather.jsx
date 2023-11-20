import { useState, useEffect } from "react";
import "./style.css";

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState("");
  const [city, setCity] = useState("Addis Ababa");
  const [searchCity, setSearchCity] = useState("");

  const apiKey = "your_api_key"; // Replace with your OpenWeatherMap API key

  const fetchWeatherData = async (cityName) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`
      );
      const data = await response.json();
      setWeatherData(data);
      console.log(data);
    } catch (error) {
      console.log("Error fetching weather data: ", error);
      setWeatherData("");
    }
  };

  useEffect(() => {
    fetchWeatherData(city);
  }, [city]);

  const handleSearch = () => {
    setCity(searchCity);
    setSearchCity("");
  };

  return (
    <div>
      <h1 className="head">Online Weather Forecast App</h1>
      <div className="text-center">
        <div>
          <div>
            <input
              type="text"
              placeholder="Search city"
              onChange={(e) => setSearchCity(e.target.value)}
            />
            <button
              className="btn"
              style={{
                padding: "1rem",
                marginLeft: "1rem",
                backgroundColor: "blue",
                color: "white",
                border: "none",
                borderRadius: "4px",
              }}
              type="button"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      {weatherData && weatherData.weather && weatherData.weather.length > 0 ? (
        <div className="text-center ">
          <div className="first">
            <button className="country">
              Country:{weatherData.sys.country}
            </button>
            <button className="city"> City:{weatherData.name}</button>
            <button className="description">
              Description:{weatherData.weather[0].description}
            </button>
          </div>
          <div className="second">
            <button className="temp">
              Temperature: {(weatherData.main.temp - 273.15).toFixed(2)}°C
            </button>
            <button className="humidity">
              Humidity: {weatherData.main.humidity}%
            </button>
            <button className="pressure">
              Pressure: {weatherData.main.pressure} hPa
            </button>
          </div>
          <div className="third">
            <button className="wind">
              Wind Speed: {weatherData.wind.speed} m/s
            </button>
            <button className="visibility">
              Visibility: {weatherData.visibility / 1000} km
            </button>
            <button className="sunrise">
              Sunrise:
              {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}
            </button>
            <button className="sunset">
              Sunset:
              {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}
            </button>
          </div>
        </div>
      ) : (
        <p className="none">No weather data available</p>
      )}
      {!weatherData && <p className="loading">Loading...</p>}
    </div>
  );
};

export default WeatherApp;
