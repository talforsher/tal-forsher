import React, { useState } from "react";
import "./App.css";

interface Country {
  name: string;
  flag: string;
}

function App() {
  const [countriesList, setCountriesList] = useState([]);
  return <div className="App"></div>;
}

export default App;
