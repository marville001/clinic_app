import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import NavProvider from "./nav.context";
import { Provider } from "react-redux";
import store from "./redux/store";
ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
        <NavProvider>
            <Router>
                <App />
            </Router>
        </NavProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);
