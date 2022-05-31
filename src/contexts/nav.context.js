import { createContext, useEffect, useState } from "react";

export const NavContext = createContext();

const NavProvider = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const handleWidthChange = (e) => {
        let width = document.body.clientWidth;
        if (width < 1240) {
            setSidebarOpen(false);
        } else {
            setSidebarOpen(true);
        }
    };

    useEffect(() => {
        if (document.body.clientWidth < 1240) {
            setSidebarOpen(false);
        }
        window.addEventListener("resize", handleWidthChange);

        return () => window.removeEventListener("resize", handleWidthChange);
    }, []);
    return (
        <NavContext.Provider value={{ sidebarOpen, setSidebarOpen }}>
            {children}
        </NavContext.Provider>
    );
};

export default NavProvider;
