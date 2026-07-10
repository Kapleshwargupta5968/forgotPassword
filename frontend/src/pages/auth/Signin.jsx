import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FormWrapper } from '../../components/common/FormWrapper';
import { InputField } from '../../components/common/InputField';
import { Button } from '../../components/common/Button';
import { Signin as signinApi } from '../../services/api/authServices';
import { useDispatch } from 'react-redux';
import { authStart, authSuccess } from '../../features/authSlice';
import toast from 'react-hot-toast';

const Signin = () => {
    const [globalError, setGlobalError] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    // Initialize useForm in a production-ready way
    const { 
        register, 
        handleSubmit, 
        formState: { errors, isSubmitting } 
    } = useForm({
        defaultValues: { email: "", password: "" }
    });

    const onSubmit = async (data) => {
        setGlobalError(""); // Reset any previous errors
        try {
            dispatch(authStart());
            const response = await signinApi(data);
            dispatch(authSuccess(response));
            toast.success("Successfully signed in!");
            
            // On success, redirect to home page or dashboard
            navigate("/");
        } catch (error) {
            // Display clean error from interceptor
            const errorMsg = error.message || "Invalid email or password.";
            setGlobalError(errorMsg);
            toast.error(errorMsg);
        }
    };

    return (
        <FormWrapper 
            title="Sign in to your account" 
            subtitle={
                <span>
                    Don't have an account?{' '}
                    <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                        Sign up
                    </Link>
                </span>
            }
            onSubmit={handleSubmit(onSubmit)}
        >
            {/* Global Error Alert */}
            {globalError && (
                <div className="p-3 text-sm font-medium text-red-700 bg-red-100 rounded-lg border border-red-200">
                    {globalError}
                </div>
            )}

            <InputField 
                label="Email Address"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                register={register}
                errors={errors}
                rules={{ 
                    required: "Email is required",
                    pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Please enter a valid email address"
                    }
                }}
            />

            <InputField 
                label="Password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                register={register}
                errors={errors}
                rules={{ 
                    required: "Password is required"
                }}
            />

            <Button type="submit" isLoading={isSubmitting}>
                Sign in
            </Button>
        </FormWrapper>
    );
};

export default Signin;
