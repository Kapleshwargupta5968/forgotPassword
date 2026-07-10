export const InputField = ({ 
    label,
    name, 
    register, 
    errors,
    rules,
    placeholder, 
    type = "text",
    disabled = false,
    autoComplete,
    className = ""
}) => {
    const hasError = !!errors?.[name];
    const errorId = `${name}-error`;

    return (
        <div className={`flex flex-col space-y-1 ${className}`}>
            {label && (
                <label htmlFor={name} className="text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}
            
            <input
                id={name}
                type={type}
                disabled={disabled}
                placeholder={placeholder}
                autoComplete={autoComplete}
                aria-invalid={hasError ? "true" : "false"}
                aria-describedby={hasError ? errorId : undefined}
                {...register(name, rules)}
                className={`
                    w-full px-4 py-2 text-gray-900 bg-white border rounded-lg shadow-sm 
                    focus:outline-none focus:ring-2 transition-all duration-200 ease-in-out
                    disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed
                    ${hasError 
                        ? "border-red-500 focus:border-red-500 focus:ring-red-200" 
                        : "border-gray-300 hover:border-gray-400 focus:border-blue-500 focus:ring-blue-200"
                    }
                `}
            />
            
            {hasError && (
                <p id={errorId} className="text-red-500 text-sm mt-1 font-medium">
                    {errors[name].message}
                </p>
            )}
        </div>
    );
};