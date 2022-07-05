import { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import { useNotifications } from "./notification.context";

const SocketContext = createContext();

let socket;
const END_POINT =
    process.env.NODE_ENV === "production"
        ? "https://my-clinic-api.herokuapp.com"
        : "http://localhost:9003";

const SocketProvider = ({ children }) => {
    const { authDetails } = useSelector((state) => state.authState);

    const [socketConnected, setSocketConnected] = useState(false);

    const { setNotifications, setNewNotification } = useNotifications();

    useEffect(() => {
        if (authDetails?._id) {
            socket = io(END_POINT);
            socket.emit("setup", authDetails);
            socket.on("connected", () => setSocketConnected(true));

            socket.on("new notification", (data) => {
                setNotifications((prev) => [data, ...prev]);
                setNewNotification(true);
            });
        }
    }, [authDetails, setNewNotification, setNotifications]);

    return (
        <SocketContext.Provider
            value={{
                socket,
                socketConnected,
            }}
        >
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => useContext(SocketContext);

export default SocketProvider;
