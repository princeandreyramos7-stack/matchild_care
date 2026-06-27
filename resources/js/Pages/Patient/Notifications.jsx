import PatientLayout from '@/Layouts/PatientLayout';
import { Head } from '@inertiajs/react';
import { Bell, Calendar, AlertCircle, CheckCircle, Heart, Clipboard, FileText, Pill, Activity, Baby, AlertTriangle, Info } from 'lucide-react';

export default function Notifications({ maternalRecord }) {
    const getUpcomingVisits = () => {
        if (!maternalRecord?.prenatal_visits) return [];
        
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        return maternalRecord.prenatal_visits.filter(visit => {
            if (!visit.visit_date) {
                return true;
            }
            
            const visitDate = new Date(visit.visit_date);
            visitDate.setHours(0, 0, 0, 0);
            
            return visitDate >= today;
        }).sort((a, b) => {
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
            
            return visitDate < today;
        }).sort((a, b) => new Date(b.visit_date) - new Date(a.visit_date));
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
            title: "Prenatal Vitamins",
            message: "Take your prenatal vitamins with food every day",
            priority: "daily"
        },
        {
            icon: Activity,
            title: "Stay Active",
            message: "Light exercise like walking for 30 minutes daily is beneficial",
            priority: "daily"
        },
        {
            icon: Heart,
            title: "Stay Hydrated",
            message: "Drink at least 8-10 glasses of water throughout the day",
            priority: "daily"
        },
        {
            icon: Baby,
            title: "Monitor Baby",
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
                            {/* EDC Countdown - Professional Style */}
                            {daysUntilEDC !== null && daysUntilEDC > 0 && (
                                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                    <div className="flex items-center gap-4">
                                        <div className="p-4 bg-indigo-50 rounded-xl">
                                            <Heart className="h-8 w-8 text-indigo-600" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-baseline gap-3">
                                                <h3 className="text-3xl font-bold text-gray-900">
                                                    {daysUntilEDC}
                                                </h3>
                                                <span className="text-lg text-gray-600">
                                                    Days Until Your Due Date
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-500 mt-1">
                                                Expected Date: {new Date(maternalRecord.expected_date_of_delivery).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Upcoming Appointments - Clean Design */}
                            <div className="bg-white rounded-xl shadow-sm border border-indigo-200 overflow-hidden">
                                <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <Calendar className="h-5 w-5 text-white" />
                                        <h3 className="text-lg font-semibold text-white">
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
                                                    <div key={index} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                                                        {/* Visit Header */}
                                                        <div className="flex items-start justify-between mb-5">
                                                            <div className="flex items-center gap-3">
                                                                <div className="p-3 bg-indigo-50 rounded-lg">
                                                                    <Calendar className="h-6 w-6 text-indigo-600" />
                                                                </div>
                                                                <div>
                                                                    <h4 className="text-lg font-semibold text-gray-900">
                                                                        {guidance.title}
                                                                    </h4>
                                                                    <p className="text-sm text-gray-600 mt-0.5">
                                                                        {visit.visit_date 
                                                                            ? new Date(visit.visit_date).toLocaleDateString('en-US', {
                                                                                weekday: 'long',
                                                                                year: 'numeric',
                                                                                month: 'long',
                                                                                day: 'numeric'
                                                                            })
                                                                            : 'Date to be scheduled'}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-200">
                                                                Visit #{visit.visit_number}
                                                            </span>
                                                        </div>

                                                        {/* What to Prepare */}
                                                        <div className="mb-5">
                                                            <div className="flex items-center gap-2 mb-3">
                                                                <div className="p-1.5 bg-gray-100 rounded">
                                                                    <Clipboard className="h-4 w-4 text-gray-600" />
                                                                </div>
                                                                <h5 className="font-medium text-gray-900">What to Bring</h5>
                                                            </div>
                                                            <ul className="space-y-2 ml-8">
                                                                {guidance.preparations.map((item, idx) => (
                                                                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                                                                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-1.5"></div>
                                                                        <span>{item}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>

                                                        {/* What to Expect */}
                                                        <div className="mb-5">
                                                            <div className="flex items-center gap-2 mb-3">
                                                                <div className="p-1.5 bg-gray-100 rounded">
                                                                    <Activity className="h-4 w-4 text-gray-600" />
                                                                </div>
                                                                <h5 className="font-medium text-gray-900">What to Expect</h5>
                                                            </div>
                                                            <ul className="space-y-2 ml-8">
                                                                {guidance.whatToExpect.map((item, idx) => (
                                                                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                                                                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-1.5"></div>
                                                                        <span>{item}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>

                                                        {/* Tests & Screenings */}
                                                        <div>
                                                            <div className="flex items-center gap-2 mb-3">
                                                                <div className="p-1.5 bg-gray-100 rounded">
                                                                    <FileText className="h-4 w-4 text-gray-600" />
                                                                </div>
                                                                <h5 className="font-medium text-gray-900">Tests & Screenings</h5>
                                                            </div>
                                                            <ul className="space-y-2 ml-8">
                                                                {guidance.tests.map((item, idx) => (
                                                                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                                                                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-1.5"></div>
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
                                        <div className="text-center py-12">
                                            {completedVisits.length > 0 ? (
                                                <div className="max-w-md mx-auto">
                                                    <div className="p-4 bg-gray-50 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                                                        <CheckCircle className="h-8 w-8 text-gray-400" />
                                                    </div>
                                                    <h4 className="font-semibold text-gray-900 mb-2">
                                                        All Scheduled Visits Completed
                                                    </h4>
                                                    <p className="text-sm text-gray-600 mb-4">
                                                        You've completed {completedVisits.length} prenatal visit{completedVisits.length > 1 ? 's' : ''}.
                                                    </p>
                                                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
                                                        <div className="flex gap-3">
                                                            <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                                            <div>
                                                                <p className="text-sm text-gray-700">
                                                                    Your next appointment (Visit #{getNextVisitNumber()}) will be scheduled by your healthcare provider.
                                                                </p>
                                                                <p className="text-xs text-gray-600 mt-2">
                                                                    Please check back for updates or contact your clinic if you have questions.
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div>
                                                    <div className="p-4 bg-gray-50 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                                                        <Calendar className="h-8 w-8 text-gray-400" />
                                                    </div>
                                                    <p className="text-sm text-gray-600">
                                                        No upcoming appointments at this time
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Daily Health Reminders - Clean Grid */}
                            <div className="bg-white rounded-xl shadow-sm border border-indigo-200 overflow-hidden">
                                <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <Bell className="h-5 w-5 text-white" />
                                        <h3 className="text-lg font-semibold text-white">
                                            Daily Health Reminders
                                        </h3>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {healthReminders.map((reminder, index) => {
                                            const Icon = reminder.icon;
                                            return (
                                                <div key={index} className="border border-indigo-200 rounded-lg p-4 hover:shadow-md hover:border-indigo-300 transition-all bg-gradient-to-br from-white to-indigo-50">
                                                    <div className="flex items-start gap-3">
                                                        <div className="p-2 bg-indigo-100 rounded-lg">
                                                            <Icon className="h-5 w-5 text-indigo-600" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <p className="text-sm font-medium text-gray-900 mb-1">
                                                                {reminder.title}
                                                            </p>
                                                            <p className="text-sm text-gray-600">
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

                            {/* Warning Signs - Professional Alert Style */}
                            <div className="bg-white border-l-4 border-red-500 rounded-xl shadow-sm p-6">
                                <div className="flex items-start gap-4">
                                    <div className="bg-red-50 p-3 rounded-lg">
                                        <AlertTriangle className="h-6 w-6 text-red-600" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                                            Important: Warning Signs
                                        </h3>
                                        <p className="text-sm text-gray-700 mb-4">
                                            Contact your healthcare provider immediately if you experience any of the following:
                                        </p>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            {warningSignsToWatch.map((sign, index) => (
                                                <div key={index} className="flex items-start gap-2 text-sm text-gray-700">
                                                    <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                                                    <span>{sign}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="mt-5 pt-4 border-t border-gray-200">
                                            <p className="text-sm font-medium text-gray-900">
                                                Emergency Contact: Call your healthcare provider or go to the nearest emergency room
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Completed Visits - Simple List */}
                            {completedVisits.length > 0 && (
                                <div className="bg-white rounded-xl shadow-sm border border-indigo-200 overflow-hidden">
                                    <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <CheckCircle className="h-5 w-5 text-white" />
                                            <h3 className="text-lg font-semibold text-white">
                                                Completed Visits
                                            </h3>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                                            <div className="flex items-center gap-2">
                                                <CheckCircle className="h-5 w-5 text-green-600" />
                                                <p className="text-sm font-medium text-gray-900">
                                                    You've completed {completedVisits.length} prenatal visit{completedVisits.length > 1 ? 's' : ''}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            {completedVisits.slice(0, 5).map((visit, index) => (
                                                <div key={index} className="border border-gray-200 rounded-lg p-4">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-3">
                                                            <div className="p-2 bg-gray-50 rounded-lg">
                                                                <Calendar className="h-5 w-5 text-gray-600" />
                                                            </div>
                                                            <div>
                                                                <p className="text-sm font-medium text-gray-900">
                                                                    Prenatal Visit #{visit.visit_number}
                                                                </p>
                                                                <p className="text-xs text-gray-500 mt-0.5">
                                                                    {new Date(visit.visit_date).toLocaleDateString('en-US', {
                                                                        year: 'numeric',
                                                                        month: 'long',
                                                                        day: 'numeric'
                                                                    })}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <CheckCircle className="h-5 w-5 text-green-600" />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                            <div className="max-w-md mx-auto">
                                <div className="p-4 bg-gray-50 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                                    <Bell className="h-8 w-8 text-gray-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    No Notifications Yet
                                </h3>
                                <p className="text-sm text-gray-600">
                                    Your notifications and reminders will appear here once your medical records are created.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </PatientLayout>
    );
}
