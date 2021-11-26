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

function App() {
  const [countriesList, setCountriesList] = useState<Country[]>([]);
  const [refetch, setRefetch] = useState<number>(0);
  useEffect(() => {
    const fetchCountries = async () => {
      const data = await fetch("https://restcountries.com/v3.1/all");
      const fetchedCountriesList: Raw[] = await data.json();
      const countriesListToUpdate: Country[] = fetchedCountriesList.map((country) => ({
        name: country.name.common,
        flag: country.flags?.svg,
      }));
      setCountriesList(countriesListToUpdate);
    };

    fetchCountries();
  }, [refetch]);

  return (
    <div className="App">
      <ul className="countries">
        {[
          {
            name: "test",
            flag: Math.round(Math.random() * 2) ? "https://flagcdn.com/sd.svg" : undefined,
          },
          ...countriesList,
        ].map((country) => (
          <li className="country">
            {country.name}{" "}
            {country.flag ? (
              <img width={40} src={country.flag} alt={country.name} />
            ) : (
              <div className="default" onClick={() => setRefetch((curr) => curr + 1)} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
