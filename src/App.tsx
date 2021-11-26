import React, { useEffect, useState } from "react";
import "./App.css";

interface Raw {
  name: { common: string };
  flags: { svg?: string };
}

interface Country {
  name: string;
  flag?: string;
}

const fetchCountries = async () => {
  const data = await fetch("https://restcountries.com/v3.1/all");
  const fetchedCountriesList: Raw[] = await data.json();
  const countriesListToUpdate: Country[] = fetchedCountriesList.map((country) => ({
    name: country.name.common,
    flag: country.flags?.svg,
  }));
};

function App() {
  const [countriesList, setCountriesList] = useState<Country[]>([]);
  useEffect(() => {
    fetchCountries();
  });
  return <div className="App"></div>;
}

export default App;
