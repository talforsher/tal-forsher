import React, { useCallback, useEffect, useState } from "react";
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
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [countriesList, setCountriesList] = useState<Country[]>([]);
  const [refetch, setRefetch] = useState<{ query: string; count: number }>({
    query: "",
    count: 0,
  });

  useEffect(() => {
    const fetchCountries = async () => {
      const data = await fetch(
        `https://restcountries.com/v3.1/${refetch.count ? `name/${refetch.query}` : "all"}`,
      );
      const fetchedCountriesList: Raw[] = await data.json();
      const countriesListToUpdate: Country[] = fetchedCountriesList.map((country) => ({
        name: country.name.common,
        flag: country.flags?.svg,
      }));
      setCountriesList(
        refetch.count
          ? countriesList.map((country) => {
              if (country.name === refetch.query) {
                return Object.assign({}, countriesListToUpdate[0], {
                  flag: countriesListToUpdate[0].flag,
                });
              }
              return country;
            })
          : countriesListToUpdate,
      );
    };

    fetchCountries();
  }, [refetch.count]);

  const listToRender = useCallback(
    () =>
      countriesList
        .filter((country) => country.name.toLowerCase().includes(searchQuery.toLowerCase()))
        .map(({ name, flag }) => (
          <li key={name} className="country">
            {name}
            {flag ? (
              <img width={40} src={flag} alt={name} />
            ) : (
              <div
                className="default"
                onClick={() => setRefetch((curr) => ({ query: name, count: curr.count + 1 }))}
              />
            )}
          </li>
        )),
    [searchQuery, countriesList],
  );

  return (
    <div className="App">
      <input type="text" onChange={(e) => setSearchQuery(e.target.value)} />
      <ul className="countries">{listToRender()}</ul>
    </div>
  );
}

export default App;
