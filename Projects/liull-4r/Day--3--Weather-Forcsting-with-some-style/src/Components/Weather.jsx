import { useState, useEffect } from "react";
const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState("");
  const [city, setCity] = useState("Addis Ababa");
  const [searchCity, setSearchCity] = useState("");

  const apiKey = "YOUR_API_KEY_HERE"; // Replace with your OpenWeatherMap API key

  const fetchWeatherData = async (cityName) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`
      );
      const data = await response.json();
      setWeatherData(data);
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
    <div className="container mt-5">
      <h1 className="text-center mb-4">Weather Forecast</h1>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter city"
              onChange={(e) => setSearchCity(e.target.value)}
            />
            <button
              className="btn btn-primary"
              type="button"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      {weatherData && weatherData.weather && weatherData.weather.length > 0 ? (
        <div className="card">
          <div className="card-body">
            <p className="card-text">Country:{weatherData.sys.country}</p>
            <h2 className="card-title">{weatherData.name}</h2>
            <p className="card-text">{weatherData.weather[0].description}</p>
            <p className="card-text">
              Temperature: {(weatherData.main.temp - 273.15).toFixed(2)}°C
            </p>
            <p className="card-text">Humidity: {weatherData.main.humidity}%</p>
            <p className="card-text">
              Pressure: {weatherData.main.pressure} hPa
            </p>
            <p className="card-text">
              Wind Speed: {weatherData.wind.speed} m/s
            </p>
            <p className="card-text">
              Visibility: {weatherData.visibility / 1000} km
            </p>
            <p className="card-text">
              Sunrise:{" "}
              {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}
            </p>
            <p className="card-text">
              Sunset:{" "}
              {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}
            </p>
          </div>
        </div>
      ) : (
        <p className="text-center">No weather data available</p>
      )}
      {!weatherData && <p className="text-center">Loading...</p>}
    </div>
  );
};

export default WeatherApp;
