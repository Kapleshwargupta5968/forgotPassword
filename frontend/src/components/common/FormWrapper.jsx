export const FormWrapper = ({ title, subtitle, onSubmit, children }) => {
    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 sm:px-6 lg:px-8 py-12">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-xl">
                <div className="text-center">
                    {title && <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">{title}</h2>}
                    {subtitle && <p className="mt-2 text-sm text-gray-600">{subtitle}</p>}
                </div>
                
                <form className="mt-8 space-y-6" onSubmit={onSubmit}>
                    <div className="space-y-5">
                        {children}
                    </div>
                </form>
            </div>
        </div>
    );
};
