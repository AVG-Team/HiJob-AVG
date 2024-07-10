import AOS from "aos";
import "aos/dist/aos.css";
import loadable from "@loadable/component";
import { Suspense, useEffect } from "react";
import AuthLayout from "./layouts/AuthLayout";
import BasicLayout from "./layouts/BasicLayout";
import { CircularProgress } from "@mui/material";
import LayoutNotSearch from "./layouts/LayoutNotSearch";
import AuthRoute from "./components/Route/AuthRoute.jsx";
import BlankLayout from "~/layouts/Admin/BlankLayout.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Page404 from "./components/Page404/index.jsx";
import SearchLayout from "./layouts/SearchLayout";

const Home = loadable(() => import("./pages/Home"));
const Profile = loadable(() => import("./pages/Profile"));
const AboutUs = loadable(() => import("./pages/AboutUs"));
const Login = loadable(() => import("./pages/Auth/Login"));
const ManageCV = loadable(() => import("./pages/ManageCV"));
const Notify = loadable(() => import("./pages/Auth/Notify"));
const Logout = loadable(() => import("./pages/Auth/Logout"));
const ManageJob = loadable(() => import("./pages/ManageJob"));
const JobDetail = loadable(() => import("./pages/JobDetail"));
const Confirm = loadable(() => import("./pages/Auth/Confirm"));
const JobApplied = loadable(() => import("./pages/JobApplied"));
const Register = loadable(() => import("./pages/Auth/Register"));
const Recruitment = loadable(() => import("./pages/Recruitment"));
const SearchingPage = loadable(() => import("./pages/Searching"));
const JobFollowing = loadable(() => import("./pages/JobFollowing"));
const CompanyDetail = loadable(() => import("./pages/CompanyDetail"));
const PrivacyPolicy = loadable(() => import("./pages/PrivacyPolicy"));
const RegisterCompany = loadable(() => import("./pages/RegisterCompany"));
const ForgotPassword = loadable(() => import("./pages/Auth/ForgotPassword"));
const ChangePassword = loadable(() => import("./pages/Auth/ForgotPassword/ChangePassword"));
// ADMIN ROUTE
const LoginAdmin = loadable(() => import("./pages/Admin/Auth"));

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
                    <Route path="/admin/logout" element={<Logout />} />
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
                <Route element={<SearchLayout />}>
                    <Route
                        path="/searching-page"
                        element={
                            <Suspense fallback={<CircularProgress />}>
                                <SearchingPage title="Tìm Kiếm Việc Làm" />
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
                        path="/viec-lam/:id"
                        element={
                            <Suspense fallback={<CircularProgress />}>
                                <JobDetail title="Việc Làm Đang Xem" />
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
                        path="/register"
                        element={
                            <Suspense fallback={<CircularProgress />}>
                                <Register title="Register" />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/forgot-password"
                        element={
                            <Suspense fallback={<CircularProgress />}>
                                <ForgotPassword title="Forgot Password" />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/change-password"
                        element={
                            <Suspense fallback={<CircularProgress />}>
                                <ChangePassword title="Change Password" />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/notify"
                        element={
                            <Suspense fallback={<CircularProgress />}>
                                <Notify title="Notification" />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/oauth2/redirect"
                        element={
                            <Suspense fallback={<CircularProgress />}>
                                <Confirm title="Redirect..." />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/cong-ty/:id"
                        element={
                            <Suspense fallback={<CircularProgress />}>
                                <CompanyDetail title="Công ty đang xem" />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/dang-ky-cong-ty"
                        element={
                            <Suspense fallback={<CircularProgress />}>
                                <RegisterCompany title="Đăng ký công ty" />
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
                    <Route
                        path="/tuyen-dung"
                        element={
                            <Suspense fallback={<CircularProgress />}>
                                <Recruitment title="Tuyển dụng" />
                            </Suspense>
                        }
                    />
                </Route>
                <Route element={<AuthRoute />}>
                    <Route element={<LayoutNotSearch />}>
                        <Route
                            path="/thong-tin-ca-nhan"
                            element={
                                <Suspense fallback={<CircularProgress />}>
                                    <Profile title="Thông Tin Cá Nhân" />
                                </Suspense>
                            }
                        />
                    </Route>
                </Route>

                {/* ADMIN */}
                <Route element={<BlankLayout />}>
                    <Route
                        path="/admin/login"
                        element={
                            <Suspense fallback={<CircularProgress />}>
                                <LoginAdmin title="Login Admin" />
                            </Suspense>
                        }
                    />
                </Route>

                {/* PAGE 404 */}
                <Route
                    path="*"
                    element={
                        <Suspense fallback={<CircularProgress />}>
                            <Page404 />
                        </Suspense>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
