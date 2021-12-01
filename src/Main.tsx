import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";

import {Refetch, Country} from './types'

const Main = ({
  setRefetch,
  countriesList,
}: {
  setRefetch: React.Dispatch<React.SetStateAction<Refetch>>;
  countriesList: Country[];
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const listToRender = useCallback(
    () =>
      countriesList
        .filter((country) => country.name.toLowerCase().includes(searchQuery.toLowerCase()))
        .map(({ name, flag }) => (
          <li key={name} className="country">
            <Link to="flag" state={{ country: { name, flag } }}>
              {name}
            </Link>
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
      <button
        onClick={() => {
          window.localStorage.clear();
          window.location.reload();
        }}
      >
        Refresh
      </button>
      <ul className="countries">{listToRender()}</ul>
    </div>
  );
};

export default Main;
