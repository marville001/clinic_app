import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import NavProvider from "./nav.context";

ReactDOM.render(
    <React.StrictMode>
        <NavProvider>
            <Router>
                <App />
            </Router>
        </NavProvider>
    </React.StrictMode>,
    document.getElementById("root")
);
