import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import NavProvider from "./nav.context";
import { Provider } from "react-redux";
import store from "./redux/store";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
    <Provider store={store}>
        <NavProvider>
            <Router>
                <App />
            </Router>
        </NavProvider>
    </Provider>
);
