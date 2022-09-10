import React from "react";
import "./App.scss";
import Navbar from "./navbar/Navbar";
function App() {
  return (
    <div id="App">
      <div className="logo-container">Logo</div>
      <div className="nav-container">
        <Navbar></Navbar>
      </div>
      <div className="sidebar-container">sidebar</div>
      <div className="window-container">window</div>
    </div>
  );
}

export default App;
