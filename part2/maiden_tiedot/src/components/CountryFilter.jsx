import CountryCard from "./CountryCard";

const CountryFilter = ({ countries, filter }) => {
  const filteredCountries =
    countries?.filter((country) =>
      country.name.common.toLowerCase().includes(filter.toLowerCase())
    ) || [];

  if (filteredCountries.length > 10) {
    return <p>Too many countries</p>;
  } else if (filteredCountries.length === 1) {
    return (
      <div>
        {filteredCountries.map((country, index) => (<CountryCard key={index} country={country}/>
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

export default CountryFilter;
