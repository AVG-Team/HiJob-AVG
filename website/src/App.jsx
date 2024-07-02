import { Suspense, useEffect } from "react";
import loadable from "@loadable/component";
import AuthLayout from "./layouts/AuthLayout";
import BasicLayout from "./layouts/BasicLayout";
import LayoutNotSearch from "./layouts/LayoutNotSearch";
import { CircularProgress } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Profile from "./pages/Profile/index.jsx";
import AboutUs from "./pages/AboutUs/index.jsx";

const Home = loadable(() => import("./pages/Home"));
const Logout = loadable(() => import("./pages/Logout"));
const Login = loadable(() => import("./pages/Login"));
const JobDetail = loadable(() => import("./pages/JobDetail"));
const JobApplied = loadable(() => import("./pages/JobApplied"));
const JobFollowing = loadable(() => import("./pages/JobFollowing"));
const ManageCV = loadable(() => import("./pages/ManageCV"));
const ManageJob = loadable(() => import("./pages/ManageJob"));
const CompanyDetail = loadable(() => import("./pages/CompanyDetail"));
const PrivacyPolicy = loadable(() => import("./pages/PrivacyPolicy"));

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
                    <Route
                        path="/cong-ty"
                        element={
                            <Suspense fallback={<CircularProgress />}>
                                <CompanyDetail title="Công ty" />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/cv"
                        element={
                            <Suspense fallback={<CircularProgress />}>
                                <Profile title="Hồ sơ CV" />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/about-us"
                        element={
                            <Suspense fallback={<CircularProgress />}>
                                <AboutUs title="Về chúng tôi" />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/privacy-policy"
                        element={
                            <Suspense fallback={<CircularProgress />}>
                                <PrivacyPolicy title="Chính sách bảo mật" />
                            </Suspense>
                        }
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
