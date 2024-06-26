import CountryWeatherCard from "./CountryWeatherCard";

const CountryCard = ({ country }) => {

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
      <h3>Languages</h3>
      <ul>
        {Object.values(country.languages).map((language, index) => (
          <li key={index}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png}></img>
      <CountryWeatherCard country={country}/>
    </div>
  );
};

export default CountryCard;
