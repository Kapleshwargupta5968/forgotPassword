import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FormWrapper } from '../../components/common/FormWrapper';
import { InputField } from '../../components/common/InputField';
import { Button } from '../../components/common/Button';
import { ForgotPassword as forgotPasswordApi } from '../../services/api/authServices';
import toast from 'react-hot-toast';

const ForgotPassword = () => {
    const [globalError, setGlobalError] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    
    const { 
        register, 
        handleSubmit, 
        formState: { errors, isSubmitting } 
    } = useForm({
        defaultValues: { email: "" }
    });

    const onSubmit = async (data) => {
        setGlobalError("");
        try {
            const response = await forgotPasswordApi(data);
            toast.success(response.data?.message || "Reset link sent!");
            setIsSuccess(true);
        } catch (error) {
            const errorMsg = error.response?.data?.message || error.message || "Something went wrong.";
            setGlobalError(errorMsg);
            toast.error(errorMsg);
        }
    };

    if (isSuccess) {
        return (
            <FormWrapper title="Check your email">
                <div className="text-center">
                    <p className="text-gray-600 mb-6">
                        If an account exists for that email, we have sent password reset instructions.
                    </p>
                    <Link to="/signin" className="text-blue-600 font-medium hover:text-blue-500 transition-colors">
                        Return to sign in
                    </Link>
                </div>
            </FormWrapper>
        );
    }

    return (
        <FormWrapper 
            title="Reset your password" 
            subtitle={
                <span>
                    Remember your password?{' '}
                    <Link to="/signin" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                        Sign in
                    </Link>
                </span>
            }
            onSubmit={handleSubmit(onSubmit)}
        >
            {globalError && (
                <div className="p-3 text-sm font-medium text-red-700 bg-red-100 rounded-lg border border-red-200 mb-4">
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

            <Button type="submit" isLoading={isSubmitting}>
                Send reset link
            </Button>
        </FormWrapper>
    );
};

export default ForgotPassword;
