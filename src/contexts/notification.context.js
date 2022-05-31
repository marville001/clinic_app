import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";
import { useSelector } from "react-redux";
import { getApi, putApi } from "../api";
import { API_BASE } from "../constants/networkUrls";

const NotificationsContext = createContext();

const NotificationsProvider = ({ children }) => {
    const { authDetails } = useSelector((state) => state.authState);

    const [notifications, setNotifications] = useState([]);
    const [newNotification, setNewNotification] = useState(false);

    const toggleNotificationStatus = async (id, status) => {
        await putApi(`${API_BASE}notifications/${id}`, {
            read: status,
        });

        loadNotifications();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const loadNotifications = useCallback(async () => {
        const { data } = await getApi(
            `${API_BASE}notifications/${authDetails?._id}`
        );

        setNotifications(data.notifications);
    }, [authDetails?._id]);

    useEffect(() => {
        if (authDetails?._id) {
            loadNotifications();
        }
    }, [authDetails?._id, loadNotifications]);

    return (
        <NotificationsContext.Provider
            value={{
                notifications,
                setNotifications,
                newNotification,
                setNewNotification,
                toggleNotificationStatus,
            }}
        >
            {children}
        </NotificationsContext.Provider>
    );
};

export const useNotifications = () => useContext(NotificationsContext);

export default NotificationsProvider;
