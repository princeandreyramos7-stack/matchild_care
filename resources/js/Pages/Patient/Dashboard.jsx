import PatientLayout from '@/Layouts/PatientLayout';
import { Head } from '@inertiajs/react';

export default function PatientDashboard({ auth, maternalRecord }) {
    return (
        <PatientLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    My Health Records
                </h2>
            }
        >
            <Head title="My Health Records" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-lg font-semibold mb-4">
                                Welcome, {auth.user.name}
                            </h3>
                            
                            {maternalRecord ? (
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="bg-blue-50 p-4 rounded-lg">
                                            <h4 className="font-semibold text-blue-900 mb-2">
                                                Personal Information
                                            </h4>
                                            <div className="space-y-2 text-sm">
                                                <p><span className="font-medium">Age:</span> {maternalRecord.age}</p>
                                                <p><span className="font-medium">Blood Type:</span> {maternalRecord.blood_type || 'N/A'}</p>
                                                <p><span className="font-medium">Contact:</span> {maternalRecord.contact_number}</p>
                                            </div>
                                        </div>

                                        <div className="bg-green-50 p-4 rounded-lg">
                                            <h4 className="font-semibold text-green-900 mb-2">
                                                Pregnancy Status
                                            </h4>
                                            <div className="space-y-2 text-sm">
                                                <p><span className="font-medium">LMP:</span> {maternalRecord.lmp}</p>
                                                <p><span className="font-medium">EDC:</span> {maternalRecord.edc}</p>
                                                <p><span className="font-medium">Gravida:</span> {maternalRecord.gravida}</p>
                                                <p><span className="font-medium">Para:</span> {maternalRecord.para}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-purple-50 p-4 rounded-lg">
                                        <h4 className="font-semibold text-purple-900 mb-2">
                                            Prenatal Visits
                                        </h4>
                                        {maternalRecord.prenatal_visits?.length > 0 ? (
                                            <div className="space-y-2">
                                                {maternalRecord.prenatal_visits.map((visit, index) => (
                                                    <div key={index} className="bg-white p-3 rounded border">
                                                        <p className="text-sm">
                                                            <span className="font-medium">Visit {index + 1}:</span> {visit.visit_date}
                                                        </p>
                                                        <p className="text-sm">Weight: {visit.weight}kg | BP: {visit.blood_pressure}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-sm text-gray-600">No prenatal visits recorded yet.</p>
                                        )}
                                    </div>

                                    <div className="bg-yellow-50 p-4 rounded-lg">
                                        <h4 className="font-semibold text-yellow-900 mb-2">
                                            Immunizations
                                        </h4>
                                        {maternalRecord.immunization_records?.length > 0 ? (
                                            <div className="space-y-2">
                                                {maternalRecord.immunization_records.map((record, index) => (
                                                    <div key={index} className="bg-white p-3 rounded border">
                                                        <p className="text-sm">
                                                            <span className="font-medium">{record.vaccine_type}:</span> {record.date_given}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-sm text-gray-600">No immunization records yet.</p>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <p className="text-gray-600">
                                        No maternal records found. Please contact your healthcare provider.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </PatientLayout>
    );
}
