import React from "react";
import "./App.css";
import Autocomplete from "./Autocomplete/autocomplete";

function App() {
  return (
    <div className="autocomplete-wrapper">
      <h1>Cities Autocomplete</h1>
      <Autocomplete />
    </div>
  );
}

export default App;
