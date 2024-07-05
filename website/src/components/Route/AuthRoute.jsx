import React from 'react';
import {Route, Navigate, Outlet} from 'react-router-dom';
import {checkAuth} from '../../services/auth/auth';

const isAuthenticated = () => {
    return checkAuth();
};

const AuthRoute = () => {
    return isAuthenticated() ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthRoute;
