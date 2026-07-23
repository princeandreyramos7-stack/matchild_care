import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function SmsTest({ auth, patients, config }) {
    const [activeTab, setActiveTab] = useState('basic');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    
    const [formData, setFormData] = useState({
        phone_number: '',
        message: 'Test message from Matcare system! 📱',
        patient_name: '',
        appointment_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        appointment_time: '9:00 AM',
        visit_number: 1,
        next_visit_date: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        username: '',
        password: '',
        maternal_record_id: '',
        notification_type: 'appointment',
        custom_message: '',
    });

    const showMessage = (type, text) => {
        setMessage({ type, text });
        setTimeout(() => setMessage({ type: '', text: '' }), 5000);
    };

    const sendSms = async (endpoint, data) => {
        setLoading(true);
        try {
            const response = await fetch(`/sms-test/${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            
            if (result.success) {
                showMessage('success', result.message);
            } else {
                showMessage('error', result.message);
            }
        } catch (error) {
            showMessage('error', 'Network error: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleBasicTest = (e) => {
        e.preventDefault();
        sendSms('basic', {
            phone_number: formData.phone_number,
            message: formData.message,
        });
    };

    const handleAppointmentTest = (e) => {
        e.preventDefault();
        sendSms('appointment', {
            phone_number: formData.phone_number,
            patient_name: formData.patient_name,
            appointment_date: formData.appointment_date,
            appointment_time: formData.appointment_time,
        });
    };

    const handleVisitTest = (e) => {
        e.preventDefault();
        sendSms('visit', {
            phone_number: formData.phone_number,
            patient_name: formData.patient_name,
            visit_number: formData.visit_number,
            next_visit_date: formData.next_visit_date,
        });
    };

    const handleCredentialsTest = (e) => {
        e.preventDefault();
        sendSms('credentials', {
            phone_number: formData.phone_number,
            patient_name: formData.patient_name,
            username: formData.username,
            password: formData.password,
        });
    };

    const handlePatientNotification = (e) => {
        e.preventDefault();
        sendSms('send-to-patient', {
            maternal_record_id: formData.maternal_record_id,
            notification_type: formData.notification_type,
            custom_message: formData.custom_message,
        });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="SMS Testing Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-6">
                        <div className="p-6">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                📱 SMS Testing Dashboard
                            </h1>
                            <p className="text-gray-600">
                                Test SMS notifications for appointments, visits, and credentials
                            </p>
                        </div>
                    </div>

                    {/* Configuration Status */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-6">
                        <div className="p-6">
                            <h2 className="text-lg font-semibold mb-4">Configuration Status</h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div>
                                    <span className="text-sm text-gray-600">Provider:</span>
                                    <p className="font-semibold">{config.provider}</p>
                                </div>
                                <div>
                                    <span className="text-sm text-gray-600">Sender Name:</span>
                                    <p className="font-semibold">{config.sender_name}</p>
                                </div>
                                <div>
                                    <span className="text-sm text-gray-600">Status:</span>
                                    <p className={`font-semibold ${config.enabled ? 'text-green-600' : 'text-red-600'}`}>
                                        {config.enabled ? '✓ Enabled' : '✗ Disabled'}
                                    </p>
                                </div>
                                <div>
                                    <span className="text-sm text-gray-600">API Key:</span>
                                    <p className={`font-semibold ${config.api_configured ? 'text-green-600' : 'text-red-600'}`}>
                                        {config.api_configured ? '✓ Configured' : '✗ Not Set'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Message Alert */}
                    {message.text && (
                        <div className={`mb-6 p-4 rounded-lg ${
                            message.type === 'success' 
                                ? 'bg-green-50 border border-green-200 text-green-800' 
                                : 'bg-red-50 border border-red-200 text-red-800'
                        }`}>
                            {message.text}
                        </div>
                    )}

                    {/* Tabs */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="border-b border-gray-200">
                            <nav className="flex -mb-px">
                                {[
                                    { key: 'basic', label: 'Basic SMS' },
                                    { key: 'appointment', label: 'Appointment' },
                                    { key: 'visit', label: 'Visit' },
                                    { key: 'credentials', label: 'Credentials' },
                                    { key: 'patient', label: 'Patient List' },
                                ].map((tab) => (
                                    <button
                                        key={tab.key}
                                        onClick={() => setActiveTab(tab.key)}
                                        className={`px-6 py-3 text-sm font-medium border-b-2 ${
                                            activeTab === tab.key
                                                ? 'border-indigo-500 text-indigo-600'
                                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </nav>
                        </div>

                        <div className="p-6">
                            {/* Basic SMS Tab */}
                            {activeTab === 'basic' && (
                                <form onSubmit={handleBasicTest} className="space-y-4">
                                    <h3 className="text-lg font-semibold mb-4">Send Basic SMS</h3>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Phone Number
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.phone_number}
                                            onChange={(e) => setFormData({...formData, phone_number: e.target.value})}
                                            placeholder="09123456789"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Message (Max 160 characters)
                                        </label>
                                        <textarea
                                            value={formData.message}
                                            onChange={(e) => setFormData({...formData, message: e.target.value})}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                            rows="3"
                                            maxLength="160"
                                            required
                                        />
                                        <p className="text-sm text-gray-500 mt-1">
                                            {formData.message.length}/160 characters
                                        </p>
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50"
                                    >
                                        {loading ? 'Sending...' : 'Send Basic SMS'}
                                    </button>
                                </form>
                            )}

                            {/* Appointment SMS Tab */}
                            {activeTab === 'appointment' && (
                                <form onSubmit={handleAppointmentTest} className="space-y-4">
                                    <h3 className="text-lg font-semibold mb-4">Send Appointment Reminder</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Phone Number
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.phone_number}
                                                onChange={(e) => setFormData({...formData, phone_number: e.target.value})}
                                                placeholder="09123456789"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Patient Name
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.patient_name}
                                                onChange={(e) => setFormData({...formData, patient_name: e.target.value})}
                                                placeholder="Maria"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Appointment Date
                                            </label>
                                            <input
                                                type="date"
                                                value={formData.appointment_date}
                                                onChange={(e) => setFormData({...formData, appointment_date: e.target.value})}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Appointment Time
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.appointment_time}
                                                onChange={(e) => setFormData({...formData, appointment_time: e.target.value})}
                                                placeholder="9:00 AM"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                            />
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50"
                                    >
                                        {loading ? 'Sending...' : 'Send Appointment Reminder'}
                                    </button>
                                </form>
                            )}

                            {/* Visit Notification Tab */}
                            {activeTab === 'visit' && (
                                <form onSubmit={handleVisitTest} className="space-y-4">
                                    <h3 className="text-lg font-semibold mb-4">Send Visit Notification</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Phone Number
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.phone_number}
                                                onChange={(e) => setFormData({...formData, phone_number: e.target.value})}
                                                placeholder="09123456789"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Patient Name
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.patient_name}
                                                onChange={(e) => setFormData({...formData, patient_name: e.target.value})}
                                                placeholder="Maria"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Visit Number
                                            </label>
                                            <input
                                                type="number"
                                                value={formData.visit_number}
                                                onChange={(e) => setFormData({...formData, visit_number: e.target.value})}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                                min="1"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Next Visit Date
                                            </label>
                                            <input
                                                type="date"
                                                value={formData.next_visit_date}
                                                onChange={(e) => setFormData({...formData, next_visit_date: e.target.value})}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                            />
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50"
                                    >
                                        {loading ? 'Sending...' : 'Send Visit Notification'}
                                    </button>
                                </form>
                            )}

                            {/* Credentials Tab */}
                            {activeTab === 'credentials' && (
                                <form onSubmit={handleCredentialsTest} className="space-y-4">
                                    <h3 className="text-lg font-semibold mb-4">Send Login Credentials</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Phone Number
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.phone_number}
                                                onChange={(e) => setFormData({...formData, phone_number: e.target.value})}
                                                placeholder="09123456789"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Patient Name
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.patient_name}
                                                onChange={(e) => setFormData({...formData, patient_name: e.target.value})}
                                                placeholder="Maria"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Username
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.username}
                                                onChange={(e) => setFormData({...formData, username: e.target.value})}
                                                placeholder="FS-2026-0001"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Password
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.password}
                                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                                                placeholder="FS-2026-0001M"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50"
                                    >
                                        {loading ? 'Sending...' : 'Send Credentials'}
                                    </button>
                                </form>
                            )}

                            {/* Patient List Tab */}
                            {activeTab === 'patient' && (
                                <div>
                                    <h3 className="text-lg font-semibold mb-4">Send to Registered Patients</h3>
                                    
                                    <form onSubmit={handlePatientNotification} className="space-y-4 mb-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Select Patient
                                            </label>
                                            <select
                                                value={formData.maternal_record_id}
                                                onChange={(e) => setFormData({...formData, maternal_record_id: e.target.value})}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                                required
                                            >
                                                <option value="">Choose a patient...</option>
                                                {patients.map((patient) => (
                                                    <option key={patient.id} value={patient.id}>
                                                        {patient.first_name} {patient.last_name} - {patient.phone_number}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Notification Type
                                            </label>
                                            <select
                                                value={formData.notification_type}
                                                onChange={(e) => setFormData({...formData, notification_type: e.target.value})}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                                required
                                            >
                                                <option value="appointment">Appointment Reminder</option>
                                                <option value="visit">Visit Notification</option>
                                                <option value="credentials">Login Credentials</option>
                                                <option value="custom">Custom Message</option>
                                            </select>
                                        </div>

                                        {formData.notification_type === 'custom' && (
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Custom Message
                                                </label>
                                                <textarea
                                                    value={formData.custom_message}
                                                    onChange={(e) => setFormData({...formData, custom_message: e.target.value})}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                                    rows="3"
                                                    maxLength="160"
                                                    placeholder="Enter your custom message..."
                                                    required
                                                />
                                                <p className="text-sm text-gray-500 mt-1">
                                                    {formData.custom_message.length}/160 characters
                                                </p>
                                            </div>
                                        )}

                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50"
                                        >
                                            {loading ? 'Sending...' : 'Send to Patient'}
                                        </button>
                                    </form>

                                    <div className="border-t pt-4">
                                        <h4 className="font-medium mb-3">Recent Patients with Phone Numbers</h4>
                                        <div className="space-y-2">
                                            {patients.map((patient) => (
                                                <div key={patient.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                                                    <div>
                                                        <p className="font-medium">{patient.first_name} {patient.last_name}</p>
                                                        <p className="text-sm text-gray-600">{patient.family_serial}</p>
                                                    </div>
                                                    <span className="text-sm text-gray-700">{patient.phone_number}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Instructions */}
                    <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-blue-900 mb-2">📖 How to Test</h3>
                        <ul className="text-sm text-blue-800 space-y-1">
                            <li>• <strong>Basic SMS:</strong> Send a simple test message to any phone number</li>
                            <li>• <strong>Appointment:</strong> Test appointment reminder notifications</li>
                            <li>• <strong>Visit:</strong> Test visit completion notifications</li>
                            <li>• <strong>Credentials:</strong> Test login credential sending</li>
                            <li>• <strong>Patient List:</strong> Send notifications to registered patients</li>
                        </ul>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
