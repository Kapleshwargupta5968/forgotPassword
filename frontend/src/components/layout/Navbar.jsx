import { Link, NavLink } from 'react-router-dom';

export const Navbar = () => {
    return (
        <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo Section */}
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 flex items-center space-x-2 group">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                                <span className="text-white font-bold text-xl leading-none">A</span>
                            </div>
                            <span className="font-bold text-xl text-gray-900 tracking-tight group-hover:text-blue-600 transition-colors">
                                AuthApp
                            </span>
                        </Link>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex items-center space-x-4">
                        <NavLink 
                            to="/signin" 
                            className={({ isActive }) => 
                                `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                    isActive 
                                        ? 'text-blue-600 bg-blue-50' 
                                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                }`
                            }
                        >
                            Sign In
                        </NavLink>
                        <NavLink 
                            to="/signup" 
                            className={({ isActive }) => 
                                `px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                    isActive
                                        ? 'bg-blue-700 text-white shadow-md'
                                        : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md hover:-translate-y-0.5'
                                }`
                            }
                        >
                            Sign Up
                        </NavLink>
                    </div>
                </div>
            </div>
        </nav>
    );
};
