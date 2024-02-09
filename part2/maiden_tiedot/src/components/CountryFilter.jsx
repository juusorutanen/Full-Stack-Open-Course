import { useState } from "react";
import CountryCard from "./CountryCard";

const CountryFilter = ({ countries, filter }) => {
  const [showCountry, setShowCountry] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleshowCountry = (country) => {
    setSelectedCountry(country);
    // set the button to toggle
    setShowCountry(!showCountry);
  };
  const filteredCountries =
    countries?.filter((country) =>
      country.name.common.toLowerCase().includes(filter.toLowerCase())
    ) || [];

  if (filteredCountries.length > 10) {
    return <p>Too many countries! Change your filter.</p>;
  } else if (filteredCountries.length === 1) {
    return (
      <div>
        {filteredCountries.map((country, index) => (
          <CountryCard key={index} country={country} />
        ))}
      </div>
    );
  } else {
    return (
      <ul>
        {filteredCountries.map((country) => (
          <li key={country.name.common}>
            <p>{country.name.common}</p>
            <button onClick={() => handleshowCountry(country)}>Show</button>
            {showCountry && selectedCountry === country ? (
              <CountryCard country={country} />
            ) : null}
          </li>
        ))}
      </ul>
    );
  }
};

export default CountryFilter;
