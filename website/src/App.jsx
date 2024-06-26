import {Suspense} from "react";
import loadable from "@loadable/component";
import AuthLayout from "./layouts/AuthLayout";
import BasicLayout from "./layouts/BasicLayout";
import LayoutNotSearch from "./layouts/LayoutNotSearch";
import {CircularProgress} from "@mui/material";
import {BrowserRouter, Routes, Route} from "react-router-dom";

const Home = loadable(() => import("./pages/Home"));
const Logout = loadable(() => import("./pages/Auth/Logout"));
const Login = loadable(() => import("./pages/Auth/Login"));
const Register = loadable(() => import("./pages/Auth/Register"));
const ForgotPassword = loadable(() => import("./pages/Auth/ForgotPassword"));
const Notify = loadable(() => import("./pages/Auth/Notify"));

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AuthLayout/>}>
                    <Route path="/logout" element={<Logout/>}/>
                </Route>
                <Route element={<BasicLayout/>}>
                    <Route
                        index
                        element={
                            <Suspense fallback={<CircularProgress/>}>
                                <Home title="HomePage"/>
                            </Suspense>
                        }
                    />
                </Route>
                <Route element={<LayoutNotSearch/>}>
                    <Route
                        path="/login"
                        element={
                            <Suspense fallback={<CircularProgress/>}>
                                <Login title="Login"/>
                            </Suspense>
                        }
                    />
                    <Route
                        path="/register"
                        element={
                            <Suspense fallback={<CircularProgress/>}>
                                <Register title="Register"/>
                            </Suspense>
                        }
                    />
                    <Route
                        path="/forgot-password"
                        element={
                            <Suspense fallback={<CircularProgress/>}>
                                <ForgotPassword title="Forgot Password"/>
                            </Suspense>
                        }
                    /><Route
                    path="/notify"
                    element={
                        <Suspense fallback={<CircularProgress/>}>
                            <Notify title="Notification"/>
                        </Suspense>
                    }
                />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
