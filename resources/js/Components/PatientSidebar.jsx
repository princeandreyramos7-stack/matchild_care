import { Link, usePage } from '@inertiajs/react';
import { Home, FileText, Settings, ChevronLeft, ChevronRight } from 'lucide-react';

export default function PatientSidebar({ isCollapsed, setIsCollapsed }) {
    const { auth } = usePage().props;
    
    const navigation = [
        { name: 'Dashboard', href: route('patient.dashboard'), icon: Home },
        { name: 'My Records', href: route('patient.my-records'), icon: FileText },
    ];

    return (
        <div className={`flex h-screen flex-col bg-white border-r border-gray-200 transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
            <div className="flex h-16 items-center justify-between border-b border-gray-200 px-4">
                {!isCollapsed && <h1 className="text-xl font-bold text-gray-900">Patient Portal</h1>}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="p-1 rounded-md hover:bg-gray-100 text-gray-600"
                >
                    {isCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
                </button>
            </div>
            
            <nav className="flex-1 space-y-1 px-2 py-4">
                {navigation.map((item) => {
                    const Icon = item.icon;
                    const isActive = route().current() === item.href.replace(route().t.url, '');
                    
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`
                                group flex items-center px-2 py-2 text-sm font-medium rounded-md
                                ${isCollapsed ? 'justify-center' : ''}
                                ${isActive
                                    ? 'bg-pink-50 text-pink-600'
                                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                                }
                            `}
                            title={isCollapsed ? item.name : ''}
                        >
                            <Icon className={`h-6 w-6 flex-shrink-0 ${!isCollapsed && 'mr-3'}`} />
                            {!isCollapsed && item.name}
                        </Link>
                    );
                })}
            </nav>
            
            <div className="border-t border-gray-200 p-4">
                {!isCollapsed ? (
                    <>
                        <div className="flex items-center mb-3">
                            <div className="flex-shrink-0">
                                <div className="h-8 w-8 rounded-full bg-pink-600 flex items-center justify-center">
                                    <span className="text-white text-sm font-medium">
                                        {auth.user.name.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-900">{auth.user.name}</p>
                                <p className="text-xs text-gray-500">Patient</p>
                            </div>
                        </div>
                        <Link
                            href={route('profile.edit')}
                            className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-md mb-1"
                        >
                            Profile Settings
                        </Link>
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-md"
                        >
                            Sign out
                        </Link>
                    </>
                ) : (
                    <div className="flex flex-col items-center space-y-2">
                        <div className="h-8 w-8 rounded-full bg-pink-600 flex items-center justify-center">
                            <span className="text-white text-sm font-medium">
                                {auth.user.name.charAt(0).toUpperCase()}
                            </span>
                        </div>
                        <Link
                            href={route('profile.edit')}
                            className="p-2 text-gray-700 hover:bg-gray-50 rounded-md"
                            title="Profile Settings"
                        >
                            <Settings className="h-5 w-5" />
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
