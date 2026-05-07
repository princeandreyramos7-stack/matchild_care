import PatientLayout from '@/Layouts/PatientLayout';
import { Head } from '@inertiajs/react';
import { Bell, Calendar, AlertCircle, CheckCircle, Clock, Heart } from 'lucide-react';

export default function Notifications({ maternalRecord }) {
    const getUpcomingVisits = () => {
        if (!maternalRecord?.prenatal_visits) return [];
        
        return maternalRecord.prenatal_visits.filter(
            visit => !visit.visit_date || new Date(visit.visit_date) > new Date()
        );
    };

    const getCompletedVisits = () => {
        if (!maternalRecord?.prenatal_visits) return [];
        
        return maternalRecord.prenatal_visits.filter(
            visit => visit.visit_date && new Date(visit.visit_date) <= new Date()
        );
    };

    const upcomingVisits = getUpcomingVisits();
    const completedVisits = getCompletedVisits();

    const getDaysUntilEDC = () => {
        if (!maternalRecord?.expected_date_of_delivery) return null;
        
        const edc = new Date(maternalRecord.expected_date_of_delivery);
        const today = new Date();
        const diffTime = edc - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        return diffDays;
    };

    const daysUntilEDC = getDaysUntilEDC();

    return (
        <PatientLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Notifications & Reminders
                </h2>
            }
        >
            <Head title="Notifications" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {maternalRecord ? (
                        <div className="space-y-6">
                            {/* EDC Countdown */}
                            {daysUntilEDC !== null && daysUntilEDC > 0 && (
                                <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-white/20 rounded-xl">
                                            <Heart className="h-8 w-8" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-2xl font-bold mb-1">
                                                {daysUntilEDC} Days Until Your Due Date
                                            </h3>
                                            <p className="text-pink-100">
                                                Expected Date of Delivery: {new Date(maternalRecord.expected_date_of_delivery).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Upcoming Appointments */}
                            <div className="bg-white rounded-xl shadow-lg p-6">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-yellow-100 rounded-lg">
                                        <Calendar className="h-5 w-5 text-yellow-600" />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900">
                                        Upcoming Appointments
                                    </h3>
                                </div>
                                {upcomingVisits.length > 0 ? (
                                    <div className="space-y-3">
                                        {upcomingVisits.map((visit, index) => (
                                            <div key={index} className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-500">
                                                <div className="flex items-start gap-3">
                                                    <Clock className="h-5 w-5 text-yellow-600 mt-0.5" />
                                                    <div className="flex-1">
                                                        <p className="text-sm font-medium text-gray-900">
                                                            Prenatal Visit #{visit.visit_number}
                                                        </p>
                                                        <p className="text-xs text-gray-600 mt-1">
                                                            {visit.visit_date 
                                                                ? `Scheduled for ${new Date(visit.visit_date).toLocaleDateString('en-US', {
                                                                    year: 'numeric',
                                                                    month: 'long',
                                                                    day: 'numeric'
                                                                })}`
                                                                : 'To be scheduled - Please contact your healthcare provider'}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
                                        <p className="text-sm text-gray-600">
                                            No upcoming appointments at this time
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Health Reminders */}
                            <div className="bg-white rounded-xl shadow-lg p-6">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-blue-100 rounded-lg">
                                        <Bell className="h-5 w-5 text-blue-600" />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900">
                                        Health Reminders
                                    </h3>
                                </div>
                                <div className="space-y-3">
                                    <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
                                        <div className="flex items-start gap-3">
                                            <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">
                                                    Take Your Prenatal Vitamins
                                                </p>
                                                <p className="text-xs text-gray-600 mt-1">
                                                    Remember to take your daily prenatal vitamins as prescribed
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
                                        <div className="flex items-start gap-3">
                                            <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">
                                                    Stay Hydrated
                                                </p>
                                                <p className="text-xs text-gray-600 mt-1">
                                                    Drink at least 8-10 glasses of water daily
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
                                        <div className="flex items-start gap-3">
                                            <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">
                                                    Regular Exercise
                                                </p>
                                                <p className="text-xs text-gray-600 mt-1">
                                                    Light exercise as recommended by your healthcare provider
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Recent Activity */}
                            <div className="bg-white rounded-xl shadow-lg p-6">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-green-100 rounded-lg">
                                        <CheckCircle className="h-5 w-5 text-green-600" />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900">
                                        Recent Activity
                                    </h3>
                                </div>
                                {completedVisits.length > 0 ? (
                                    <div className="space-y-3">
                                        {completedVisits.slice(0, 3).map((visit, index) => (
                                            <div key={index} className="bg-green-50 rounded-lg p-4">
                                                <div className="flex items-start gap-3">
                                                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                                                    <div className="flex-1">
                                                        <p className="text-sm font-medium text-gray-900">
                                                            Completed Prenatal Visit #{visit.visit_number}
                                                        </p>
                                                        <p className="text-xs text-gray-600 mt-1">
                                                            {new Date(visit.visit_date).toLocaleDateString('en-US', {
                                                                year: 'numeric',
                                                                month: 'long',
                                                                day: 'numeric'
                                                            })}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-600 text-center py-4">
                                        No recent activity to display
                                    </p>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                            <Bell className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                No Notifications Available
                            </h3>
                            <p className="text-sm text-gray-600">
                                Your notifications will appear here once your maternal care record is set up.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </PatientLayout>
    );
}
