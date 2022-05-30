import { createContext, useContext, useState } from "react";

const NotificationsContext = createContext();

const NotificationsProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([1,2,3]);
    const [newNotification, setNewNotification] = useState(false);

    return (
        <NotificationsContext.Provider
            value={{
                notifications,
                setNotifications,
                newNotification,
                setNewNotification,
            }}
        >
            {children}
        </NotificationsContext.Provider>
    );
};

export const useNotifications = () => useContext(NotificationsContext);

export default NotificationsProvider;
