import { useEffect, useState } from "react";
import axios from "axios";
import { kelvinToCelcius } from "../utils/helperfunctions";

const CountryWeatherCard = ({ country }) => {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const capital = country?.capital;
  const [weather, setWeather] = useState(null);

  const img_url = "https://openweathermap.org/img/wn/";

  useEffect(() => {
    const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${API_KEY}`;
    console.log(BASE_URL);
    if (capital)
      axios.get(BASE_URL).then((response) => {
        console.log(response.data);
        setWeather(response.data);
      });
  }, [capital]);

  return (
    <>
      {weather && (
        <div>
          <h1>Weather in {capital}</h1>
          <p>Temperature {kelvinToCelcius(weather.main.temp)} celcius</p>
          <img src={`${img_url}${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description}></img>
          <p>Wind {weather.wind.speed} m/s</p>
        </div>
      )}
    </>
  );
};

export default CountryWeatherCard;
