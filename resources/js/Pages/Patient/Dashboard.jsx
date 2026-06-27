import PatientLayout from '@/Layouts/PatientLayout';
import { Head } from '@inertiajs/react';
import { Heart, BookOpen, Calendar, Baby, Users, Stethoscope, Apple, Activity, ChevronDown, ChevronUp, CheckCircle, Droplet, Moon, Dumbbell, Brain, Play, ExternalLink } from 'lucide-react';
import { useState } from 'react';

export default function Dashboard({ maternalRecord }) {
    const [expandedTip, setExpandedTip] = useState(null);
    const [expandedArticle, setExpandedArticle] = useState(null);

    const toggleTip = (index) => {
        setExpandedTip(expandedTip === index ? null : index);
    };

    const toggleArticle = (index) => {
        setExpandedArticle(expandedArticle === index ? null : index);
    };

    // Video Tutorials
    const videoTutorials = [
        {
            title: "Pregnancy Health and Nutrition",
            description: "Essential nutrition tips for a healthy pregnancy journey",
            youtubeId: "9C_HReR_McQ",
            duration: "10:30",
            category: "Nutrition"
        },
        {
            title: "Prenatal Care: What to Expect",
            description: "Complete guide to prenatal checkups and medical care",
            youtubeId: "yPUUj4CZYCU",
            duration: "15:45",
            category: "Prenatal Care"
        },
        {
            title: "Safe Exercise During Pregnancy",
            description: "Safe and effective exercises for expecting mothers",
            youtubeId: "3bRH8HTfeUQ",
            duration: "12:20",
            category: "Exercise"
        },
        {
            title: "Preparing for Labor and Delivery",
            description: "Everything you need to know about childbirth",
            youtubeId: "j7YucfJuziU",
            duration: "18:15",
            category: "Labor"
        },
        {
            title: "Postpartum Care Essentials",
            description: "Taking care of yourself after delivery",
            youtubeId: "LQVW_L2rViE",
            duration: "14:30",
            category: "Postpartum"
        },
        {
            title: "Breastfeeding Basics",
            description: "Complete guide to successful breastfeeding",
            youtubeId: "1k04uxmVzwU",
            duration: "16:40",
            category: "Breastfeeding"
        }
    ];

    // Health Articles
    const healthArticles = [
        {
            title: "Understanding Morning Sickness",
            excerpt: "Learn about causes, symptoms, and effective remedies for morning sickness during early pregnancy.",
            category: "First Trimester",
            readTime: "5 min read",
            content: "Morning sickness, also called nausea and vomiting of pregnancy (NVP), affects up to 80% of pregnant women. Despite its name, it can occur at any time of day. It typically begins around week 6 and improves by week 12-14 of pregnancy.",
            url: "https://www.acog.org/womens-health/faqs/morning-sickness-nausea-and-vomiting-of-pregnancy",
            tips: [
                "Eat small, frequent meals throughout the day (5-6 meals)",
                "Keep crackers by your bedside and eat a few before getting up",
                "Avoid strong smells and trigger foods",
                "Try ginger tea, ginger ale, or ginger candies",
                "Stay hydrated - sip water, clear fluids, or ice chips",
                "Get plenty of rest and avoid fatigue",
                "Try vitamin B6 supplements (consult your doctor first)",
                "Consider acupressure wristbands",
                "Contact your doctor if you can't keep anything down"
            ]
        },
        {
            title: "Choosing the Right Prenatal Vitamin",
            excerpt: "A comprehensive guide to selecting prenatal vitamins with the right nutrients for you and your baby.",
            category: "Nutrition",
            readTime: "7 min read",
            content: "Prenatal vitamins are specially formulated multivitamins that provide extra nutrients needed during pregnancy. They help fill nutritional gaps and support your baby's development.",
            url: "https://www.acog.org/womens-health/faqs/nutrition-during-pregnancy",
            tips: [
                "Look for 400-800 mcg of folic acid (prevents neural tube defects)",
                "Ensure 27 mg of iron (prevents anemia)",
                "Check for 1000 mg of calcium (bone development)",
                "Include 200-300 mg of DHA (brain development)",
                "Verify vitamin D content (600 IU recommended)",
                "Consider chewable or gummy options if pills are difficult",
                "Take with food to reduce nausea",
                "Avoid megadoses - more isn't always better",
                "Consult your doctor about your specific needs"
            ]
        },
        {
            title: "Managing Pregnancy Back Pain",
            excerpt: "Safe and effective strategies to relieve and prevent back pain during pregnancy.",
            category: "Comfort",
            readTime: "6 min read",
            content: "Back pain affects about 50-70% of pregnant women. It's caused by weight gain, posture changes, hormone effects on ligaments, and stress. Most back pain occurs in the lower back and can range from mild to severe.",
            url: "https://www.acog.org/womens-health/faqs/back-pain-during-pregnancy",
            tips: [
                "Practice good posture - stand straight, shoulders back",
                "Wear low-heeled (not flat) supportive shoes",
                "Use a pregnancy support belt for your belly",
                "Sleep on your left side with pillow between knees",
                "Do prenatal yoga and gentle stretching exercises",
                "Apply heat or cold packs to painful areas",
                "Get prenatal massage from a certified therapist",
                "Avoid heavy lifting and twisting movements",
                "Consider physical therapy if pain is severe"
            ]
        },
        {
            title: "Preparing Your Birth Plan",
            excerpt: "Step-by-step guide to creating a personalized birth plan that reflects your preferences.",
            category: "Labor Prep",
            readTime: "10 min read",
            content: "A birth plan is a document that communicates your preferences for labor and delivery to your healthcare team. While flexibility is important (things may change), having a plan helps you think through your options and express your wishes.",
            url: "https://www.marchofdimes.org/find-support/topics/pregnancy/making-birth-plan",
            tips: [
                "Research pain management options (epidural, natural methods)",
                "Decide who you want present during labor",
                "Consider your preferences for labor positions and movement",
                "Think about interventions (induction, episiotomy)",
                "Plan for immediate postpartum (skin-to-skin, breastfeeding)",
                "Discuss newborn procedures (vitamin K, eye ointment)",
                "Keep it concise (1-2 pages is ideal)",
                "Review with your healthcare provider in advance",
                "Stay flexible - safety is the priority"
            ]
        },
        {
            title: "Understanding Ultrasounds",
            excerpt: "What to expect during pregnancy ultrasounds and how to interpret the results.",
            category: "Medical Tests",
            readTime: "8 min read",
            content: "Ultrasounds use sound waves to create images of your baby in the womb. They're safe, painless, and provide valuable information about your baby's development, due date, and overall health.",
            url: "https://www.acog.org/womens-health/faqs/ultrasound-exams",
            tips: [
                "First ultrasound (6-9 weeks): Confirms pregnancy and heartbeat",
                "Dating ultrasound (8-12 weeks): Determines due date accurately",
                "Anatomy scan (18-22 weeks): Checks baby's organs and growth",
                "Drink water before early ultrasounds (helps imaging)",
                "Ask questions during the scan",
                "Request printed photos if you'd like keepsakes",
                "Bring your partner or support person",
                "Understand normal variations vs. concerns",
                "Follow up on any abnormal findings promptly"
            ]
        },
        {
            title: "Bonding with Your Baby Before Birth",
            excerpt: "Ways to connect with your baby before birth and establish early bonding.",
            category: "Emotional Health",
            readTime: "5 min read",
            content: "Bonding with your baby can begin well before birth. Prenatal bonding helps you feel connected to your baby, reduces anxiety, and may even benefit your baby's development.",
            url: "https://www.healthychildren.org/English/ages-stages/prenatal/Pages/default.aspx",
            tips: [
                "Talk or sing to your baby daily",
                "Play music - baby can hear from around 18 weeks",
                "Gently massage your belly",
                "Respond to baby's movements by touching your belly",
                "Look at ultrasound pictures together with partner",
                "Read books or stories aloud to baby",
                "Practice visualization and positive affirmations",
                "Take time for quiet moments to focus on baby",
                "Keep a pregnancy journal about your journey"
            ]
        }
    ];

    const educationalTopics = [
        {
            icon: Apple,
            title: "Nutrition During Pregnancy",
            description: "Learn about essential nutrients, vitamins, and healthy eating habits for you and your baby's development.",
            tips: [
                "Eat plenty of fruits and vegetables (5+ servings daily)",
                "Include protein-rich foods: fish, chicken, beans, eggs",
                "Choose whole grains over refined carbohydrates",
                "Stay hydrated with 8-10 glasses of water daily",
                "Take prenatal vitamins as prescribed by your doctor"
            ]
        },
        {
            icon: Activity,
            title: "Staying Active Safely",
            description: "Safe exercises and activities to maintain health during pregnancy.",
            tips: [
                "Walk for 30 minutes most days of the week",
                "Practice prenatal yoga for flexibility and relaxation",
                "Swim or do water aerobics (gentle on joints)",
                "Perform pelvic floor exercises (Kegels) daily",
                "Avoid high-impact activities and contact sports"
            ]
        },
        {
            icon: Calendar,
            title: "Prenatal Checkup Importance",
            description: "Understanding the importance of regular prenatal visits and what to expect.",
            tips: [
                "Attend all scheduled prenatal appointments",
                "Write down symptoms and questions beforehand",
                "Bring your partner or support person along",
                "Follow your healthcare provider's recommendations",
                "Don't hesitate to call between visits if concerned"
            ]
        },
        {
            icon: Baby,
            title: "Baby Development Stages",
            description: "Week-by-week guide to your baby's growth and development milestones.",
            tips: [
                "First trimester: Major organs and systems form",
                "Second trimester: Rapid growth, movements felt",
                "Third trimester: Weight gain, preparing for birth",
                "Track fetal movements after 28 weeks",
                "Learn about developmental milestones at each stage"
            ]
        },
        {
            icon: Stethoscope,
            title: "Warning Signs to Watch",
            description: "Know when to contact your healthcare provider immediately.",
            tips: [
                "Vaginal bleeding or fluid leakage",
                "Severe abdominal pain or cramping",
                "Severe headaches with vision changes",
                "Sudden swelling of face, hands, or feet",
                "Decreased fetal movement after 28 weeks"
            ]
        },
        {
            icon: Users,
            title: "Support & Community",
            description: "Connect with other expecting mothers and build your support network.",
            tips: [
                "Join prenatal classes in your area",
                "Connect with other expectant mothers",
                "Involve your partner in the pregnancy journey",
                "Build a support network of family and friends",
                "Seek emotional support when needed"
            ]
        }
    ];

    const pregnancyGuides = [
        {
            icon: Baby,
            title: "First Trimester Guide (Weeks 1-12)",
            subtitle: "The Foundation Period",
            overview: "Your baby is developing rapidly during these first weeks. Key developments include the formation of major organs, heartbeat detection (around week 6), and limb development. Common symptoms include morning sickness, fatigue, and frequent urination.",
            keyPoints: [
                "Start taking prenatal vitamins with folic acid (400-800 mcg daily)",
                "Avoid alcohol, smoking, and harmful substances completely",
                "Schedule your first prenatal appointment (usually weeks 8-10)",
                "Eat small, frequent meals to manage nausea",
                "Get plenty of rest - fatigue is normal and important",
                "Stay hydrated even if experiencing morning sickness",
                "Avoid raw fish, unpasteurized dairy, and deli meats"
            ],
            whatToExpect: [
                "Fatigue and increased need for sleep",
                "Morning sickness (can occur any time of day)",
                "Breast tenderness and enlargement",
                "Frequent urination",
                "Mood swings due to hormonal changes",
                "Food aversions or cravings"
            ]
        },
        {
            icon: Heart,
            title: "Second Trimester Guide (Weeks 13-26)",
            subtitle: "The Golden Period",
            overview: "Often called the 'golden period' of pregnancy. You may feel more energetic, and morning sickness typically subsides. Your baby grows rapidly, and you'll start feeling movements around weeks 18-20 (earlier for second pregnancies).",
            keyPoints: [
                "Continue prenatal vitamins and maintain balanced diet",
                "Stay physically active with approved safe exercises",
                "Attend all scheduled prenatal appointments and ultrasounds",
                "Monitor and enjoy feeling fetal movements (quickening)",
                "Consider enrolling in prenatal and childbirth classes",
                "Start planning for baby's arrival and nursery setup",
                "Practice good posture to prevent back pain"
            ],
            whatToExpect: [
                "Increased energy levels",
                "Growing baby bump becomes visible",
                "Feeling baby's movements (quickening)",
                "Relief from morning sickness",
                "Possible round ligament pain",
                "Increased appetite",
                "Skin and hair changes"
            ]
        },
        {
            icon: Activity,
            title: "Third Trimester Guide (Weeks 27-40)",
            subtitle: "The Final Stretch",
            overview: "The final stretch! Your baby is gaining weight and developing fully. You may experience increased fatigue, back pain, and frequent urination. Your body is preparing for labor and delivery. Stay in close contact with your healthcare provider.",
            keyPoints: [
                "Monitor baby's movements daily - note any changes",
                "Prepare hospital bag by week 36 (have it ready)",
                "Create and discuss your birth plan with your provider",
                "Learn and recognize signs of labor",
                "Get adequate rest and manage discomfort with approved methods",
                "Attend final prenatal visits (weekly by week 36)",
                "Prepare your home and arrange help for after delivery"
            ],
            whatToExpect: [
                "Increased fatigue and shortness of breath",
                "Braxton Hicks contractions (practice contractions)",
                "Back pain and pelvic pressure",
                "Frequent urination increases",
                "Difficulty sleeping",
                "Swelling in feet and ankles",
                "Emotional anticipation and nesting instinct"
            ]
        },
        {
            icon: Apple,
            title: "Nutrition & Healthy Eating",
            subtitle: "Fuel for Two",
            overview: "Proper nutrition is crucial for your baby's development. Focus on a balanced diet rich in protein, calcium, iron, and folic acid. You need about 300-500 additional calories per day in the second and third trimesters.",
            keyPoints: [
                "Eat plenty of colorful fruits and vegetables (5+ servings)",
                "Include lean proteins: fish (low-mercury), chicken, beans, eggs",
                "Choose whole grains: brown rice, whole wheat bread, oats",
                "Get calcium from dairy or fortified alternatives (1000mg/day)",
                "Limit caffeine to 200mg per day (about 1 cup of coffee)",
                "Eat iron-rich foods to prevent anemia",
                "Take DHA supplements for baby's brain development"
            ],
            whatToExpect: [
                "Foods to avoid: raw fish, unpasteurized products, deli meats",
                "Limit high-mercury fish (swordfish, king mackerel)",
                "Safe cheeses: pasteurized only",
                "Cook eggs, meat, and poultry thoroughly",
                "Wash all fruits and vegetables",
                "Avoid excessive vitamin A supplements"
            ]
        },
        {
            icon: Dumbbell,
            title: "Exercise & Physical Activity",
            subtitle: "Stay Active, Stay Healthy",
            overview: "Regular exercise during pregnancy can help reduce discomfort, prepare your body for labor, improve overall well-being, and aid postpartum recovery. Aim for 30 minutes of moderate exercise most days of the week.",
            keyPoints: [
                "Walking is excellent - safe, free, and easy to do anywhere",
                "Prenatal yoga helps with flexibility, strength, and relaxation",
                "Swimming is gentle on joints and very effective",
                "Kegel exercises strengthen pelvic floor for delivery",
                "Avoid contact sports and activities with fall risk",
                "Stay hydrated and don't overheat during exercise",
                "Listen to your body and rest when needed"
            ],
            whatToExpect: [
                "Stop exercising if you experience pain, dizziness, or bleeding",
                "Avoid lying flat on your back after first trimester",
                "Don't exercise in extreme heat or humidity",
                "Safe exercises: walking, swimming, stationary cycling",
                "Avoid: scuba diving, contact sports, activities with fall risk",
                "Modify intensity as pregnancy progresses"
            ]
        },
        {
            icon: Brain,
            title: "Emotional Well-being",
            subtitle: "Mental Health Matters",
            overview: "Pregnancy brings hormonal changes that can affect your emotions. It's normal to experience mood swings, anxiety, or worry. Taking care of your mental health is just as important as physical health.",
            keyPoints: [
                "Talk about your feelings with partner, family, or friends",
                "Join pregnancy support groups or online communities",
                "Practice relaxation: meditation, deep breathing, prenatal yoga",
                "Get adequate sleep (7-9 hours) - use pillows for comfort",
                "Seek professional help if feeling depressed or very anxious",
                "Know that mood swings are normal due to hormones",
                "Prepare mentally for parenthood and lifestyle changes"
            ],
            whatToExpect: [
                "Mood swings and emotional sensitivity",
                "Anxiety about baby's health and delivery",
                "Concerns about being a good parent",
                "Body image changes",
                "Stress about finances and preparations",
                "When to seek help: persistent sadness, loss of interest, anxiety"
            ]
        },
        {
            icon: Moon,
            title: "Rest & Sleep Tips",
            subtitle: "Quality Sleep During Pregnancy",
            overview: "Getting enough rest is crucial during pregnancy. As your pregnancy progresses, finding a comfortable sleep position can be challenging. Sleep issues are common but manageable.",
            keyPoints: [
                "Sleep on your left side (improves blood flow to baby)",
                "Use pregnancy pillows for support and comfort",
                "Elevate your head if experiencing heartburn",
                "Avoid large meals close to bedtime",
                "Limit fluids 2-3 hours before bed (reduce nighttime bathroom trips)",
                "Keep bedroom cool, dark, and quiet",
                "Establish a relaxing bedtime routine"
            ],
            whatToExpect: [
                "Difficulty finding comfortable positions (especially third trimester)",
                "Frequent nighttime urination",
                "Leg cramps during sleep",
                "Heartburn and indigestion",
                "Vivid dreams and nightmares",
                "Insomnia due to anxiety or discomfort"
            ]
        },
        {
            icon: Droplet,
            title: "Hydration & Fluid Intake",
            subtitle: "The Importance of Staying Hydrated",
            overview: "Staying well-hydrated during pregnancy is essential for your health and your baby's development. Water helps form amniotic fluid, produce extra blood, build new tissue, and aids digestion.",
            keyPoints: [
                "Drink 8-10 glasses (64-80 oz) of water daily",
                "Carry a water bottle with you throughout the day",
                "Increase intake during hot weather or exercise",
                "Include water-rich foods: watermelon, cucumbers, oranges",
                "Limit sugary drinks and sodas",
                "Herbal teas can count (check which are pregnancy-safe)",
                "Signs of dehydration: dark urine, dizziness, dry mouth"
            ],
            whatToExpect: [
                "Increased thirst is normal during pregnancy",
                "Proper hydration reduces swelling and constipation",
                "Helps prevent urinary tract infections",
                "May reduce risk of preterm labor",
                "Adequate amniotic fluid levels",
                "Better skin elasticity"
            ]
        },
        {
            icon: Stethoscope,
            title: "Warning Signs & When to Call",
            subtitle: "Recognizing Emergency Situations",
            overview: "While most pregnancies progress normally, it's important to recognize warning signs that require immediate medical attention. Trust your instincts - if something doesn't feel right, contact your healthcare provider.",
            keyPoints: [
                "Vaginal bleeding (any amount) or fluid leakage",
                "Severe or persistent abdominal pain or cramping",
                "Severe headaches with vision changes or spots",
                "Sudden swelling of face, hands, or feet (signs of preeclampsia)",
                "Decreased fetal movement after 28 weeks (less than 10 in 2 hours)",
                "Fever above 100.4°F (38°C) that doesn't go down",
                "Painful urination, severe back pain, or inability to urinate",
                "Persistent vomiting (unable to keep food or fluids down)"
            ],
            whatToExpect: [
                "Don't hesitate to call your provider - better safe than sorry",
                "Have emergency contact numbers readily available",
                "Know where to go: doctor's office vs emergency room",
                "Keep a list of your medications and medical history",
                "Trust your maternal instincts",
                "Report any unusual symptoms promptly"
            ]
        }
    ];

    const dailyTips = [
        {
            icon: Apple,
            title: "Prenatal Vitamins",
            tip: "Take your prenatal vitamins with food every day"
        },
        {
            icon: Droplet,
            title: "Stay Hydrated",
            tip: "Drink at least 8-10 glasses of water throughout the day"
        },
        {
            icon: Dumbbell,
            title: "Stay Active",
            tip: "Light exercise like walking for 30 minutes is beneficial"
        },
        {
            icon: Moon,
            title: "Get Rest",
            tip: "Aim for 7-9 hours of sleep each night"
        },
        {
            icon: Calendar,
            title: "Track Appointments",
            tip: "Attend all scheduled prenatal appointments"
        },
        {
            icon: Baby,
            title: "Monitor Baby",
            tip: "Track your baby's movements after 28 weeks"
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
                        <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl shadow-lg p-8">
                            <div className="flex items-center gap-4">
                                <div className="p-4 bg-white/20 backdrop-blur-sm rounded-xl">
                                    <Heart className="h-10 w-10 text-white" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-3xl font-bold text-white mb-2">
                                        Welcome to Your Pregnancy Journey
                                    </h3>
                                    <p className="text-indigo-100 text-base">
                                        Learn, grow, and stay healthy with our educational resources and expert tips
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Video Tutorials Section */}
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-indigo-100">
                            <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-white/20 rounded-lg">
                                        <Play className="h-5 w-5 text-white" />
                                    </div>
                                    <h3 className="text-lg font-bold text-white">
                                        Video Tutorials & Guides
                                    </h3>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {videoTutorials.map((video, index) => (
                                        <div key={index} className="group bg-white rounded-xl overflow-hidden border-2 border-indigo-100 hover:border-indigo-300 hover:shadow-xl transition-all">
                                            <a 
                                                href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="block"
                                            >
                                                {/* Video Thumbnail */}
                                                <div className="relative aspect-video bg-gray-200 overflow-hidden">
                                                    <img 
                                                        src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`}
                                                        alt={video.title}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                        onError={(e) => {
                                                            e.target.src = `https://img.youtube.com/vi/${video.youtubeId}/0.jpg`;
                                                        }}
                                                    />
                                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                                                        <div className="bg-indigo-600 rounded-full p-3 group-hover:scale-110 group-hover:bg-indigo-700 transition-all shadow-lg">
                                                            <Play className="h-6 w-6 text-white fill-white" />
                                                        </div>
                                                    </div>
                                                    <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs font-medium px-2 py-1 rounded">
                                                        {video.duration}
                                                    </div>
                                                    <div className="absolute top-2 left-2 bg-indigo-600 text-white text-xs font-semibold px-2 py-1 rounded shadow-md">
                                                        {video.category}
                                                    </div>
                                                </div>
                                                
                                                {/* Video Info */}
                                                <div className="p-4 bg-gradient-to-b from-white to-indigo-50/30">
                                                    <h4 className="font-bold text-gray-900 text-sm mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                                                        {video.title}
                                                    </h4>
                                                    <p className="text-xs text-gray-600 line-clamp-2 mb-3">
                                                        {video.description}
                                                    </p>
                                                    <div className="flex items-center text-indigo-600 text-xs font-semibold">
                                                        <span>Watch on YouTube</span>
                                                        <ExternalLink className="h-3 w-3 ml-1" />
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Health Articles Section */}
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-indigo-100">
                            <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-white/20 rounded-lg">
                                        <BookOpen className="h-5 w-5 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white">
                                            Helpful Articles & Resources
                                        </h3>
                                        <p className="text-xs text-indigo-100 mt-0.5">
                                            Click on any article to read more
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="space-y-4">
                                    {healthArticles.map((article, index) => {
                                        const isExpanded = expandedArticle === index;
                                        return (
                                            <div key={index} className="border-2 border-indigo-100 rounded-xl overflow-hidden hover:border-indigo-300 hover:shadow-lg transition-all">
                                                <button
                                                    onClick={() => toggleArticle(index)}
                                                    className="w-full p-5 flex items-center justify-between hover:bg-indigo-50/50 transition-colors text-left"
                                                >
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-3 mb-2">
                                                            <span className="text-xs font-semibold text-white bg-indigo-600 px-3 py-1 rounded-full shadow-sm">
                                                                {article.category}
                                                            </span>
                                                            <span className="text-xs text-gray-500 font-medium">{article.readTime}</span>
                                                        </div>
                                                        <h4 className="font-bold text-gray-900 text-base mb-1">
                                                            {article.title}
                                                        </h4>
                                                        <p className="text-sm text-gray-600">
                                                            {article.excerpt}
                                                        </p>
                                                    </div>
                                                    <div className="flex-shrink-0 ml-4">
                                                        <div className="p-2 bg-indigo-100 rounded-lg">
                                                            {isExpanded ? (
                                                                <ChevronUp className="h-5 w-5 text-indigo-600" />
                                                            ) : (
                                                                <ChevronDown className="h-5 w-5 text-indigo-600" />
                                                            )}
                                                        </div>
                                                    </div>
                                                </button>

                                                {isExpanded && (
                                                    <div className="px-5 pb-5 border-t-2 border-indigo-100 bg-gradient-to-b from-indigo-50/30 to-white">
                                                        <div className="pt-5">
                                                            <p className="text-sm text-gray-700 mb-5 leading-relaxed">
                                                                {article.content}
                                                            </p>
                                                            
                                                            <div className="bg-white rounded-lg p-5 border-2 border-indigo-100 shadow-sm mb-4">
                                                                <h5 className="font-bold text-gray-900 text-sm mb-3 flex items-center gap-2">
                                                                    <div className="p-1 bg-indigo-100 rounded">
                                                                        <CheckCircle className="h-4 w-4 text-indigo-600" />
                                                                    </div>
                                                                    Key Tips & Recommendations
                                                                </h5>
                                                                <ul className="space-y-2">
                                                                    {article.tips.map((tip, tipIndex) => (
                                                                        <li key={tipIndex} className="flex items-start gap-2 text-sm text-gray-700">
                                                                            <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full mt-1.5 flex-shrink-0"></div>
                                                                            <span>{tip}</span>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>

                                                            {/* View Full Article Button */}
                                                            <a
                                                                href={article.url}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all"
                                                            >
                                                                <BookOpen className="h-4 w-4" />
                                                                <span>View Full Article</span>
                                                                <ExternalLink className="h-4 w-4" />
                                                            </a>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Daily Health Tips - Quick Cards */}
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-indigo-100">
                            <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-white/20 rounded-lg">
                                        <Heart className="h-5 w-5 text-white" />
                                    </div>
                                    <h3 className="text-lg font-bold text-white">
                                        Daily Health Reminders
                                    </h3>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {dailyTips.map((tip, index) => {
                                        const Icon = tip.icon;
                                        return (
                                            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                                                <div className="flex items-start gap-3">
                                                    <div className="p-2 bg-gray-50 rounded-lg">
                                                        <Icon className="h-5 w-5 text-gray-600" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="text-sm font-medium text-gray-900 mb-1">
                                                            {tip.title}
                                                        </p>
                                                        <p className="text-sm text-gray-600">
                                                            {tip.tip}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Essential Pregnancy Topics */}
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-indigo-100">
                            <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 px-6 py-4">
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
                                            <div key={index} className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow">
                                                <div className="p-3 bg-gray-50 rounded-lg inline-flex mb-4">
                                                    <Icon className="h-6 w-6 text-gray-600" />
                                                </div>
                                                <h4 className="font-semibold text-gray-900 text-base mb-2">
                                                    {topic.title}
                                                </h4>
                                                <p className="text-sm text-gray-600 mb-4">
                                                    {topic.description}
                                                </p>
                                                <ul className="space-y-2">
                                                    {topic.tips.map((tip, tipIndex) => (
                                                        <li key={tipIndex} className="flex items-start gap-2 text-sm text-gray-700">
                                                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-1.5"></div>
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

                        {/* Comprehensive Pregnancy Guides */}
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-indigo-100">
                            <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-white/20 rounded-lg">
                                        <BookOpen className="h-5 w-5 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white">
                                            Comprehensive Pregnancy Guides
                                        </h3>
                                        <p className="text-xs text-indigo-100 mt-0.5">
                                            Click on any guide to read detailed information
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="space-y-4">
                                    {pregnancyGuides.map((guide, index) => {
                                        const Icon = guide.icon;
                                        const isExpanded = expandedTip === index;
                                        return (
                                            <div key={index} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-sm transition-shadow">
                                                <button
                                                    onClick={() => toggleTip(index)}
                                                    className="w-full p-5 flex items-center justify-between hover:bg-gray-50 transition-colors"
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <div className="p-3 bg-indigo-50 rounded-lg">
                                                            <Icon className="h-6 w-6 text-indigo-600" />
                                                        </div>
                                                        <div className="text-left">
                                                            <h4 className="font-semibold text-gray-900 text-base">
                                                                {guide.title}
                                                            </h4>
                                                            <p className="text-sm text-gray-600 mt-0.5">
                                                                {guide.subtitle}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex-shrink-0">
                                                        {isExpanded ? (
                                                            <ChevronUp className="h-5 w-5 text-gray-600" />
                                                        ) : (
                                                            <ChevronDown className="h-5 w-5 text-gray-600" />
                                                        )}
                                                    </div>
                                                </button>

                                                {isExpanded && (
                                                    <div className="px-5 pb-5 border-t border-gray-200 bg-gray-50">
                                                        <div className="pt-5">
                                                            <p className="text-sm text-gray-700 mb-5 leading-relaxed">
                                                                {guide.overview}
                                                            </p>
                                                            
                                                            {/* Key Points */}
                                                            <div className="bg-white rounded-lg p-5 mb-4 border border-gray-200">
                                                                <h5 className="font-semibold text-gray-900 text-sm mb-3 flex items-center gap-2">
                                                                    <CheckCircle className="h-4 w-4 text-indigo-600" />
                                                                    Key Points to Remember
                                                                </h5>
                                                                <ul className="space-y-2">
                                                                    {guide.keyPoints.map((point, pointIndex) => (
                                                                        <li key={pointIndex} className="flex items-start gap-2 text-sm text-gray-700">
                                                                            <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full mt-1.5"></div>
                                                                            <span>{point}</span>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>

                                                            {/* What to Expect */}
                                                            <div className="bg-white rounded-lg p-5 border border-gray-200">
                                                                <h5 className="font-semibold text-gray-900 text-sm mb-3 flex items-center gap-2">
                                                                    <Activity className="h-4 w-4 text-indigo-600" />
                                                                    What to Expect
                                                                </h5>
                                                                <ul className="space-y-2">
                                                                    {guide.whatToExpect.map((point, pointIndex) => (
                                                                        <li key={pointIndex} className="flex items-start gap-2 text-sm text-gray-700">
                                                                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-1.5"></div>
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
                    </div>
                </div>
            </div>
        </PatientLayout>
    );
}
