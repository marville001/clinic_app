import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminHome from "./pages/AdminHome";
import Admins from "./pages/Admins";
import Doctors from "./pages/Doctors";
import Patients from "./pages/Patients";
import Secretaries from "./pages/Secretaries";

const Login = React.lazy(() => import("./pages/Login"));

const App = () => {
    return (
        <div className="min-h-screen ">
            <Routes>
                <Route exact path="/" element={<Login />} />
                <Route path="/home" element={<AdminHome />} />
                <Route path="/doctors" element={<Doctors />} />
                <Route path="/admins" element={<Admins />} />
                <Route path="/patients" element={<Patients />} />
                <Route path="/secretaries" element={<Secretaries />} />
            </Routes>
        </div>
    );
};

export default App;
