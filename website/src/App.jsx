import { Suspense, useEffect } from "react";
import loadable from "@loadable/component";
import AuthLayout from "./layouts/AuthLayout";
import BasicLayout from "./layouts/BasicLayout";
import LayoutNotSearch from "./layouts/LayoutNotSearch";
import { CircularProgress } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import AuthRoute from "./components/Route/AuthRoute.jsx";
import Page404 from './components/Page404/index.jsx';
// Layout Admin
import BlankLayout from "./admin/layouts/BlankLayout";
import LayoutAdmin from "./admin/layouts/LayoutAdmin";

const Home = loadable(() => import("./pages/Home"));
const Register = loadable(() => import("./pages/Auth/Register"));
const ForgotPassword = loadable(() => import("./pages/Auth/ForgotPassword"));
const ChangePassword = loadable(() => import("./pages/Auth/ForgotPassword/ChangePassword"));
const Notify = loadable(() => import("./pages/Auth/Notify"));
const Logout = loadable(() => import("./pages/Auth/Logout"));
const Login = loadable(() => import("./pages/Auth/Login"));
const JobDetail = loadable(() => import("./pages/JobDetail"));
const Confirm = loadable(() => import("./pages/Auth/Confirm"));
const JobApplied = loadable(() => import("./pages/JobApplied"));
const JobFollowing = loadable(() => import("./pages/JobFollowing"));
const ManageCV = loadable(() => import("./pages/ManageCV"));
const ManageJob = loadable(() => import("./pages/ManageJob"));
const CompanyDetail = loadable(() => import("./pages/CompanyDetail"));
const Profile = loadable(() => import("./pages/Profile"));
const AboutUs = loadable(() => import("./pages/AboutUs"));
const PrivacyPolicy = loadable(() => import("./pages/PrivacyPolicy"));
const Recruitment = loadable(() => import("./pages/Recruitment"));
// ADMIN ROUTE
const LoginAdmin = loadable(() => import("./admin/pages/Auth"));
const Dashboard = loadable(() => import("./admin/pages/Dashboard"));
const About = loadable(() => import("./admin/pages/About"));
// Users
const UsersAdmin = loadable(() => import("./admin/pages/Users"));
const CreateAdmin = loadable(() => import("./admin/pages/Users/create"));
const EditAdmin = loadable(() => import("./admin/pages/Users/edit"));
// Jobs
const JobsAdmin = loadable(() => import("./admin/pages/Job"))
const EditJob = loadable(() => import("./admin/pages/Job/components/FormEdit.jsx"))
//Company
const CompaniesAdmin = loadable(() => import("./admin/pages/Company"))
const FormEdit = loadable(() => import("./admin/pages/Company/components/FormEdit.jsx"))
//Skills
const SkillsAdmin = loadable(() => import("./admin/pages/Skill"))
const EditSkill = loadable(() => import("./admin/pages/Skill/components/FormEdit.jsx"))
const CreateSkill = loadable(() => import("./admin/pages/Skill/components/FormCreate.jsx"))
//Level
const LevelAdmin = loadable(() => import("./admin/pages/Level"));
const EditLevel = loadable(() => import("./admin/pages/Level/components/FormEdit.jsx"));
const CreateLevel = loadable(() => import("./admin/pages/Level/components/FormCreate.jsx"))
//JobType
const JobTypeAdmin = loadable(() => import("./admin/pages/JobType"));
const EditJobType = loadable(() => import("./admin/pages/JobType/components/FormEdit.jsx"));
const CreateJobType = loadable(() => import("./admin/pages/JobType/components/FormCreate.jsx"));

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
                        path="/cong-ty"
                        element={
                            <Suspense fallback={<CircularProgress />}>
                                <CompanyDetail title="Công ty" />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/ve-chung-toi"
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
                                <LoginAdmin title="Đăng Nhập Admin" />
                            </Suspense>
                        }
                    />
                </Route>
                <Route element={<LayoutAdmin/>}>
                    <Route
                        path="/admin"
                        element={
                            <Suspense fallback={<CircularProgress />}>
                                <Dashboard title="Admin" />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/admin/about"
                        element={
                            <Suspense fallback={<CircularProgress />}>
                                <About title="Về Trang Web Của Tôi" />
                            </Suspense>
                        }
                    />
                </Route>
                <Route element={<LayoutAdmin/>}>
                    {/*Users*/}
                    <Route
                        path="/admin/users"
                        element={
                            <Suspense fallback={<CircularProgress />}>
                                <UsersAdmin title="Quản Lý Người Dùng" />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/admin/users/create"
                        element={
                            <Suspense fallback={<CircularProgress />}>
                                <CreateAdmin title="Thêm Người Dùng" />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/admin/users/:id"
                        element={
                            <Suspense fallback={<CircularProgress />}>
                                <EditAdmin title="Sửa Người Dùng" />
                            </Suspense>
                        }
                    />
                </Route>
                {/*Company*/}
                <Route element={<LayoutAdmin/>}>
                    <Route
                        path="/admin/companies"
                        element={
                            <Suspense fallback={<CircularProgress />}>
                                <CompaniesAdmin title="Quản Lý Công Ty" />
                            </Suspense>
                        }
                    />
                </Route>
                <Route element={<LayoutAdmin/>}>
                    <Route
                        path="/admin/companies/edit/:id"
                        element={
                            <Suspense fallback={<CircularProgress />}>
                                <FormEdit title="Chỉnh Sửa Công Ty" />
                            </Suspense>
                        }
                    />
                </Route>
                {/*Job*/}
                <Route element={<LayoutAdmin/>}>
                    <Route
                        path="/admin/jobs"
                        element={
                            <Suspense fallback={<CircularProgress />}>
                                <JobsAdmin title="Quản Lý Công Việc" />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/admin/jobs/edit/:id"
                        element={
                            <Suspense fallback={<CircularProgress />}>
                                <EditJob title="Chỉnh Sửa Công Việc" />
                            </Suspense>
                        }
                    />
                </Route>

                {/*Skill*/}
                <Route element={<LayoutAdmin/>}>
                    <Route
                        path="/admin/skills"
                        element={
                            <Suspense fallback={<CircularProgress />}>
                                <SkillsAdmin title="Quản Lý Kỹ Năng" />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/admin/skills/edit/:id"
                        element={
                            <Suspense fallback={<CircularProgress />}>
                                <EditSkill title="Sửa Kỹ Năng" />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/admin/skills/create"
                        element={
                            <Suspense fallback={<CircularProgress />}>
                                <CreateSkill title="Thêm Kỹ Năng" />
                            </Suspense>
                        }
                    />
                </Route>
                {/*Level*/}
                <Route element={<LayoutAdmin/>}>
                    <Route
                        path="/admin/levels"
                        element={
                            <Suspense fallback={<CircularProgress />}>
                                <LevelAdmin title="Quản Lý Level" />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/admin/levels/edit/:id"
                        element={
                            <Suspense fallback={<CircularProgress />}>
                                <EditLevel title="Sửa Level" />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/admin/levels/create"
                        element={
                            <Suspense fallback={<CircularProgress />}>
                                <CreateLevel title="Thêm Level" />
                            </Suspense>
                        }
                    />
                </Route>
                {/*JobType*/}
                <Route element={<LayoutAdmin/>}>
                    <Route
                        path="/admin/job-types"
                        element={
                            <Suspense fallback={<CircularProgress />}>
                                <JobTypeAdmin title="Quản Lý Job Type" />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/admin/job-types/edit/:id"
                        element={
                            <Suspense fallback={<CircularProgress />}>
                                <EditJobType title="Sửa Job Type" />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/admin/job-types/create"
                        element={
                            <Suspense fallback={<CircularProgress />}>
                                <CreateJobType title="Thêm Job Type" />
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
