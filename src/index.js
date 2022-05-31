import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import NavProvider from "./contexts/nav.context";
import { Provider } from "react-redux";
import store from "./redux/store";
import NotificationsProvider from "./contexts/notification.context";
import SocketProvider from "./contexts/socket.context";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
    <Provider store={store}>
        <NavProvider>
            <NotificationsProvider>
                <SocketProvider>
                    <Router>
                        <App />
                    </Router>
                </SocketProvider>
            </NotificationsProvider>
        </NavProvider>
    </Provider>
);
