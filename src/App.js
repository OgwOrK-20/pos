import React from "react";
import { BrowserRouter } from "react-router-dom";
// import "./App.scss";
import Dashboard from "./dashboard/Dashboard";
import "./App.scss"
import router from "./router";
function App() {
  return <BrowserRouter>
    <Dashboard>
      {router}
    </Dashboard>
  </BrowserRouter>
}

export default App;
