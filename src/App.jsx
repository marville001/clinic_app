import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
import ViewPatient from "./pages/ViewPatient";
import ForgotPassword from "./pages/ForgotPassword";
import ViewDoctor from "./pages/ViewDoctor";
import { useDispatch } from "react-redux";
import { getUserProfileAction } from "./redux/actions/auth.action";
import ResetPassword from "./pages/ResetPassword";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import MyPatients from "./pages/MyPatients";
import ViewAssignedPatient from "./pages/ViewAssignedPatient";
import EditSecretary from "./pages/EditSecretary";

const App = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUserProfileAction());
    }, [dispatch]);

    return (
        <div className="min-h-screen mx-auto">
            <Routes>
                <Route exact path="/" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password/:token" element={<ResetPassword />} />
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
                <Route path="/secretaries/:id/edit" element={<EditSecretary />} />
                <Route path="/messages" element={<Messages />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/assigned-patients" element={<MyPatients />} />
                <Route path="/assigned-patients/:id" element={<ViewAssignedPatient />} />
                <Route path="/profile" element={<Profile />} />

            </Routes>

            <ToastContainer />
        </div>
    );
};

export default App;
