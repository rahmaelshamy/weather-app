import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [city, setCity] = useState("Egypt");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const currentDate = new Date();
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const month = months[currentDate.getMonth()];
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();
  const formattedDate = `${month} ${day}, ${year}`;

  const API_KEY = "747eca2e5acc6112a545f48b3cd0416d";

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error("City not found");
      }

      const data = await response.json();

      if (!data || !data.weather || !data.main) {
        throw new Error("Invalid weather data");
      }

      setWeatherData(data);
      setError(null); // clear error if success
    } catch (err) {
      console.error(err);
      setError("City not found. Please try again.");
      setWeatherData(null); // clear old weather
    }
  };

  useEffect(() => {
    fetchWeatherData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInputChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchWeatherData();
  };

  const getWeatherIconUrl = (main) => {
    switch (main) {
      case "Clouds":
        return process.env.PUBLIC_URL + "/icons/thunder.png";
      case "Rain":
        return process.env.PUBLIC_URL + "/icons/rain_with_cloud.png";
      case "Mist":
        return process.env.PUBLIC_URL + "/icons/Tornado.png";
      case "Haze":
        return process.env.PUBLIC_URL + "/icons/sun.png";
      case "Clear":
        return process.env.PUBLIC_URL + "/icons/sun.png";
      default:
        return process.env.PUBLIC_URL + "/icons/default.png";
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1 className="container_date">{formattedDate}</h1>

        {error && <p style={{ color: "red" }}>{error}</p>}

        {weatherData && (
          <div className="weather_data">
            <h2 className="container_city">{weatherData.name}</h2>

            <img
              className="container_img"
              src={getWeatherIconUrl(weatherData.weather[0].main)}
              width="180px"
              alt="Weather Icon"
            />

            <h2 className="container_degree">{weatherData.main.temp}°C</h2>
            <h2 className="country_per">{weatherData.weather[0].main}</h2>
          </div>
        )}

        <form className="form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="input"
            placeholder="Enter city name"
            value={city}
            onChange={handleInputChange}
          />
          <button type="submit">Get</button>
        </form>
      </div>
    </div>
  );
}

export default App;
