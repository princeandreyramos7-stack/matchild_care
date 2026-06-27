import PatientLayout from '@/Layouts/PatientLayout';
import { Head } from '@inertiajs/react';
import { FileText, Calendar, Activity, Pill, TestTube, Baby, Heart, CheckCircle, Clock } from 'lucide-react';

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
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                <div className="flex items-center gap-4">
                                    <div className="p-4 bg-indigo-50 rounded-xl">
                                        <FileText className="h-8 w-8 text-indigo-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-1">
                                            Medical Records Overview
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            Complete history of your prenatal care and health assessments
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Prenatal Visits */}
                            <div className="bg-white rounded-xl shadow-sm border border-indigo-200 overflow-hidden">
                                <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <Calendar className="h-5 w-5 text-white" />
                                        <h3 className="text-lg font-semibold text-white">
                                            Prenatal Visits History
                                        </h3>
                                    </div>
                                </div>
                                <div className="p-6">
                                    {maternalRecord.prenatal_visits && maternalRecord.prenatal_visits.length > 0 ? (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {maternalRecord.prenatal_visits.map((visit, index) => (
                                                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                                                    <div className="flex items-start justify-between mb-2">
                                                        <div className="flex items-center gap-3">
                                                            <div className={`p-2 rounded-lg ${visit.visit_date ? 'bg-green-50' : 'bg-gray-50'}`}>
                                                                {visit.visit_date ? (
                                                                    <CheckCircle className="h-5 w-5 text-green-600" />
                                                                ) : (
                                                                    <Clock className="h-5 w-5 text-gray-400" />
                                                                )}
                                                            </div>
                                                            <div>
                                                                <p className="text-sm font-semibold text-gray-900">
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
                                                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                                                            visit.visit_date 
                                                                ? 'bg-green-50 text-green-700 border border-green-200' 
                                                                : 'bg-gray-50 text-gray-600 border border-gray-200'
                                                        }`}>
                                                            {visit.visit_date ? 'Completed' : 'Pending'}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-12">
                                            <div className="p-4 bg-gray-50 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                                                <Calendar className="h-8 w-8 text-gray-400" />
                                            </div>
                                            <p className="text-sm text-gray-600">No prenatal visits recorded yet.</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Nutritional Assessment */}
                            {maternalRecord.nutritional_assessment && (
                                <div className="bg-white rounded-xl shadow-sm border border-indigo-200 overflow-hidden">
                                    <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <Activity className="h-5 w-5 text-white" />
                                            <h3 className="text-lg font-semibold text-white">
                                                Nutritional Assessment
                                            </h3>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Activity className="h-4 w-4 text-gray-600" />
                                                    <p className="text-xs font-medium text-gray-600">Height</p>
                                                </div>
                                                <p className="text-2xl font-bold text-gray-900">
                                                    {maternalRecord.nutritional_assessment.height || 'N/A'}
                                                </p>
                                                <p className="text-xs text-gray-500 mt-1">centimeters</p>
                                            </div>
                                            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Activity className="h-4 w-4 text-gray-600" />
                                                    <p className="text-xs font-medium text-gray-600">Weight</p>
                                                </div>
                                                <p className="text-2xl font-bold text-gray-900">
                                                    {maternalRecord.nutritional_assessment.weight || 'N/A'}
                                                </p>
                                                <p className="text-xs text-gray-500 mt-1">kilograms</p>
                                            </div>
                                            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Activity className="h-4 w-4 text-gray-600" />
                                                    <p className="text-xs font-medium text-gray-600">BMI</p>
                                                </div>
                                                <p className="text-2xl font-bold text-gray-900">
                                                    {maternalRecord.nutritional_assessment.bmi || 'N/A'}
                                                </p>
                                                <p className="text-xs text-gray-500 mt-1">body mass index</p>
                                            </div>
                                            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <CheckCircle className="h-4 w-4 text-gray-600" />
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
                                <div className="bg-white rounded-xl shadow-sm border border-indigo-200 overflow-hidden">
                                    <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <Activity className="h-5 w-5 text-white" />
                                            <h3 className="text-lg font-semibold text-white">
                                                Immunization Record
                                            </h3>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <div className="border border-gray-200 rounded-lg p-5 hover:shadow-sm transition-shadow">
                                            <div className="flex items-start gap-4">
                                                <div className="p-3 bg-green-50 rounded-lg">
                                                    <CheckCircle className="h-6 w-6 text-green-600" />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-sm font-semibold text-gray-900 mb-1">
                                                        Tetanus Toxoid Vaccination
                                                    </p>
                                                    <p className="text-xs text-gray-600">
                                                        Administered on {new Date(maternalRecord.immunization_record.created_at).toLocaleDateString('en-US', {
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric'
                                                        })}
                                                    </p>
                                                    <div className="mt-3 pt-3 border-t border-gray-200">
                                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
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
                                <div className="bg-white rounded-xl shadow-sm border border-indigo-200 overflow-hidden">
                                    <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <Pill className="h-5 w-5 text-white" />
                                            <h3 className="text-lg font-semibold text-white">
                                                Prenatal Supplementations
                                            </h3>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {maternalRecord.prenatal_supplementations.map((supp, index) => (
                                                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                                                    <div className="flex items-start gap-3">
                                                        <div className="p-2 bg-gray-50 rounded-lg">
                                                            <Pill className="h-5 w-5 text-gray-600" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <p className="text-sm font-semibold text-gray-900 mb-1">
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
                                <div className="bg-white rounded-xl shadow-sm border border-indigo-200 overflow-hidden">
                                    <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <TestTube className="h-5 w-5 text-white" />
                                            <h3 className="text-lg font-semibold text-white">
                                                Laboratory Screening
                                            </h3>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <div className="border border-gray-200 rounded-lg p-5 hover:shadow-sm transition-shadow">
                                            <div className="flex items-start gap-4">
                                                <div className="p-3 bg-indigo-50 rounded-lg">
                                                    <TestTube className="h-6 w-6 text-indigo-600" />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-sm font-semibold text-gray-900 mb-1">
                                                        Laboratory Tests Completed
                                                    </p>
                                                    <p className="text-xs text-gray-600">
                                                        Date: {new Date(maternalRecord.laboratory_screening.created_at).toLocaleDateString('en-US', {
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric'
                                                        })}
                                                    </p>
                                                    <div className="mt-3 pt-3 border-t border-gray-200">
                                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-200">
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
                                <div className="bg-white rounded-xl shadow-sm border border-indigo-200 overflow-hidden">
                                    <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <Baby className="h-5 w-5 text-white" />
                                            <h3 className="text-lg font-semibold text-white">
                                                Delivery Information
                                            </h3>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="border border-gray-200 rounded-lg p-5 hover:shadow-sm transition-shadow">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Calendar className="h-4 w-4 text-gray-600" />
                                                    <p className="text-xs font-medium text-gray-600">Delivery Date</p>
                                                </div>
                                                <p className="text-lg font-semibold text-gray-900">
                                                    {maternalRecord.delivery_information.delivery_date 
                                                        ? new Date(maternalRecord.delivery_information.delivery_date).toLocaleDateString('en-US', {
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric'
                                                        })
                                                        : 'N/A'}
                                                </p>
                                            </div>
                                            <div className="border border-gray-200 rounded-lg p-5 hover:shadow-sm transition-shadow">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Heart className="h-4 w-4 text-gray-600" />
                                                    <p className="text-xs font-medium text-gray-600">Type of Delivery</p>
                                                </div>
                                                <p className="text-lg font-semibold text-gray-900">
                                                    {maternalRecord.delivery_information.type_of_delivery || 'N/A'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                            <div className="max-w-md mx-auto">
                                <div className="p-4 bg-gray-50 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                                    <FileText className="h-8 w-8 text-gray-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
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
