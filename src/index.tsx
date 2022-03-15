import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import MainApp from "./components/threejs/app"

ReactDOM.render(
  <React.StrictMode>
    <div>
      <MainApp />
    </div>
  </React.StrictMode>,  
  document.getElementById("root")
);
