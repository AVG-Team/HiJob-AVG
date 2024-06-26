import { Suspense, useEffect } from "react";
import loadable from "@loadable/component";
import AuthLayout from "./layouts/AuthLayout";
import BasicLayout from "./layouts/BasicLayout";
import LayoutNotSearch from "./layouts/LayoutNotSearch";
import { CircularProgress } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const Home = loadable(() => import("./pages/Home"));
const Logout = loadable(() => import("./pages/Logout"));
const Login = loadable(() => import("./pages/Login"));
const JobDetail = loadable(() => import("./pages/JobDetail"));
const JobApplied = loadable(() => import("./pages/JobApplied"));
const JobFollowing = loadable(() => import("./pages/JobFollowing"));
const ManageCV = loadable(() => import("./pages/ManageCV"));
const ManageJob = loadable(() => import("./pages/ManageJob"));

function App() {
    useEffect(() => {
        AOS.init();
        AOS.refresh();
    }, []);
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
                                <Home title="Trang Chủ" />
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
                    <Route
                        path="/viec-lam"
                        element={
                            <Suspense fallback={<CircularProgress />}>
                                <JobDetail title="Job Detail" />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/viec-lam-da-ung-tuyen"
                        element={
                            <Suspense fallback={<CircularProgress />}>
                                <JobApplied title="Việc Làm Đã Ứng Tuyển" />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/viec-lam-dang-theo-doi"
                        element={
                            <Suspense fallback={<CircularProgress />}>
                                <JobFollowing title="Việc Làm Đang Theo Dõi" />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/quan-ly-cv"
                        element={
                            <Suspense fallback={<CircularProgress />}>
                                <ManageCV title="Quản Lý CV" />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/quan-ly-viec-lam"
                        element={
                            <Suspense fallback={<CircularProgress />}>
                                <ManageJob title="Quản Lý Viêc Lam" />
                            </Suspense>
                        }
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
