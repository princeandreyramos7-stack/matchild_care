import PatientLayout from '@/Layouts/PatientLayout';
import { Head } from '@inertiajs/react';
import { Heart, Play, BookOpen, Calendar, Baby, Users, Stethoscope, Apple, Activity, ExternalLink, AlertCircle, ChevronDown, ChevronUp, CheckCircle, FileText } from 'lucide-react';
import { useState } from 'react';

export default function Dashboard({ maternalRecord }) {
    const [expandedArticle, setExpandedArticle] = useState(null);

    const toggleArticle = (index) => {
        setExpandedArticle(expandedArticle === index ? null : index);
    };
    const pregnancyVideos = [
        {
            title: "Pregnancy Health and Nutrition",
            description: "Essential nutrition tips for a healthy pregnancy",
            youtubeId: "9C_HReR_McQ",
            duration: "10:30",
            category: "Nutrition"
        },
        {
            title: "Prenatal Care: What to Expect",
            description: "Complete guide to prenatal checkups and care",
            youtubeId: "yPUUj4CZYCU",
            duration: "15:45",
            category: "Prenatal Care"
        },
        {
            title: "Exercise During Pregnancy",
            description: "Safe exercises for expecting mothers",
            youtubeId: "3bRH8HTfeUQ",
            duration: "12:20",
            category: "Exercise"
        },
        {
            title: "Preparing for Labor and Delivery",
            description: "What every mom should know about childbirth",
            youtubeId: "j7YucfJuziU",
            duration: "18:15",
            category: "Labor"
        },
        {
            title: "Postpartum Care Guide",
            description: "Taking care of yourself after delivery",
            youtubeId: "LQVW_L2rViE",
            duration: "14:30",
            category: "Postpartum"
        },
        {
            title: "Breastfeeding Basics",
            description: "Everything you need to know about breastfeeding",
            youtubeId: "1k04uxmVzwU",
            duration: "16:40",
            category: "Breastfeeding"
        }
    ];

    const educationalTopics = [
        {
            icon: Apple,
            color: "bg-red-100 text-red-600",
            title: "Nutrition During Pregnancy",
            description: "Learn about essential nutrients, vitamins, and healthy eating habits for you and your baby's development.",
            tips: [
                "Eat plenty of fruits and vegetables",
                "Include protein-rich foods daily",
                "Stay hydrated with 8-10 glasses of water",
                "Take prenatal vitamins as prescribed"
            ]
        },
        {
            icon: Activity,
            color: "bg-green-100 text-green-600",
            title: "Staying Active",
            description: "Safe exercises and activities to maintain health during pregnancy.",
            tips: [
                "Walk for 30 minutes daily",
                "Practice prenatal yoga",
                "Do pelvic floor exercises",
                "Avoid high-impact activities"
            ]
        },
        {
            icon: Calendar,
            color: "bg-blue-100 text-blue-600",
            title: "Prenatal Checkups",
            description: "Understanding the importance of regular prenatal visits and what to expect.",
            tips: [
                "Attend all scheduled appointments",
                "Track your symptoms and questions",
                "Bring your partner or support person",
                "Follow your doctor's recommendations"
            ]
        },
        {
            icon: Baby,
            color: "bg-purple-100 text-purple-600",
            title: "Baby Development",
            description: "Week-by-week guide to your baby's growth and development milestones.",
            tips: [
                "Track developmental milestones",
                "Learn about fetal movements",
                "Understand ultrasound results",
                "Prepare for baby's arrival"
            ]
        },
        {
            icon: Stethoscope,
            color: "bg-pink-100 text-pink-600",
            title: "Warning Signs",
            description: "Know when to contact your healthcare provider immediately.",
            tips: [
                "Severe abdominal pain",
                "Vaginal bleeding or fluid leakage",
                "Severe headaches or vision changes",
                "Decreased fetal movement"
            ]
        },
        {
            icon: Users,
            color: "bg-orange-100 text-orange-600",
            title: "Support & Community",
            description: "Connect with other expecting mothers and build your support network.",
            tips: [
                "Join prenatal classes",
                "Connect with other moms",
                "Involve your partner",
                "Seek emotional support when needed"
            ]
        }
    ];

    const helpfulResources = [
        {
            title: "WHO Guidelines on Antenatal Care",
            url: "https://www.who.int/publications/i/item/9789241549912",
            description: "Comprehensive guidelines for pregnancy care",
            category: "Guidelines"
        },
        {
            title: "Pregnancy Nutrition Guide - CDC",
            url: "https://www.cdc.gov/nutrition/infantandtoddlernutrition/foods-and-drinks/index.html",
            description: "CDC nutrition recommendations for pregnant women",
            category: "Nutrition"
        },
        {
            title: "Maternal Mental Health - NIMH",
            url: "https://www.nimh.nih.gov/health/publications/perinatal-depression",
            description: "Understanding and managing mental health during pregnancy",
            category: "Mental Health"
        },
        {
            title: "Exercise During Pregnancy - ACOG",
            url: "https://www.acog.org/womens-health/faqs/exercise-during-pregnancy",
            description: "Safe exercise recommendations from medical experts",
            category: "Exercise"
        },
        {
            title: "Breastfeeding Information - La Leche League",
            url: "https://www.llli.org/breastfeeding-info/",
            description: "Complete guide to breastfeeding and support",
            category: "Breastfeeding"
        },
        {
            title: "Prenatal Testing Information",
            url: "https://www.marchofdimes.org/pregnancy/prenatal-tests.aspx",
            description: "Understanding prenatal tests and screenings",
            category: "Medical Tests"
        },
        {
            title: "Sleep During Pregnancy",
            url: "https://www.sleepfoundation.org/pregnancy/sleep-and-pregnancy",
            description: "Tips for better sleep during pregnancy",
            category: "Sleep & Rest"
        },
        {
            title: "Common Pregnancy Discomforts",
            url: "https://www.acog.org/womens-health/faqs/common-pregnancy-discomforts",
            description: "Managing common pregnancy symptoms",
            category: "Symptoms"
        },
        {
            title: "Preparing for Labor and Birth",
            url: "https://www.health.harvard.edu/womens-health/preparing-for-labor-and-birth",
            description: "What to expect during labor and delivery",
            category: "Labor"
        }
    ];

    const pregnancyArticles = [
        {
            icon: Baby,
            color: "bg-pink-500",
            title: "First Trimester Guide (Weeks 1-12)",
            content: "Your baby is developing rapidly during these first weeks. Key developments include the formation of major organs, heartbeat detection (around week 6), and limb development. Common symptoms include morning sickness, fatigue, and frequent urination.",
            keyPoints: [
                "Start taking prenatal vitamins with folic acid",
                "Avoid alcohol, smoking, and harmful substances",
                "Schedule your first prenatal appointment",
                "Stay hydrated and eat small, frequent meals",
                "Get plenty of rest - fatigue is normal"
            ]
        },
        {
            icon: Heart,
            color: "bg-red-500",
            title: "Second Trimester Guide (Weeks 13-26)",
            content: "Often called the 'golden period' of pregnancy. You may feel more energetic, and morning sickness typically subsides. Your baby grows rapidly, and you'll start feeling movements around weeks 18-20.",
            keyPoints: [
                "Continue prenatal vitamins and balanced diet",
                "Stay physically active with safe exercises",
                "Attend all scheduled prenatal appointments",
                "Monitor fetal movements (quickening)",
                "Consider prenatal classes for birth preparation"
            ]
        },
        {
            icon: Activity,
            color: "bg-purple-500",
            title: "Third Trimester Guide (Weeks 27-40)",
            content: "The final stretch! Your baby is gaining weight and developing fully. You may experience increased fatigue, back pain, and frequent urination. Your body is preparing for labor and delivery.",
            keyPoints: [
                "Monitor baby's movements daily",
                "Prepare hospital bag and birth plan",
                "Learn about signs of labor",
                "Get adequate rest and manage discomfort",
                "Stay in close contact with your healthcare provider"
            ]
        },
        {
            icon: Apple,
            color: "bg-green-500",
            title: "Nutrition & Diet During Pregnancy",
            content: "Proper nutrition is crucial for your baby's development. Focus on a balanced diet rich in protein, calcium, iron, and folic acid. Aim for 300-500 additional calories per day in the second and third trimesters.",
            keyPoints: [
                "Eat plenty of fruits and vegetables (5+ servings daily)",
                "Include lean proteins: fish, chicken, beans, eggs",
                "Choose whole grains over refined carbohydrates",
                "Limit caffeine to 200mg per day (about 1 cup of coffee)",
                "Avoid raw fish, unpasteurized dairy, and deli meats"
            ]
        },
        {
            icon: Activity,
            color: "bg-blue-500",
            title: "Exercise & Physical Activity",
            content: "Regular exercise during pregnancy can help reduce discomfort, prepare your body for labor, and improve overall well-being. Aim for 30 minutes of moderate exercise most days of the week.",
            keyPoints: [
                "Walking is excellent - safe and easy to do",
                "Prenatal yoga helps with flexibility and relaxation",
                "Swimming is gentle on joints and very effective",
                "Kegel exercises strengthen pelvic floor muscles",
                "Avoid contact sports and activities with fall risk"
            ]
        },
        {
            icon: Heart,
            color: "bg-pink-500",
            title: "Emotional Well-being & Mental Health",
            content: "Pregnancy brings hormonal changes that can affect your emotions. It's normal to experience mood swings, anxiety, or worry. Taking care of your mental health is just as important as physical health.",
            keyPoints: [
                "Talk about your feelings with partner, family, or friends",
                "Join pregnancy support groups or classes",
                "Practice relaxation techniques (meditation, deep breathing)",
                "Get adequate sleep (7-9 hours per night)",
                "Seek professional help if feeling depressed or anxious"
            ]
        },
        {
            icon: AlertCircle,
            color: "bg-orange-500",
            title: "Warning Signs & When to Call Your Doctor",
            content: "While most pregnancies progress normally, it's important to recognize warning signs that require immediate medical attention. Trust your instincts - if something doesn't feel right, contact your healthcare provider.",
            keyPoints: [
                "Vaginal bleeding or fluid leakage",
                "Severe or persistent abdominal pain",
                "Severe headaches with vision changes",
                "Sudden swelling of face, hands, or feet",
                "Decreased fetal movement after 28 weeks",
                "Fever above 100.4°F (38°C)",
                "Painful urination or severe back pain",
                "Persistent vomiting (unable to keep food/fluids down)"
            ]
        },
        {
            icon: Baby,
            color: "bg-indigo-500",
            title: "Preparing for Baby's Arrival",
            content: "The third trimester is the perfect time to prepare for your baby's arrival. Create a checklist of items to buy, prepare your home, and plan for the first weeks after birth.",
            keyPoints: [
                "Set up nursery and baby sleeping area",
                "Stock up on diapers, wipes, and baby clothes",
                "Prepare frozen meals for post-delivery",
                "Install car seat and get it inspected",
                "Pack hospital bag by week 36",
                "Arrange help for first weeks at home"
            ]
        },
        {
            icon: Users,
            color: "bg-teal-500",
            title: "Partner & Family Involvement",
            content: "Pregnancy is a family journey. Involving your partner and family can provide emotional support, practical help, and strengthen your support network.",
            keyPoints: [
                "Invite partner to prenatal appointments",
                "Share pregnancy milestones and baby movements",
                "Discuss parenting roles and expectations",
                "Attend childbirth classes together",
                "Create a postpartum support plan",
                "Communicate openly about concerns and feelings"
            ]
        }
    ];

    return (
        <PatientLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Home
                </h2>
            }
        >
            <Head title="Patient Home" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="space-y-6">
                        {/* Welcome Banner */}
                        <div className="bg-gradient-to-r from-pink-500 via-pink-600 to-purple-600 rounded-xl shadow-lg overflow-hidden">
                            <div className="px-6 py-8 sm:px-8">
                                <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                        <h3 className="text-3xl font-bold text-white mb-2">
                                            Welcome to Your Pregnancy Journey
                                        </h3>
                                        <p className="text-pink-100 text-lg">
                                            Learn, grow, and stay healthy with our educational resources
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

                        {/* Educational Videos Section */}
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                            <div className="bg-gradient-to-r from-purple-500 to-pink-600 px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-white/20 rounded-lg">
                                        <Play className="h-5 w-5 text-white" />
                                    </div>
                                    <h3 className="text-lg font-bold text-white">
                                        Educational Videos
                                    </h3>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {pregnancyVideos.map((video, index) => (
                                        <div key={index} className="group bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300">
                                            <a 
                                                href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="block"
                                            >
                                                {/* Video Thumbnail */}
                                                <div className="relative aspect-video bg-gray-200 overflow-hidden">
                                                    <img 
                                                        src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
                                                        alt={video.title}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                    />
                                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                                                        <div className="bg-red-600 rounded-full p-4 group-hover:scale-110 transition-transform">
                                                            <Play className="h-8 w-8 text-white fill-white" />
                                                        </div>
                                                    </div>
                                                    <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs font-medium px-2 py-1 rounded">
                                                        {video.duration}
                                                    </div>
                                                    <div className="absolute top-2 left-2 bg-pink-600 text-white text-xs font-semibold px-2 py-1 rounded">
                                                        {video.category}
                                                    </div>
                                                </div>
                                                
                                                {/* Video Info */}
                                                <div className="p-4">
                                                    <h4 className="font-bold text-gray-900 text-sm mb-2 line-clamp-2 group-hover:text-pink-600 transition-colors">
                                                        {video.title}
                                                    </h4>
                                                    <p className="text-xs text-gray-600 line-clamp-2">
                                                        {video.description}
                                                    </p>
                                                    <div className="mt-3 flex items-center text-pink-600 text-xs font-medium">
                                                        Watch on YouTube
                                                        <ExternalLink className="h-3 w-3 ml-1" />
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Educational Topics */}
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-white/20 rounded-lg">
                                        <BookOpen className="h-5 w-5 text-white" />
                                    </div>
                                    <h3 className="text-lg font-bold text-white">
                                        Essential Pregnancy Topics
                                    </h3>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {educationalTopics.map((topic, index) => {
                                        const Icon = topic.icon;
                                        return (
                                            <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow">
                                                <div className={`inline-flex p-3 rounded-lg ${topic.color} mb-4`}>
                                                    <Icon className="h-6 w-6" />
                                                </div>
                                                <h4 className="font-bold text-gray-900 text-lg mb-2">
                                                    {topic.title}
                                                </h4>
                                                <p className="text-sm text-gray-600 mb-4">
                                                    {topic.description}
                                                </p>
                                                <ul className="space-y-2">
                                                    {topic.tips.map((tip, tipIndex) => (
                                                        <li key={tipIndex} className="flex items-start gap-2 text-sm text-gray-700">
                                                            <div className="bg-pink-100 rounded-full p-1 mt-0.5">
                                                                <div className="w-1 h-1 bg-pink-600 rounded-full"></div>
                                                            </div>
                                                            <span>{tip}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Comprehensive Pregnancy Articles */}
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-white/20 rounded-lg">
                                        <BookOpen className="h-5 w-5 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white">
                                            Comprehensive Pregnancy Guides
                                        </h3>
                                        <p className="text-xs text-indigo-100 mt-1">
                                            Click on any article to read more detailed information
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="space-y-4">
                                    {pregnancyArticles.map((article, index) => {
                                        const Icon = article.icon;
                                        const isExpanded = expandedArticle === index;
                                        return (
                                            <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-xl border-2 border-gray-200 overflow-hidden hover:border-indigo-300 transition-colors">
                                                <button
                                                    onClick={() => toggleArticle(index)}
                                                    className="w-full p-5 flex items-center justify-between hover:bg-gray-50 transition-colors"
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <div className={`p-3 ${article.color} rounded-lg`}>
                                                            <Icon className="h-6 w-6 text-white" />
                                                        </div>
                                                        <div className="text-left">
                                                            <h4 className="font-bold text-gray-900 text-base">
                                                                {article.title}
                                                            </h4>
                                                            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                                                                {article.content}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex-shrink-0">
                                                        {isExpanded ? (
                                                            <ChevronUp className="h-6 w-6 text-gray-600" />
                                                        ) : (
                                                            <ChevronDown className="h-6 w-6 text-gray-600" />
                                                        )}
                                                    </div>
                                                </button>

                                                {isExpanded && (
                                                    <div className="px-5 pb-5 border-t-2 border-gray-100 bg-gradient-to-br from-indigo-50/50 to-purple-50/50">
                                                        <div className="pt-5">
                                                            <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                                                                {article.content}
                                                            </p>
                                                            <div className="bg-white rounded-lg p-4 border border-indigo-200">
                                                                <h5 className="font-semibold text-gray-900 text-sm mb-3 flex items-center gap-2">
                                                                    <CheckCircle className="h-4 w-4 text-indigo-600" />
                                                                    Key Points to Remember:
                                                                </h5>
                                                                <ul className="space-y-2">
                                                                    {article.keyPoints.map((point, pointIndex) => (
                                                                        <li key={pointIndex} className="flex items-start gap-2 text-sm text-gray-700">
                                                                            <div className="bg-indigo-100 rounded-full p-1 mt-1 flex-shrink-0">
                                                                                <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></div>
                                                                            </div>
                                                                            <span>{point}</span>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Helpful Resources */}
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                            <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-white/20 rounded-lg">
                                        <BookOpen className="h-5 w-5 text-white" />
                                    </div>
                                    <h3 className="text-lg font-bold text-white">
                                        Helpful Resources & Articles
                                    </h3>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {helpfulResources.map((resource, index) => (
                                        <a
                                            key={index}
                                            href={resource.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-5 border border-green-200 hover:shadow-md transition-all group"
                                        >
                                            <div className="flex items-start justify-between mb-3">
                                                <div className="bg-green-100 p-2 rounded-lg">
                                                    <BookOpen className="h-5 w-5 text-green-600" />
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                                                        {resource.category}
                                                    </span>
                                                    <ExternalLink className="h-4 w-4 text-green-600 group-hover:scale-110 transition-transform" />
                                                </div>
                                            </div>
                                            <h4 className="font-bold text-gray-900 text-sm mb-2 group-hover:text-green-600 transition-colors">
                                                {resource.title}
                                            </h4>
                                            <p className="text-xs text-gray-600">
                                                {resource.description}
                                            </p>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Quick Health Tips */}
                        <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-orange-500 rounded-xl shadow-lg p-6">
                            <div className="flex items-start gap-4">
                                <div className="bg-orange-100 p-3 rounded-lg">
                                    <Heart className="h-6 w-6 text-orange-600" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                                        Daily Health Reminder
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                                        <div className="flex items-center gap-2">
                                            <div className="bg-orange-200 rounded-full p-1">
                                                <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                                            </div>
                                            <span>Take your prenatal vitamins daily</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="bg-orange-200 rounded-full p-1">
                                                <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                                            </div>
                                            <span>Stay hydrated - drink 8-10 glasses of water</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="bg-orange-200 rounded-full p-1">
                                                <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                                            </div>
                                            <span>Get adequate rest and sleep (7-9 hours)</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="bg-orange-200 rounded-full p-1">
                                                <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                                            </div>
                                            <span>Attend all scheduled prenatal appointments</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PatientLayout>
    );
}
