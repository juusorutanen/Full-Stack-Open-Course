import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const CountryFilter = ({ countries, filter, message }) => {

  
  const filteredCountries =
    countries?.filter((country) =>
      country.name.common.toLowerCase().includes(filter.toLowerCase())
    ) || [];

  if (filteredCountries.length > 10) {
    return <p>Too many countries</p>;
  } else if (filteredCountries.length === 1) {
    return (
      <div>
        {filteredCountries.map((country, index) => (
          <div>
            <h2 key={index}>{country.name.common}</h2>
            <p>Capital: {country.capital}</p>
            <p>Area: {country.area}</p>
            <h3>Languages</h3>
            <ul>
              {Object.values(country.languages).map((language, index) => (
                <li key={index}>{language}</li>
              ))}
            </ul>
            <img src={country.flags.png}></img>
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <ul>
        {filteredCountries.map((country) => (
          <p key={country.name.common}>{country.name.common}</p>
        ))}
      </ul>
    );
  }
};



function App() {
  const [countries, setCountries] = useState(null);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    if (filter) {
      axios
        .get(`https://restcountries.com/v3.1/name/${filter}`)
        .then((response) => {
          setCountries(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error.message);
          setCountries([]);
        });
    }
  }, [filter]);



  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <>
      <form>
        <label>find countries: </label>
        <input value={filter} onChange={handleChange} />
        <CountryFilter countries={countries} filter={filter}/>
      </form>
    </>
  );
}

export default App;
