import React, { Component } from "react";
import "./App.scss";
import MapContainer from "./components/MapContainer/MapContainer";

class App extends Component {
  render() {
    return (
      <div className="App">
        <MapContainer />
      </div>
    );
  }
}

export default App;
