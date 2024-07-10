import Cookies from "js-cookie";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { StorageKeys } from "../services/key/keys";
import { Navigate, Outlet } from "react-router-dom";
import { useState } from "react";

export default function BasicLayout() {
    const [searchResult, setSearchResults] = useState([]);
    const handleSearchResults = (results) =>{
        setSearchResults(results);
    }
    return Cookies.get(StorageKeys.ACCESS_TOKEN) &&
        (location.pathname === "/dang-nhap" || location.pathname === "/dang-ky") ? (
        <Navigate to="/" replace />
    ) : (
        <div className="flex flex-col min-h-screen">
            <Header onSearchResults={handleSearchResults}/>
            <Outlet />
            <Footer />
        </div>
    );
}
