import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import { StorageKeys } from "~/services/key/keys.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {checkAdmin} from "../../services/auth/auth.js";

export default function BlankLayout() {
    return checkAdmin &&
    (location.pathname === "/dang-nhap" || location.pathname === "/dang-ky") ? (
        <Navigate to="/admin" replace />
    ) : (
        <div className="flex flex-col min-h-screen">
            <ToastContainer />
            <Outlet />
        </div>
    );
}
