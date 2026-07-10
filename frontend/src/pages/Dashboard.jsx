import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Signout } from '../services/api/authServices';
import { authLogout } from '../features/authSlice';
import toast from 'react-hot-toast';

const Dashboard = () => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await Signout();
            dispatch(authLogout());
            toast.success("Successfully logged out!");
            navigate("/signin");
        } catch (error) {
            toast.error("Failed to logout.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-4xl">👋</span>
                </div>
                
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    Welcome back!
                </h1>
                
                {user ? (
                    <div className="mb-8">
                        <p className="text-lg text-gray-600 font-medium">{user.name}</p>
                        <p className="text-gray-500">{user.email}</p>
                    </div>
                ) : (
                    <p className="text-gray-500 mb-8">You are successfully logged in.</p>
                )}
                
                <button 
                    onClick={handleLogout}
                    className="w-full py-3 px-4 bg-red-50 hover:bg-red-100 text-red-600 font-medium rounded-xl transition-colors duration-200"
                >
                    Sign out
                </button>
            </div>
        </div>
    );
};

export default Dashboard;
