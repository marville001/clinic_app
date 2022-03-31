import React from "react";
import { Route, Routes } from "react-router-dom";
import Loading from "./components/Loading";

const Login = React.lazy(() => import("./pages/Login"));

const App = () => {
    return (
        <div className="min-h-screen ">
            <React.Suspense fallback={<Loading />}>
                <Routes>
                    <Route exact path="/" element={<Login />} />
                </Routes>
            </React.Suspense>
        </div>
    );
};

export default App;
