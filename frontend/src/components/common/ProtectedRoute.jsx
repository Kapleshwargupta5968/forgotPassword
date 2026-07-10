import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const ProtectedRoute = ({ children }) => {
    // We check if either the user object exists in Redux, or if we have a session flag
    const { user } = useSelector((state) => state.auth);
    const hasSession = localStorage.getItem("hasSession");

    // If neither exists, redirect to signin
    if (!user && !hasSession) {
        return <Navigate to="/signin" replace />;
    }

    // Otherwise, render the protected component
    return children;
};
