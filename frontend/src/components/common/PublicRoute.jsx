import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const PublicRoute = ({ children }) => {
    const { user } = useSelector((state) => state.auth);
    const hasSession = localStorage.getItem("hasSession");

    // If user is already authenticated, don't let them visit signin/signup, redirect to dashboard
    if (user || hasSession) {
        return <Navigate to="/" replace />;
    }

    return children;
};
