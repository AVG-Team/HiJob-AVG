import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import { StorageKeys } from "~/services/key/keys.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function BlankLayout() {
    return Cookies.get(StorageKeys.ACCESS_TOKEN) &&
        (location.pathname === "/dang-nhap" || location.pathname === "/dang-ky") ? (
        <Navigate to="/" replace />
    ) : (
        <div className="flex flex-col min-h-screen">
            <ToastContainer />
            <Outlet />
        </div>
    );
}
