import Cookies from "js-cookie";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { StorageKeys } from "../services/key/keys";
import { Navigate, Outlet } from "react-router-dom";

export default function BasicLayout() {
    return Cookies.get(StorageKeys.ACCESS_TOKEN) &&
        (location.pathname === "/dang-nhap" || location.pathname === "/dang-ky") ? (
        <Navigate to="/" replace />
    ) : (
        <div className="flex flex-col min-h-screen">
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
}
