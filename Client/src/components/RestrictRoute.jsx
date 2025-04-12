import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function RestrictRoute({ children }) {
    const authData = useSelector((state) => state.auth.userInfo);

    if (!authData) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default RestrictRoute;
