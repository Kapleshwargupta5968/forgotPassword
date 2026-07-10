import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FormWrapper } from '../../components/common/FormWrapper';
import { InputField } from '../../components/common/InputField';
import { Button } from '../../components/common/Button';
import { Signup as signupApi } from '../../services/api/authServices';
import { useDispatch } from 'react-redux';
import { authStart, authSuccess } from '../../features/authSlice';
import toast from 'react-hot-toast';

const Signup = () => {
    const [globalError, setGlobalError] = useState("");
    const navigate = useNavigate();

    const dispatch = useDispatch();
    
    // Initialize useForm in a production-ready way
    const { 
        register, 
        handleSubmit, 
        formState: { errors, isSubmitting } 
    } = useForm({
        defaultValues: { name: "", email: "", password: "" }
    });

    const onSubmit = async (data) => {
        setGlobalError(""); // Reset any previous errors
        try {
            await signupApi(data);
            toast.success("Account created successfully! Please sign in.");
            // On success, redirect to signin page
            navigate("/signin");
        } catch (error) {
            // Our interceptor standardised the error object, making this incredibly clean!
            const errorMsg = error.message || "Failed to sign up. Please try again.";
            setGlobalError(errorMsg);
            toast.error(errorMsg);
        }
    };

    return (
        <FormWrapper 
            title="Create an account" 
            subtitle={
                <span>
                    Already have an account?{' '}
                    <Link to="/signin" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                        Sign in
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
                label="Full Name"
                name="name"
                autoComplete="name"
                placeholder="John Doe"
                register={register}
                errors={errors}
                rules={{ 
                    required: "Full name is required",
                    minLength: { value: 2, message: "Name must be at least 2 characters" }
                }}
            />

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
                autoComplete="new-password"
                placeholder="••••••••"
                register={register}
                errors={errors}
                rules={{ 
                    required: "Password is required",
                    minLength: { value: 6, message: "Password must be at least 6 characters" }
                }}
            />

            <Button type="submit" isLoading={isSubmitting}>
                Sign up
            </Button>
        </FormWrapper>
    );
};

export default Signup;
