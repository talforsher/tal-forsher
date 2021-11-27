import React, { useState, useEffect, useMemo } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./Main";
import Flag from "./Flag";

interface Raw {
  name: { common: string };
  flags: { svg?: string };
}

interface Country {
  name: string;
  flag?: string;
}

const App = () => {
  const [countriesList, setCountriesList] = useState<Country[]>([]);
  const [refetch, setRefetch] = useState<{ query: string; count: number }>({
    query: "",
    count: 0,
  });

  const storage: Country[] = useMemo(
    () =>
      Object.values(localStorage).flatMap((country) =>
        country.includes("name") ? JSON.parse(country) : [],
      ),
    [localStorage],
  );

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
          : [
              ...storage,
              ...countriesListToUpdate.filter(
                (country) => !storage.map((object) => object.name).includes(country.name),
              ),
            ],
      );
    };

    fetchCountries();
  }, [refetch.count]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main setRefetch={setRefetch} countriesList={countriesList} />} />
        <Route path="flag" element={<Flag />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
