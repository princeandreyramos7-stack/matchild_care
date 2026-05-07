import PatientLayout from '@/Layouts/PatientLayout';
import { Head } from '@inertiajs/react';
import { Calendar, Heart, Activity, Bell, User, MapPin, Baby, Clock } from 'lucide-react';

export default function Dashboard({ maternalRecord }) {
    const getNextVisit = () => {
        if (!maternalRecord?.prenatal_visits) return null;
        
        const upcomingVisits = maternalRecord.prenatal_visits.filter(
            visit => !visit.visit_date || new Date(visit.visit_date) > new Date()
        );
        
        return upcomingVisits.length > 0 ? upcomingVisits[0] : null;
    };

    const getPregnancyWeek = () => {
        if (!maternalRecord?.last_menstrual_period) return 0;
        const weeks = Math.floor((new Date() - new Date(maternalRecord.last_menstrual_period)) / (7 * 24 * 60 * 60 * 1000));
        return weeks > 0 ? weeks : 0;
    };

    const getDaysUntilEDC = () => {
        if (!maternalRecord?.expected_date_of_delivery) return null;
        const edc = new Date(maternalRecord.expected_date_of_delivery);
        const today = new Date();
        const diffTime = edc - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays > 0 ? diffDays : 0;
    };

    const nextVisit = getNextVisit();
    const pregnancyWeek = getPregnancyWeek();
    const daysUntilEDC = getDaysUntilEDC();

    return (
        <PatientLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Patient Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {maternalRecord ? (
                        <div className="space-y-6">
                            {/* Welcome Banner */}
                            <div className="bg-gradient-to-r from-pink-500 via-pink-600 to-purple-600 rounded-xl shadow-lg overflow-hidden">
                                <div className="px-6 py-8 sm:px-8">
                                    <div className="flex items-center justify-between">
                                        <div className="flex-1">
                                            <h3 className="text-3xl font-bold text-white mb-2">
                                                Welcome back, {maternalRecord.first_name}!
                                            </h3>
                                            <p className="text-pink-100 text-lg">
                                                Track your pregnancy journey and stay healthy
                                            </p>
                                        </div>
                                        <div className="hidden sm:block">
                                            <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                                                <Heart className="h-16 w-16 text-white" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Key Metrics Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {/* Pregnancy Week */}
                                <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                                    <div className="p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="p-3 bg-pink-100 rounded-xl">
                                                <Heart className="h-6 w-6 text-pink-600" />
                                            </div>
                                            <span className="text-xs font-semibold text-pink-600 bg-pink-50 px-3 py-1 rounded-full">
                                                Active
                                            </span>
                                        </div>
                                        <h3 className="text-3xl font-bold text-gray-900 mb-1">
                                            Week {pregnancyWeek}
                                        </h3>
                                        <p className="text-sm text-gray-600 font-medium">Pregnancy Week</p>
                                        <div className="mt-4 pt-4 border-t border-gray-100">
                                            <p className="text-xs text-gray-500">
                                                {daysUntilEDC} days until due date
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Prenatal Visits */}
                                <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                                    <div className="p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="p-3 bg-blue-100 rounded-xl">
                                                <Calendar className="h-6 w-6 text-blue-600" />
                                            </div>
                                            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                                                Visits
                                            </span>
                                        </div>
                                        <h3 className="text-3xl font-bold text-gray-900 mb-1">
                                            {maternalRecord.prenatal_visits?.filter(v => v.visit_date).length || 0}
                                        </h3>
                                        <p className="text-sm text-gray-600 font-medium">Completed Visits</p>
                                        <div className="mt-4 pt-4 border-t border-gray-100">
                                            <p className="text-xs text-gray-500">
                                                Total prenatal checkups
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Health Status */}
                                <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                                    <div className="p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="p-3 bg-green-100 rounded-xl">
                                                <Activity className="h-6 w-6 text-green-600" />
                                            </div>
                                            <span className="text-xs font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">
                                                Good
                                            </span>
                                        </div>
                                        <h3 className="text-3xl font-bold text-gray-900 mb-1">
                                            Healthy
                                        </h3>
                                        <p className="text-sm text-gray-600 font-medium">Health Status</p>
                                        <div className="mt-4 pt-4 border-t border-gray-100">
                                            <p className="text-xs text-gray-500">
                                                Regular monitoring
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Due Date Countdown */}
                                <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                                    <div className="p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="p-3 bg-purple-100 rounded-xl">
                                                <Clock className="h-6 w-6 text-purple-600" />
                                            </div>
                                            <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                                                EDC
                                            </span>
                                        </div>
                                        <h3 className="text-3xl font-bold text-gray-900 mb-1">
                                            {daysUntilEDC}
                                        </h3>
                                        <p className="text-sm text-gray-600 font-medium">Days to Go</p>
                                        <div className="mt-4 pt-4 border-t border-gray-100">
                                            <p className="text-xs text-gray-500">
                                                {new Date(maternalRecord.expected_date_of_delivery).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Next Appointment Alert */}
                            {nextVisit && (
                                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-500 rounded-xl shadow-lg p-6">
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0">
                                            <div className="p-3 bg-yellow-100 rounded-xl">
                                                <Bell className="h-6 w-6 text-yellow-600" />
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg font-bold text-gray-900 mb-1">
                                                Upcoming Appointment
                                            </h3>
                                            <p className="text-sm text-gray-600 mb-3">
                                                Don't forget your next prenatal visit
                                            </p>
                                            <div className="bg-white rounded-lg p-4 shadow-sm">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <p className="text-sm font-semibold text-gray-900">
                                                            Prenatal Visit #{nextVisit.visit_number}
                                                        </p>
                                                        <p className="text-xs text-gray-600 mt-1">
                                                            {nextVisit.visit_date ? new Date(nextVisit.visit_date).toLocaleDateString('en-US', {
                                                                weekday: 'long',
                                                                year: 'numeric',
                                                                month: 'long',
                                                                day: 'numeric'
                                                            }) : 'To be scheduled'}
                                                        </p>
                                                    </div>
                                                    <Calendar className="h-8 w-8 text-yellow-600" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Personal Information Card */}
                            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                                <div className="bg-gradient-to-r from-pink-500 to-purple-600 px-6 py-4">
                                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                        <User className="h-5 w-5" />
                                        Personal Information
                                    </h3>
                                </div>
                                <div className="p-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        <div className="flex items-start gap-3">
                                            <div className="p-2 bg-pink-100 rounded-lg">
                                                <User className="h-5 w-5 text-pink-600" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 mb-1">Full Name</p>
                                                <p className="text-sm font-semibold text-gray-900">
                                                    {maternalRecord.first_name} {maternalRecord.middle_initial}. {maternalRecord.last_name}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="p-2 bg-blue-100 rounded-lg">
                                                <Calendar className="h-5 w-5 text-blue-600" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 mb-1">Age</p>
                                                <p className="text-sm font-semibold text-gray-900">
                                                    {maternalRecord.age} years ({maternalRecord.age_group})
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="p-2 bg-green-100 rounded-lg">
                                                <MapPin className="h-5 w-5 text-green-600" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 mb-1">Address</p>
                                                <p className="text-sm font-semibold text-gray-900">
                                                    {maternalRecord.address}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="p-2 bg-purple-100 rounded-lg">
                                                <Baby className="h-5 w-5 text-purple-600" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 mb-1">Family Serial</p>
                                                <p className="text-sm font-semibold text-gray-900">
                                                    {maternalRecord.family_serial}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="p-2 bg-orange-100 rounded-lg">
                                                <Activity className="h-5 w-5 text-orange-600" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 mb-1">Gravida</p>
                                                <p className="text-sm font-semibold text-gray-900">
                                                    G{maternalRecord.gravida}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="p-2 bg-red-100 rounded-lg">
                                                <Heart className="h-5 w-5 text-red-600" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 mb-1">Parity</p>
                                                <p className="text-sm font-semibold text-gray-900">
                                                    P{maternalRecord.parity}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                            <div className="max-w-md mx-auto">
                                <div className="bg-gray-100 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                                    <Heart className="h-12 w-12 text-gray-400" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    No Maternal Record Found
                                </h3>
                                <p className="text-sm text-gray-600">
                                    Please contact your healthcare provider to set up your maternal care record.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </PatientLayout>
    );
}
