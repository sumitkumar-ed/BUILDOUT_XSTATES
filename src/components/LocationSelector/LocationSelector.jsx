import React, { useState, useEffect } from "react";
import axios from "axios";
import "./LocationSelector.css";

const LocationSelector = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get("https://crio-location-selector.onrender.com/countries")
      .then((response) => setCountries(response.data))
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  const handleCountryChange = (e) => {
    const country = e.target.value;
    setSelectedCountry(country);
    setSelectedState("");
    setSelectedCity("");
    setMessage("");
    axios
      .get(
        `https://crio-location-selector.onrender.com/country=${country}/states`
      )
      .then((response) => setStates(response.data))
      .catch((error) => console.error("Error fetching states:", error));
  };

  const handleStateChange = (e) => {
    const state = e.target.value;
    setSelectedState(state);
    setSelectedCity("");
    setMessage("");
    axios
      .get(
        `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${state}/cities`
      )
      .then((response) => setCities(response.data))
      .catch((error) => console.error("Error fetching cities:", error));
  };

  const handleCityChange = (e) => {
    const city = e.target.value;
    setSelectedCity(city);
    setMessage(`You Selected ${city}, ${selectedState}, ${selectedCountry}`);
  };

  return (
    <div className="location-selector">
      <h1>Select Location</h1>
      <div className="dropdowns-container">
        <select
          id="country"
          value={selectedCountry}
          onChange={handleCountryChange}
        >
          <option value="" disabled>
            Select Country
          </option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
        <select
          id="state"
          value={selectedState}
          onChange={handleStateChange}
          disabled={!selectedCountry}
        >
          <option value="" disabled>
            Select State
          </option>
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
        <select
          id="city"
          value={selectedCity}
          onChange={handleCityChange}
          disabled={!selectedState}
        >
          <option value="" disabled>
            Select City
          </option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>
      {message && (
        <div className="message">
          {`You selected ${selectedCity}, ${selectedState}, ${selectedCountry}`}
        </div>
      )}
    </div>
  );
};

export default LocationSelector;
