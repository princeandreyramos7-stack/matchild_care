import PatientLayout from '@/Layouts/PatientLayout';
import { Head } from '@inertiajs/react';
import { FileText, Calendar, Activity, Pill, TestTube, Baby, Heart, CheckCircle, Clock, TrendingUp } from 'lucide-react';

export default function Records({ maternalRecord }) {
    return (
        <PatientLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    My Medical Records
                </h2>
            }
        >
            <Head title="My Records" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {maternalRecord ? (
                        <div className="space-y-6">
                            {/* Page Header */}
                            <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl shadow-lg overflow-hidden">
                                <div className="px-6 py-8">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                                            <FileText className="h-8 w-8 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-white mb-1">
                                                Medical Records Overview
                                            </h3>
                                            <p className="text-pink-100">
                                                Complete history of your prenatal care and health assessments
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Prenatal Visits */}
                            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                                <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-white/20 rounded-lg">
                                            <Calendar className="h-5 w-5 text-white" />
                                        </div>
                                        <h3 className="text-lg font-bold text-white">
                                            Prenatal Visits History
                                        </h3>
                                    </div>
                                </div>
                                <div className="p-6">
                                    {maternalRecord.prenatal_visits && maternalRecord.prenatal_visits.length > 0 ? (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {maternalRecord.prenatal_visits.map((visit, index) => (
                                                <div key={index} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-5 border border-blue-100 hover:shadow-md transition-shadow">
                                                    <div className="flex items-start justify-between mb-3">
                                                        <div className="flex items-center gap-3">
                                                            <div className={`p-2 rounded-lg ${visit.visit_date ? 'bg-green-100' : 'bg-yellow-100'}`}>
                                                                {visit.visit_date ? (
                                                                    <CheckCircle className="h-5 w-5 text-green-600" />
                                                                ) : (
                                                                    <Clock className="h-5 w-5 text-yellow-600" />
                                                                )}
                                                            </div>
                                                            <div>
                                                                <p className="text-sm font-bold text-gray-900">
                                                                    Prenatal Visit #{visit.visit_number}
                                                                </p>
                                                                <p className="text-xs text-gray-600 mt-0.5">
                                                                    {visit.visit_date 
                                                                        ? new Date(visit.visit_date).toLocaleDateString('en-US', {
                                                                            year: 'numeric',
                                                                            month: 'long',
                                                                            day: 'numeric'
                                                                        })
                                                                        : 'Scheduled - Date TBD'}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                            visit.visit_date 
                                                                ? 'bg-green-100 text-green-800' 
                                                                : 'bg-yellow-100 text-yellow-800'
                                                        }`}>
                                                            {visit.visit_date ? 'Completed' : 'Pending'}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-8">
                                            <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                                            <p className="text-sm text-gray-600">No prenatal visits recorded yet.</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Nutritional Assessment */}
                            {maternalRecord.nutritional_assessment && (
                                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                                    <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-white/20 rounded-lg">
                                                <TrendingUp className="h-5 w-5 text-white" />
                                            </div>
                                            <h3 className="text-lg font-bold text-white">
                                                Nutritional Assessment
                                            </h3>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 border border-green-100">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Activity className="h-4 w-4 text-green-600" />
                                                    <p className="text-xs font-medium text-gray-600">Height</p>
                                                </div>
                                                <p className="text-2xl font-bold text-gray-900">
                                                    {maternalRecord.nutritional_assessment.height || 'N/A'}
                                                </p>
                                                <p className="text-xs text-gray-500 mt-1">centimeters</p>
                                            </div>
                                            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 border border-green-100">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Activity className="h-4 w-4 text-green-600" />
                                                    <p className="text-xs font-medium text-gray-600">Weight</p>
                                                </div>
                                                <p className="text-2xl font-bold text-gray-900">
                                                    {maternalRecord.nutritional_assessment.weight || 'N/A'}
                                                </p>
                                                <p className="text-xs text-gray-500 mt-1">kilograms</p>
                                            </div>
                                            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 border border-green-100">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Activity className="h-4 w-4 text-green-600" />
                                                    <p className="text-xs font-medium text-gray-600">BMI</p>
                                                </div>
                                                <p className="text-2xl font-bold text-gray-900">
                                                    {maternalRecord.nutritional_assessment.bmi || 'N/A'}
                                                </p>
                                                <p className="text-xs text-gray-500 mt-1">body mass index</p>
                                            </div>
                                            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 border border-green-100">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <CheckCircle className="h-4 w-4 text-green-600" />
                                                    <p className="text-xs font-medium text-gray-600">Status</p>
                                                </div>
                                                <p className="text-lg font-bold text-gray-900">
                                                    {maternalRecord.nutritional_assessment.nutritional_status || 'N/A'}
                                                </p>
                                                <p className="text-xs text-gray-500 mt-1">nutritional</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Immunization Records */}
                            {maternalRecord.immunization_record && (
                                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                                    <div className="bg-gradient-to-r from-purple-500 to-purple-600 px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-white/20 rounded-lg">
                                                <Activity className="h-5 w-5 text-white" />
                                            </div>
                                            <h3 className="text-lg font-bold text-white">
                                                Immunization Record
                                            </h3>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-5 border border-purple-100">
                                            <div className="flex items-start gap-4">
                                                <div className="p-3 bg-purple-100 rounded-lg">
                                                    <CheckCircle className="h-6 w-6 text-purple-600" />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-sm font-bold text-gray-900 mb-1">
                                                        Tetanus Toxoid Vaccination
                                                    </p>
                                                    <p className="text-xs text-gray-600">
                                                        Administered on {new Date(maternalRecord.immunization_record.created_at).toLocaleDateString('en-US', {
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric'
                                                        })}
                                                    </p>
                                                    <div className="mt-3 pt-3 border-t border-purple-200">
                                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-800">
                                                            Vaccination Complete
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Prenatal Supplementations */}
                            {maternalRecord.prenatal_supplementations && maternalRecord.prenatal_supplementations.length > 0 && (
                                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                                    <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-white/20 rounded-lg">
                                                <Pill className="h-5 w-5 text-white" />
                                            </div>
                                            <h3 className="text-lg font-bold text-white">
                                                Prenatal Supplementations
                                            </h3>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {maternalRecord.prenatal_supplementations.map((supp, index) => (
                                                <div key={index} className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg p-5 border border-orange-100">
                                                    <div className="flex items-start gap-3">
                                                        <div className="p-2 bg-orange-100 rounded-lg">
                                                            <Pill className="h-5 w-5 text-orange-600" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <p className="text-sm font-bold text-gray-900 mb-1">
                                                                Supplementation Record #{index + 1}
                                                            </p>
                                                            <p className="text-xs text-gray-600">
                                                                Date: {new Date(supp.created_at).toLocaleDateString('en-US', {
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
                                    </div>
                                </div>
                            )}

                            {/* Laboratory Screening */}
                            {maternalRecord.laboratory_screening && (
                                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                                    <div className="bg-gradient-to-r from-red-500 to-rose-600 px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-white/20 rounded-lg">
                                                <TestTube className="h-5 w-5 text-white" />
                                            </div>
                                            <h3 className="text-lg font-bold text-white">
                                                Laboratory Screening
                                            </h3>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-lg p-5 border border-red-100">
                                            <div className="flex items-start gap-4">
                                                <div className="p-3 bg-red-100 rounded-lg">
                                                    <TestTube className="h-6 w-6 text-red-600" />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-sm font-bold text-gray-900 mb-1">
                                                        Laboratory Tests Completed
                                                    </p>
                                                    <p className="text-xs text-gray-600">
                                                        Date: {new Date(maternalRecord.laboratory_screening.created_at).toLocaleDateString('en-US', {
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric'
                                                        })}
                                                    </p>
                                                    <div className="mt-3 pt-3 border-t border-red-200">
                                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800">
                                                            Tests Complete
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Delivery Information */}
                            {maternalRecord.delivery_information && (
                                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                                    <div className="bg-gradient-to-r from-pink-500 to-pink-600 px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-white/20 rounded-lg">
                                                <Baby className="h-5 w-5 text-white" />
                                            </div>
                                            <h3 className="text-lg font-bold text-white">
                                                Delivery Information
                                            </h3>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-lg p-5 border border-pink-100">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Calendar className="h-4 w-4 text-pink-600" />
                                                    <p className="text-xs font-medium text-gray-600">Delivery Date</p>
                                                </div>
                                                <p className="text-lg font-bold text-gray-900">
                                                    {maternalRecord.delivery_information.delivery_date 
                                                        ? new Date(maternalRecord.delivery_information.delivery_date).toLocaleDateString('en-US', {
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric'
                                                        })
                                                        : 'N/A'}
                                                </p>
                                            </div>
                                            <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-lg p-5 border border-pink-100">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Heart className="h-4 w-4 text-pink-600" />
                                                    <p className="text-xs font-medium text-gray-600">Type of Delivery</p>
                                                </div>
                                                <p className="text-lg font-bold text-gray-900">
                                                    {maternalRecord.delivery_information.type_of_delivery || 'N/A'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                            <div className="max-w-md mx-auto">
                                <div className="bg-gray-100 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                                    <FileText className="h-12 w-12 text-gray-400" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    No Medical Records Found
                                </h3>
                                <p className="text-sm text-gray-600">
                                    Your medical records will appear here once they are created by your healthcare provider.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </PatientLayout>
    );
}
