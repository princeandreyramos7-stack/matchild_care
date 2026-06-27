import { Link, usePage } from '@inertiajs/react';
import { Home, FileText, Bell, Heart, BarChart3, ChevronRight, ChevronLeft, X, ChevronDown, ChevronUp, User, LogOut } from 'lucide-react';
import { useState } from 'react';

export default function PatientSidebar({ isCollapsed, setIsCollapsed, onClose }) {
    const { auth } = usePage().props;
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    const mainNavigation = [
        { name: 'Dashboard', href: route('patient.dashboard'), icon: BarChart3 },
    ];

    const servicesNavigation = [
        { name: 'My Records', href: route('patient.records'), icon: FileText },
        { name: 'Notifications', href: route('patient.notifications'), icon: Bell },
    ];

    const NavLink = ({ item, onClick }) => {
        const Icon = item.icon;
        const isActive = route().current(item.href.split('/').pop());
        
        return (
            <Link
                href={item.href}
                onClick={onClick}
                className={`
                    group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200
                    ${isActive
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                        : 'text-gray-700 hover:bg-gray-100'
                    }
                `}
            >
                <Icon className="h-5 w-5 flex-shrink-0 mr-3" />
                {item.name}
            </Link>
        );
    };

    return (
        <div className="flex h-screen flex-col bg-gray-50 transition-all duration-300 w-64">
            {/* Header with Logo */}
            <div className="flex items-center justify-between p-5 bg-white">
                <div className="flex items-center gap-3">
                    <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center shadow-lg">
                        <Heart className="h-7 w-7 text-white" fill="white" />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold text-gray-900">Patient Care</h1>
                        <p className="text-xs text-gray-500">Health Management</p>
                    </div>
                </div>
                
                {/* Mobile close button */}
                {onClose && (
                    <button
                        onClick={onClose}
                        className="md:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors"
                        aria-label="Close menu"
                    >
                        <X className="h-5 w-5" />
                    </button>
                )}
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-6 space-y-6 overflow-y-auto">
                {/* Main Section */}
                <div>
                    <div className="flex items-center gap-2 px-4 mb-3">
                        <div className="w-1 h-4 bg-indigo-600 rounded-full"></div>
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Main</h3>
                    </div>
                    <div className="space-y-1">
                        {mainNavigation.map((item) => (
                            <NavLink key={item.name} item={item} onClick={onClose} />
                        ))}
                    </div>
                </div>

                {/* Patient Services Section */}
                <div>
                    <div className="flex items-center gap-2 px-4 mb-3">
                        <div className="w-1 h-4 bg-gray-400 rounded-full"></div>
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">My Services</h3>
                    </div>
                    <div className="space-y-1">
                        {servicesNavigation.map((item) => (
                            <NavLink key={item.name} item={item} onClick={onClose} />
                        ))}
                    </div>
                </div>
            </nav>

            {/* User Profile Footer */}
            <div className="p-4 bg-white border-t border-gray-200">
                {/* Profile Menu Dropdown */}
                {showProfileMenu && (
                    <div className="mb-3 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                        {/* User Info Header */}
                        <div className="px-4 py-4 border-b border-gray-100">
                            <p className="text-base font-bold text-gray-900">{auth.user.name}</p>
                            <p className="text-sm text-gray-500 mt-0.5">{auth.user.email}</p>
                        </div>
                        
                        {/* Menu Items */}
                        <div className="py-2">
                            <Link
                                href={route('profile.edit')}
                                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                            >
                                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                                    <User className="h-5 w-5 text-blue-600" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-semibold text-gray-900">Profile Settings</p>
                                    <p className="text-xs text-gray-500">Manage your account</p>
                                </div>
                            </Link>
                            
                            <Link
                                href={route('logout')}
                                method="post"
                                as="button"
                                className="flex items-center gap-3 px-4 py-3 hover:bg-red-50 transition-colors w-full"
                            >
                                <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                                    <LogOut className="h-5 w-5 text-red-600" />
                                </div>
                                <div className="flex-1 text-left">
                                    <p className="text-sm font-semibold text-red-600">Logout</p>
                                    <p className="text-xs text-red-400">Sign out of your account</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                )}
                
                {/* Profile Button */}
                <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group w-full border-2 border-gray-200"
                >
                    <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
                            <span className="text-white text-lg font-bold">
                                {auth.user.name.charAt(0).toUpperCase()}
                            </span>
                        </div>
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                        <p className="text-sm font-semibold text-gray-900 truncate">{auth.user.name}</p>
                        <p className="text-xs text-gray-500 truncate">{auth.user.email}</p>
                    </div>
                    {showProfileMenu ? (
                        <ChevronUp className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors flex-shrink-0" />
                    ) : (
                        <ChevronDown className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors flex-shrink-0" />
                    )}
                </button>
            </div>
        </div>
    );
}
