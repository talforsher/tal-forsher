import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";

const Main = ({ setRefetch, countriesList }: any) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const listToRender = useCallback(
    () =>
      countriesList
        .filter((country: any) => country.name.toLowerCase().includes(searchQuery.toLowerCase()))
        .map(({ name, flag }: any) => (
          <li key={name} className="country">
            <Link to="flag" state={{ country: { name, flag } }}>
              {name}
            </Link>
            {flag ? (
              <img width={40} src={flag} alt={name} />
            ) : (
              <div
                className="default"
                onClick={() => setRefetch((curr: any) => ({ query: name, count: curr.count + 1 }))}
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
};

export default Main;
