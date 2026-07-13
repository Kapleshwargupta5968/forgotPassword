import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FormWrapper } from '../../components/common/FormWrapper';
import { InputField } from '../../components/common/InputField';
import { Button } from '../../components/common/Button';
import { ResetPassword as resetPasswordApi } from '../../services/api/authServices';
import toast from 'react-hot-toast';

const ResetPassword = () => {
    const [globalError, setGlobalError] = useState("");
    const { token } = useParams();
    const navigate = useNavigate();
    
    const { 
        register, 
        handleSubmit,
        watch,
        formState: { errors, isSubmitting } 
    } = useForm({
        defaultValues: { password: "", confirmPassword: "" }
    });

    const onSubmit = async (data) => {
        setGlobalError("");
        try {
            const response = await resetPasswordApi(token, { password: data.password });
            toast.success(response.data?.message || "Password updated successfully!");
            navigate("/signin");
        } catch (error) {
            const errorMsg = error.response?.data?.message || error.message || "Something went wrong.";
            setGlobalError(errorMsg);
            toast.error(errorMsg);
        }
    };

    return (
        <FormWrapper 
            title="Create new password" 
            subtitle="Please enter your new password below."
            onSubmit={handleSubmit(onSubmit)}
        >
            {globalError && (
                <div className="p-3 text-sm font-medium text-red-700 bg-red-100 rounded-lg border border-red-200 mb-4">
                    {globalError}
                </div>
            )}

            <InputField 
                label="New Password"
                name="password"
                type="password"
                autoComplete="new-password"
                placeholder="••••••••"
                register={register}
                errors={errors}
                rules={{ 
                    required: "Password is required",
                    minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters"
                    }
                }}
            />

            <InputField 
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                placeholder="••••••••"
                register={register}
                errors={errors}
                rules={{ 
                    required: "Please confirm your password",
                    validate: (val) => {
                        if (watch('password') != val) {
                            return "Your passwords do no match";
                        }
                    }
                }}
            />

            <Button type="submit" isLoading={isSubmitting}>
                Reset Password
            </Button>
        </FormWrapper>
    );
};

export default ResetPassword;
