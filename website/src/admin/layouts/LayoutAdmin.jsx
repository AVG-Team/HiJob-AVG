import React, { useState } from 'react';
import {Navigate, Outlet, useNavigate} from "react-router-dom";
import Header from "../components/Header/index.jsx";
import SidebarAdmin from "../components/SidebarAdmin/index.jsx";
import "../css/style.css";
import {checkAdmin} from "../../services/auth/auth.js";
import {ToastContainer} from "react-toastify";

export default function layoutAdmin () {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    // const check = checkAdmin();
    const check = true;
    return !check ? (
            <Navigate to="/admin/login" replace/>
        ) : (
        <>
            <ToastContainer />
            <div className="">
                {/* <!-- ===== Page Wrapper Start ===== --> */}
                <div className="flex h-screen overflow-hidden">
                    {/* <!-- ===== Sidebar Start ===== --> */}
                    <SidebarAdmin sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
                    {/* <!-- ===== Sidebar End ===== --> */}

                    {/* <!-- ===== Content Area Start ===== --> */}
                    <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                        {/* <!-- ===== Header Start ===== --> */}
                        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
                        {/* <!-- ===== Header End ===== --> */}

                        {/* <!-- ===== Main Content Start ===== --> */}
                        <main>
                            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                                <Outlet/>
                            </div>
                        </main>
                        {/* <!-- ===== Main Content End ===== --> */}
                    </div>
                    {/* <!-- ===== Content Area End ===== --> */}
                </div>
                {/* <!-- ===== Page Wrapper End ===== --> */}
            </div>
        </>
    );
};

