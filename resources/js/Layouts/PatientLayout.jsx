import { useState } from 'react';
import PatientSidebar from '@/Components/PatientSidebar';
import { usePage } from '@inertiajs/react';
import { Menu, X } from 'lucide-react';

export default function PatientLayout({ header, children }) {
    const { auth } = usePage().props;
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="flex">
                {/* Mobile menu overlay */}
                {isMobileMenuOpen && (
                    <div 
                        className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />
                )}

                {/* Sidebar - Desktop (fixed) */}
                <div className="hidden md:flex md:flex-col md:fixed md:inset-y-0 z-50">
                    <PatientSidebar />
                </div>

                {/* Sidebar - Mobile (overlay) */}
                <div className={`fixed inset-y-0 left-0 z-50 md:hidden transform transition-transform duration-300 ease-in-out ${
                    isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
                }`}>
                    <PatientSidebar onClose={() => setIsMobileMenuOpen(false)} />
                </div>

                {/* Main content */}
                <div className="flex flex-1 flex-col md:pl-64">
                    {/* Header with mobile menu button */}
                    {header && (
                        <header className="bg-white shadow sticky top-0 z-30">
                            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                                <div className="flex items-center gap-4">
                                    {/* Mobile menu button */}
                                    <button
                                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                        className="md:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-500"
                                        aria-label="Toggle menu"
                                    >
                                        {isMobileMenuOpen ? (
                                            <X className="h-6 w-6" />
                                        ) : (
                                            <Menu className="h-6 w-6" />
                                        )}
                                    </button>
                                    
                                    {/* Header content */}
                                    <div className="flex-1">
                                        {header}
                                    </div>
                                </div>
                            </div>
                        </header>
                    )}

                    {/* Page content */}
                    <main className="flex-1">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}
