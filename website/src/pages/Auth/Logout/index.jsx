import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { StorageKeys } from '../../../services/key/keys.js';
import Cookies from "js-cookie";

const LogoutPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        Cookies.remove(StorageKeys.ACCESS_TOKEN);
        // localStorage.removeItem(StorageKeys.USER_NAME);
        // localStorage.removeItem(StorageKeys.USER_ROLE);

        navigate('/');
    }, [navigate]);

    return (
        <div>
            <p>Đăng xuất</p>
        </div>
    );
};

export default LogoutPage;
