import React, { useEffect } from "react";
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
import AddPatient from "./pages/AddPatient";
import EditPatient from "./pages/EditPatient";
import Appointments from "./pages/Appointments";
import ViewPatient from "./pages/ViewPatient";
import ForgotPassword from "./pages/ForgotPassword";
import ViewDoctor from "./pages/ViewDoctor";
import { useDispatch } from "react-redux";
import { getUserProfileAction } from "./redux/actions/auth.action";

const App = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUserProfileAction());
    }, [dispatch]);

    return (
        <div className="min-h-screen ">
            <Routes>
                <Route exact path="/" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/home" element={<AdminHome />} />
                <Route path="/doctors" element={<Doctors />} />
                <Route path="/doctors/new" element={<AddDoctor />} />
                <Route path="/doctors/:id" element={<ViewDoctor />} />
                <Route path="/doctors/:id/edit" element={<EditDoctor />} />
                <Route path="/admins" element={<Admins />} />
                <Route path="/patients" element={<Patients />} />
                <Route path="/patients/new" element={<AddPatient />} />
                <Route path="/patients/:id" element={<ViewPatient />} />
                <Route path="/patients/:id/edit" element={<EditPatient />} />
                <Route path="/secretaries" element={<Secretaries />} />
                <Route path="/messages" element={<Messages />} />
                <Route path="/appointments/:id" element={<Appointments />} />
            </Routes>
        </div>
    );
};

export default App;
