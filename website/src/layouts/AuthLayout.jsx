import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";
import { StorageKeys } from "../services/key/keys";

export default function AuthLayout() {
    return !Cookies.get(StorageKeys.ACCESS_TOKEN) ? <Navigate to="/dang-nhap" replace /> : <Outlet />;
}
