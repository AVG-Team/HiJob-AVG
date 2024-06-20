import Cookies from "js-cookie";
import Footer from "../components/Footer";
import { StorageKeys } from "../services/key/keys";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/index.jsx";

export default function LayoutNotSearch() {
    return Cookies.get(StorageKeys.ACCESS_TOKEN) &&
        (location.pathname === "/login" || location.pathname === "/register") ? (
        <Navigate to="/" replace />
    ) : (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
}
