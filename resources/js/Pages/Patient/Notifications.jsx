import PatientLayout from '@/Layouts/PatientLayout';
import { Head } from '@inertiajs/react';
import { Bell, Calendar, AlertCircle, CheckCircle, Clock, Heart, Clipboard, FileText, Pill, Activity, Baby, AlertTriangle } from 'lucide-react';

export default function Notifications({ maternalRecord }) {
    const getUpcomingVisits = () => {
        if (!maternalRecord?.prenatal_visits) return [];
        
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        return maternalRecord.prenatal_visits.filter(visit => {
            if (!visit.visit_date) {
                // Show visits without dates as upcoming
                return true;
            }
            
            const visitDate = new Date(visit.visit_date);
            visitDate.setHours(0, 0, 0, 0);
            
            // Show visits with future dates or today
            return visitDate >= today;
        }).sort((a, b) => {
            // Sort: visits without dates first, then by date
            if (!a.visit_date && !b.visit_date) return a.visit_number - b.visit_number;
            if (!a.visit_date) return -1;
            if (!b.visit_date) return 1;
            return new Date(a.visit_date) - new Date(b.visit_date);
        });
    };

    const getCompletedVisits = () => {
        if (!maternalRecord?.prenatal_visits) return [];
        
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        return maternalRecord.prenatal_visits.filter(visit => {
            if (!visit.visit_date) return false;
            
            const visitDate = new Date(visit.visit_date);
            visitDate.setHours(0, 0, 0, 0);
            
            // Only show visits with past dates
            return visitDate < today;
        }).sort((a, b) => new Date(b.visit_date) - new Date(a.visit_date)); // Most recent first
    };

    const getNextVisitNumber = () => {
        const completed = getCompletedVisits();
        if (completed.length === 0) return 1;
        return completed[0].visit_number + 1;
    };

    const upcomingVisits = getUpcomingVisits();
    const completedVisits = getCompletedVisits();

    const getDaysUntilEDC = () => {
        if (!maternalRecord?.expected_date_of_delivery) return null;
        
        const edc = new Date(maternalRecord.expected_date_of_delivery);
        const today = new Date();
        const diffTime = edc - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        return diffDays > 0 ? diffDays : 0;
    };

    const daysUntilEDC = getDaysUntilEDC();

    // Visit preparation guides based on visit number
    const getVisitGuidance = (visitNumber) => {
        const guides = {
            1: {
                title: "First Prenatal Visit",
                preparations: [
                    "Bring your health insurance card and ID",
                    "List of current medications and supplements",
                    "Family medical history information",
                    "Questions about your pregnancy concerns"
                ],
                whatToExpect: [
                    "Complete physical examination",
                    "Blood tests (blood type, Rh factor, anemia screening)",
                    "Urine test for infection and protein",
                    "Blood pressure measurement",
                    "Discussion about your due date calculation",
                    "Prenatal vitamins prescription"
                ],
                tests: [
                    "Complete Blood Count (CBC)",
                    "Blood Type and Rh Factor",
                    "Hepatitis B screening",
                    "HIV screening",
                    "Rubella immunity test",
                    "Urinalysis"
                ]
            },
            2: {
                title: "Second Prenatal Visit",
                preparations: [
                    "Note any symptoms or concerns since last visit",
                    "Bring your prenatal vitamin bottle",
                    "Prepare questions about nutrition and exercise",
                    "Track any unusual symptoms"
                ],
                whatToExpect: [
                    "Weight and blood pressure check",
                    "Urine test for protein and sugar",
                    "Fetal heartbeat monitoring",
                    "Fundal height measurement",
                    "Discussion about nutrition and weight gain",
                    "Review of test results from first visit"
                ],
                tests: [
                    "Urine test",
                    "Blood pressure monitoring",
                    "Weight tracking"
                ]
            },
            3: {
                title: "Third Prenatal Visit",
                preparations: [
                    "List of any new symptoms or discomforts",
                    "Questions about baby's movements",
                    "Concerns about physical changes",
                    "Partner can accompany for support"
                ],
                whatToExpect: [
                    "Routine weight and blood pressure check",
                    "Fetal heart rate monitoring",
                    "Fundal height measurement",
                    "Discussion about fetal movements",
                    "Ultrasound may be scheduled",
                    "Review of pregnancy progress"
                ],
                tests: [
                    "Routine urine test",
                    "Blood pressure check",
                    "Possible ultrasound scheduling"
                ]
            },
            4: {
                title: "Fourth Prenatal Visit",
                preparations: [
                    "Questions about labor and delivery",
                    "Birth plan preferences to discuss",
                    "Hospital tour information if available",
                    "Prenatal class enrollment questions"
                ],
                whatToExpect: [
                    "Standard prenatal checks (BP, weight, urine)",
                    "Fetal position assessment",
                    "Discussion about labor signs",
                    "Birth plan discussion",
                    "Hospital pre-registration information",
                    "Breastfeeding information"
                ],
                tests: [
                    "Gestational diabetes screening (if due)",
                    "Group B Strep test (around 35-37 weeks)",
                    "Routine blood work if needed"
                ]
            }
        };

        return guides[visitNumber] || {
            title: `Prenatal Visit #${visitNumber}`,
            preparations: [
                "Note any symptoms or concerns",
                "Bring your prenatal records",
                "Prepare your questions",
                "Bring a support person if desired"
            ],
            whatToExpect: [
                "Routine weight and blood pressure check",
                "Fetal heart rate monitoring",
                "Fundal height measurement",
                "Discussion about pregnancy progress",
                "Review of any test results",
                "Planning for next steps"
            ],
            tests: [
                "Routine urine test",
                "Blood pressure monitoring",
                "Additional tests as needed"
            ]
        };
    };

    const healthReminders = [
        {
            icon: Pill,
            color: "bg-blue-100 text-blue-600",
            title: "Medication Reminder",
            message: "Take your prenatal vitamins with food every day",
            priority: "daily"
        },
        {
            icon: Activity,
            color: "bg-green-100 text-green-600",
            title: "Stay Active",
            message: "Light exercise like walking for 30 minutes daily is beneficial",
            priority: "daily"
        },
        {
            icon: Heart,
            color: "bg-pink-100 text-pink-600",
            title: "Hydration",
            message: "Drink at least 8-10 glasses of water throughout the day",
            priority: "daily"
        },
        {
            icon: Baby,
            color: "bg-purple-100 text-purple-600",
            title: "Fetal Movements",
            message: "Track your baby's movements - contact doctor if movements decrease",
            priority: "important"
        }
    ];

    const warningSignsToWatch = [
        "Vaginal bleeding or fluid leakage",
        "Severe abdominal pain or cramping",
        "Sudden swelling of face, hands, or feet",
        "Severe or persistent headaches",
        "Vision changes or blurred vision",
        "Fever above 100.4°F (38°C)",
        "Decreased fetal movement",
        "Painful urination or inability to urinate"
    ];

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

                            {/* Upcoming Appointments with Detailed Guidance */}
                            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                                <div className="bg-gradient-to-r from-yellow-500 to-orange-600 px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-white/20 rounded-lg">
                                            <Calendar className="h-5 w-5 text-white" />
                                        </div>
                                        <h3 className="text-lg font-bold text-white">
                                            Upcoming Prenatal Visits
                                        </h3>
                                    </div>
                                </div>
                                <div className="p-6">
                                    {upcomingVisits.length > 0 ? (
                                        <div className="space-y-6">
                                            {upcomingVisits.map((visit, index) => {
                                                const guidance = getVisitGuidance(visit.visit_number);
                                                return (
                                                    <div key={index} className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 border-l-4 border-yellow-500">
                                                        {/* Visit Header */}
                                                        <div className="flex items-start justify-between mb-4">
                                                            <div className="flex items-center gap-3">
                                                                <div className="p-3 bg-yellow-100 rounded-lg">
                                                                    <Calendar className="h-6 w-6 text-yellow-600" />
                                                                </div>
                                                                <div>
                                                                    <h4 className="text-lg font-bold text-gray-900">
                                                                        {guidance.title}
                                                                    </h4>
                                                                    <p className="text-sm text-gray-600">
                                                                        {visit.visit_date 
                                                                            ? `Scheduled for ${new Date(visit.visit_date).toLocaleDateString('en-US', {
                                                                                weekday: 'long',
                                                                                year: 'numeric',
                                                                                month: 'long',
                                                                                day: 'numeric'
                                                                            })}`
                                                                            : 'Date to be scheduled - Please contact your healthcare provider'}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">
                                                                Visit #{visit.visit_number}
                                                            </span>
                                                        </div>

                                                        {/* What to Prepare */}
                                                        <div className="mb-4">
                                                            <div className="flex items-center gap-2 mb-3">
                                                                <Clipboard className="h-5 w-5 text-orange-600" />
                                                                <h5 className="font-semibold text-gray-900">What to Bring & Prepare:</h5>
                                                            </div>
                                                            <ul className="space-y-2 ml-7">
                                                                {guidance.preparations.map((item, idx) => (
                                                                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                                                                        <div className="bg-orange-200 rounded-full p-1 mt-1">
                                                                            <div className="w-1.5 h-1.5 bg-orange-600 rounded-full"></div>
                                                                        </div>
                                                                        <span>{item}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>

                                                        {/* What to Expect */}
                                                        <div className="mb-4">
                                                            <div className="flex items-center gap-2 mb-3">
                                                                <Activity className="h-5 w-5 text-blue-600" />
                                                                <h5 className="font-semibold text-gray-900">What to Expect During Visit:</h5>
                                                            </div>
                                                            <ul className="space-y-2 ml-7">
                                                                {guidance.whatToExpect.map((item, idx) => (
                                                                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                                                                        <div className="bg-blue-200 rounded-full p-1 mt-1">
                                                                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                                                                        </div>
                                                                        <span>{item}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>

                                                        {/* Tests & Screenings */}
                                                        <div>
                                                            <div className="flex items-center gap-2 mb-3">
                                                                <FileText className="h-5 w-5 text-purple-600" />
                                                                <h5 className="font-semibold text-gray-900">Tests & Screenings:</h5>
                                                            </div>
                                                            <ul className="space-y-2 ml-7">
                                                                {guidance.tests.map((item, idx) => (
                                                                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                                                                        <div className="bg-purple-200 rounded-full p-1 mt-1">
                                                                            <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
                                                                        </div>
                                                                        <span>{item}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    ) : (
                                        <div className="text-center py-8">
                                            {completedVisits.length > 0 ? (
                                                <div className="max-w-md mx-auto">
                                                    <Calendar className="h-12 w-12 text-blue-500 mx-auto mb-3" />
                                                    <h4 className="font-semibold text-gray-900 mb-2">
                                                        All Scheduled Visits Completed
                                                    </h4>
                                                    <p className="text-sm text-gray-600 mb-4">
                                                        Great job! You've completed {completedVisits.length} prenatal visit{completedVisits.length > 1 ? 's' : ''}.
                                                    </p>
                                                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                                        <p className="text-sm text-gray-700">
                                                            💡 Your next appointment (Visit #{getNextVisitNumber()}) will be scheduled by your healthcare provider.
                                                        </p>
                                                        <p className="text-xs text-gray-600 mt-2">
                                                            Please check back here for updates or contact your clinic if you have questions.
                                                        </p>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div>
                                                    <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
                                                    <p className="text-sm text-gray-600">
                                                        No upcoming appointments at this time
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Daily Health Reminders */}
                            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-white/20 rounded-lg">
                                            <Bell className="h-5 w-5 text-white" />
                                        </div>
                                        <h3 className="text-lg font-bold text-white">
                                            Daily Health Reminders
                                        </h3>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {healthReminders.map((reminder, index) => {
                                            const Icon = reminder.icon;
                                            return (
                                                <div key={index} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100">
                                                    <div className="flex items-start gap-3">
                                                        <div className={`p-2 rounded-lg ${reminder.color}`}>
                                                            <Icon className="h-5 w-5" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <p className="text-sm font-bold text-gray-900 mb-1">
                                                                {reminder.title}
                                                            </p>
                                                            <p className="text-xs text-gray-600">
                                                                {reminder.message}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>

                            {/* Warning Signs to Watch */}
                            <div className="bg-gradient-to-br from-red-50 to-orange-50 border-l-4 border-red-500 rounded-xl shadow-lg p-6">
                                <div className="flex items-start gap-4">
                                    <div className="bg-red-100 p-3 rounded-lg">
                                        <AlertTriangle className="h-6 w-6 text-red-600" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                                            ⚠️ Warning Signs - Contact Your Doctor Immediately If You Experience:
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            {warningSignsToWatch.map((sign, index) => (
                                                <div key={index} className="flex items-start gap-2 text-sm text-gray-700">
                                                    <AlertCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                                                    <span>{sign}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="mt-4 pt-4 border-t border-red-200">
                                            <p className="text-sm font-semibold text-red-800">
                                                📞 Emergency Contact: Call your healthcare provider or go to the nearest emergency room immediately
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Recent Activity */}
                            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                                <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-white/20 rounded-lg">
                                            <CheckCircle className="h-5 w-5 text-white" />
                                        </div>
                                        <h3 className="text-lg font-bold text-white">
                                            Completed Visits
                                        </h3>
                                    </div>
                                </div>
                                <div className="p-6">
                                    {completedVisits.length > 0 ? (
                                        <div>
                                            <div className="mb-4 bg-green-50 border border-green-200 rounded-lg p-4">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <CheckCircle className="h-5 w-5 text-green-600" />
                                                    <p className="text-sm font-semibold text-gray-900">
                                                        You've completed {completedVisits.length} prenatal visit{completedVisits.length > 1 ? 's' : ''}!
                                                    </p>
                                                </div>
                                                <p className="text-xs text-gray-600 ml-7">
                                                    Keep up the great work! Regular prenatal care is essential for a healthy pregnancy.
                                                </p>
                                            </div>
                                            <div className="space-y-3">
                                                {completedVisits.slice(0, 5).map((visit, index) => (
                                                    <div key={index} className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
                                                        <div className="flex items-start gap-3">
                                                            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                                                            <div className="flex-1">
                                                                <p className="text-sm font-bold text-gray-900 mb-1">
                                                                    Prenatal Visit #{visit.visit_number}
                                                                </p>
                                                                <p className="text-xs text-gray-600">
                                                                    Completed on {new Date(visit.visit_date).toLocaleDateString('en-US', {
                                                                        year: 'numeric',
                                                                        month: 'long',
                                                                        day: 'numeric'
                                                                    })}
                                                                </p>
                                                            </div>
                                                            <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                                                                ✓ Done
                                                            </span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ) : (
                                        <p className="text-sm text-gray-600 text-center py-4">
                                            No completed visits yet. Your first prenatal visit will be scheduled soon!
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                            <div className="max-w-md mx-auto">
                                <div className="bg-gray-100 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                                    <Bell className="h-12 w-12 text-gray-400" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    No Notifications Available
                                </h3>
                                <p className="text-sm text-gray-600">
                                    Your notifications will appear here once your maternal care record is set up.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </PatientLayout>
    );
}
