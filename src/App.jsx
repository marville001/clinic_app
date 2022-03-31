import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminHome from "./pages/AdminHome";
import Doctors from "./pages/Doctors";

const Login = React.lazy(() => import("./pages/Login"));

const App = () => {
    return (
        <div className="min-h-screen ">
            <Routes>
                <Route exact path="/" element={<Login />} />
                <Route path="/home" element={<AdminHome />} />
                <Route path="/doctors" element={<Doctors />} />
            </Routes>
        </div>
    );
};

export default App;
