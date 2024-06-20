import { Suspense } from "react";
import loadable from "@loadable/component";
import AuthLayout from "./layouts/AuthLayout";
import BasicLayout from "./layouts/BasicLayout";
import LayoutNotSearch from "./layouts/LayoutNotSearch";
import { CircularProgress } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Home = loadable(() => import("./pages/Home"));
const Logout = loadable(() => import("./pages/Logout"));
const Login = loadable(() => import("./pages/Login"));
// const Register = loadable(() => import("./pages/Register"));

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AuthLayout />}>
                    <Route path="/logout" element={<Logout />} />
                </Route>
                <Route element={<BasicLayout />}>
                    <Route
                        index
                        element={
                            <Suspense fallback={<CircularProgress />}>
                                <Home title="HomePage" />
                            </Suspense>
                        }
                    />
                </Route>
                <Route element={<LayoutNotSearch />}>
                    <Route
                        path="/login"
                        element={
                            <Suspense fallback={<CircularProgress />}>
                                <Login title="Login" />
                            </Suspense>
                        }
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
