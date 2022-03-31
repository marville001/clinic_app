import React from "react";
import { Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import AdminHome from "./pages/AdminHome";
import Admins from "./pages/Admins";
import Doctors from "./pages/Doctors";
import Messages from "./pages/Messages";
import Patients from "./pages/Patients";
import Secretaries from "./pages/Secretaries";
import AddDoctor from "./pages/AddDoctor";
import EditDoctor from "./pages/EditDoctor";

const App = () => {
    return (
        <div className="min-h-screen ">
            <Routes>
                <Route exact path="/" element={<Login />} />
                <Route path="/home" element={<AdminHome />} />
                <Route path="/doctors" element={<Doctors />} />
                <Route path="/doctors/new" element={<AddDoctor />} />
                <Route path="/doctors/:id/edit" element={<EditDoctor />} />
                <Route path="/admins" element={<Admins />} />
                <Route path="/patients" element={<Patients />} />
                <Route path="/secretaries" element={<Secretaries />} />
                <Route path="/messages" element={<Messages />} />
            </Routes>
        </div>
    );
};

export default App;
