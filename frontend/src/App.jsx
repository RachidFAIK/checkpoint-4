import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { CurrentUserContextProvider } from "../context/userContext";
import { CurrentImageContextProvider } from "../context/imageContext";
import "./style/index.css";
import Routing from "./components/Routing";

function App() {
  return (
    <Router>
      <CurrentImageContextProvider>
        <CurrentUserContextProvider>
          <Routing />
        </CurrentUserContextProvider>
      </CurrentImageContextProvider>
    </Router>
  );
}

export default App;
