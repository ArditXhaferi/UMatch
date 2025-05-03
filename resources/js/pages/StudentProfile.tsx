import React, { useState, useEffect } from 'react';
import { PageProps } from '@/types';
import { Link } from '@inertiajs/react';
import { AcademicCapIcon, ChartBarIcon, TrophyIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

interface Analysis {
    archetype_scores: {
        [key: string]: number;
    };
    type_description: string;
    learning_style: string;
    recommended_majors: string[];
    study_techniques: string[];
}

interface StudentProfileProps extends PageProps {
    profile: {
        id: number;
        hexad_type: string;
        archetype_code: string;
        school: string | null;
        date_of_birth: string | null;
        parent_contact_email: string | null;
        analysis: Analysis | null;
    };
}

const StudentProfile: React.FC<StudentProfileProps> = ({ profile }) => {
    const [showAnalysis, setShowAnalysis] = useState(false);
    const [typewriterText, setTypewriterText] = useState('');
    const [currentSection, setCurrentSection] = useState(0);
    const [animationComplete, setAnimationComplete] = useState(false);
    const [shufflingArchetypes, setShufflingArchetypes] = useState(true);
    const [currentShuffleIndex, setCurrentShuffleIndex] = useState(0);

    const getArchetypeColor = (code: string) => {
        const colors: { [key: string]: string } = {
            'AN-VS': 'bg-red-500',
            'AN-EN': 'bg-red-600',
            'DI-CD': 'bg-blue-500',
            'DI-CS': 'bg-blue-600',
            'EX-BU': 'bg-green-500',
            'EX-PL': 'bg-green-600',
            'SO-ME': 'bg-yellow-500',
            'SO-ED': 'bg-yellow-600',
            'HE-MD': 'bg-purple-500',
            'HE-BT': 'bg-purple-600',
            'AR-DS': 'bg-pink-500',
            'AR-FM': 'bg-pink-600',
            'GL-DM': 'bg-indigo-500',
            'GL-TR': 'bg-indigo-600',
            'SP-AT': 'bg-orange-500',
            'SP-EC': 'bg-orange-600'
        };
        return colors[code] || 'bg-gray-500';
    };

    const getArchetypeName = (code: string) => {
        const names: { [key: string]: string } = {
            'AN-VS': 'Visionary Scientist',
            'AN-EN': 'Engineer-Builder',
            'DI-CD': 'Data Crafter',
            'DI-CS': 'Code Sorcerer',
            'EX-BU': 'Business Maverick',
            'EX-PL': 'Policy Leader',
            'SO-ME': 'Media Storyteller',
            'SO-ED': 'Educator',
            'HE-MD': 'Future Medic',
            'HE-BT': 'Biotech Innovator',
            'AR-DS': 'Design Architect',
            'AR-FM': 'Fine-Arts Maestro',
            'GL-DM': 'Diplomat',
            'GL-TR': 'Globe-Trotter',
            'SP-AT': 'Athlete-Strategist',
            'SP-EC': 'Eco-Guardian'
        };
        return names[code] || 'Unknown Archetype';
    };

    // Sort archetype scores by value (descending)
    const sortedArchetypes = profile.analysis?.archetype_scores 
        ? Object.entries(profile.analysis.archetype_scores)
            .sort((a, b) => b[1] - a[1])
        : [];
    
    // Get top archetype
    const topArchetype = sortedArchetypes.length > 0 ? sortedArchetypes[0] : null;
    
    // Typewriter effect for analysis text
    useEffect(() => {
        if (!profile.analysis || !showAnalysis) return;
        
        const sections = [
            profile.analysis.type_description,
            profile.analysis.learning_style
        ];
        
        if (currentSection < sections.length) {
            const text = sections[currentSection];
            let index = 0;
            
            const timer = setInterval(() => {
                if (index < text.length) {
                    setTypewriterText(prev => prev + text.charAt(index));
                    index++;
                } else {
                    clearInterval(timer);
                    setTimeout(() => {
                        setCurrentSection(prev => prev + 1);
                        setTypewriterText('');
                    }, 1000);
                }
            }, 20);
            
            return () => clearInterval(timer);
        }
    }, [profile.analysis, showAnalysis, currentSection]);
    
    // Simulate shuffling archetypes animation
    useEffect(() => {
        if (shufflingArchetypes) {
            // Create an array of archetype codes to shuffle through
            const archetypeCodes = getAllArchetypeCodes();
            
            const shuffleTimer = setInterval(() => {
                setCurrentShuffleIndex(prev => (prev + 1) % archetypeCodes.length);
            }, 300);
            
            const timer = setTimeout(() => {
                clearInterval(shuffleTimer);
                setShufflingArchetypes(false);
                setTimeout(() => {
                    setShowAnalysis(true);
                }, 500);
            }, 2500);
            
            return () => {
                clearInterval(shuffleTimer);
                clearTimeout(timer);
            };
        }
    }, [shufflingArchetypes]);
    
    // After shuffling animation is complete
    useEffect(() => {
        if (!shufflingArchetypes && !animationComplete) {
            const timer = setTimeout(() => {
                setAnimationComplete(true);
            }, 1500);
            
            return () => clearTimeout(timer);
        }
    }, [shufflingArchetypes, animationComplete]);
    
    // Get an array of all archetype codes for shuffling animation
    const getAllArchetypeCodes = () => {
        return Object.keys({
            'AN-VS': 'bg-red-500',
            'AN-EN': 'bg-red-600',
            'DI-CD': 'bg-blue-500',
            'DI-CS': 'bg-blue-600',
            'EX-BU': 'bg-green-500',
            'EX-PL': 'bg-green-600',
            'SO-ME': 'bg-yellow-500',
            'SO-ED': 'bg-yellow-600',
            'HE-MD': 'bg-purple-500',
            'HE-BT': 'bg-purple-600',
            'AR-DS': 'bg-pink-500',
            'AR-FM': 'bg-pink-600',
            'GL-DM': 'bg-indigo-500',
            'GL-TR': 'bg-indigo-600',
            'SP-AT': 'bg-orange-500',
            'SP-EC': 'bg-orange-600'
        });
    };
    
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation Bar */}
            <nav className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex-shrink-0 flex items-center">
                                <Link href="/">
                                    <span className="text-[#9A2D2D] text-3xl font-bold">UMatch</span>
                                </Link>
                            </div>
                            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                                <Link href="/dashboard" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                                    Home
                                </Link>
                                <Link href="/universities" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                                    Universities
                                </Link>
                                <Link href="/careers" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                                    Careers
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Back to Dashboard Link */}
                <Link 
                    href="/dashboard" 
                    className="inline-flex items-center mb-6 px-4 py-2 bg-white rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-800"
                >
                    <ArrowLeftIcon className="h-4 w-4 mr-2" />
                    Back to Dashboard
                </Link>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    {/* Profile Header */}
                    <div className="px-6 py-8 bg-gradient-to-r from-[#9A2D2D] to-[#B8352F]">
                        <h1 className="text-3xl font-bold text-white">Student Profile</h1>
                        <p className="mt-2 text-white opacity-90">Learning Archetype Analysis</p>
                    </div>

                    {/* Profile Content */}
                    <div className="px-6 py-8">
                        <div className="space-y-12">
                            {/* Basic Information */}
                            <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                                {shufflingArchetypes && (
                                    <div className="flex items-center justify-center">
                                        <div className="relative h-44 w-44">
                                            {getAllArchetypeCodes().map((code, index) => (
                                                <AnimatePresence key={code}>
                                                    {currentShuffleIndex === index && (
                                                        <motion.div
                                                            className="absolute top-0 left-0 w-full h-full"
                                                            initial={{ opacity: 0, x: 100 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            exit={{ opacity: 0, x: -100 }}
                                                            transition={{ duration: 0.3 }}
                                                        >
                                                            <div className="rounded-full overflow-hidden border-4 border-white shadow-xl h-full w-full">
                                                                <img 
                                                                    src={`/images/${code}.png`} 
                                                                    alt={getArchetypeName(code)}
                                                                    className="w-full h-full object-cover"
                                                                    onError={(e) => {
                                                                        (e.target as HTMLImageElement).src = '/images/bearmascot-shirt.png';
                                                                    }}
                                                                />
                                                            </div>
                                                            <div className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-full text-xs text-white font-bold ${getArchetypeColor(code || "")}`}>
                                                                {code}
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Top Archetype with Animation */}
                            {!shufflingArchetypes && topArchetype && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.6 }}
                                    className="flex flex-col items-center"
                                >
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center justify-center w-full">
                                        <TrophyIcon className="h-8 w-8 mr-3 text-[#B8352F]" />
                                        Your Top Archetype
                                    </h2>
                                    
                                    <div className="flex flex-col items-center mb-8">
                                        <motion.div 
                                            className="relative mb-4"
                                            initial={{ opacity: 0, x: 100 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.5, delay: 0.2 }}
                                        >
                                            <div className="rounded-full overflow-hidden border-8 border-white shadow-xl h-48 w-48">
                                                <img 
                                                    src={`/images/${topArchetype[0]}.png`} 
                                                    alt={getArchetypeName(topArchetype[0])}
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => {
                                                        (e.target as HTMLImageElement).src = '/images/bearmascot-shirt.png';
                                                    }}
                                                />
                                            </div>
                                            <motion.div 
                                                className="absolute -top-3 -right-3 w-14 h-14 rounded-full flex items-center justify-center text-white font-bold bg-[#B8352F] text-xl shadow-lg"
                                                initial={{ scale: 0, rotate: -180 }}
                                                animate={{ scale: 1, rotate: 0 }}
                                                transition={{ duration: 0.4, delay: 0.7, type: "spring" }}
                                            >
                                                #1
                                            </motion.div>
                                        </motion.div>
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.4, delay: 0.8 }}
                                            className="text-center"
                                        >
                                            <h3 className="text-2xl font-bold text-gray-900 mb-1">{getArchetypeName(topArchetype[0])}</h3>
                                            <div className="inline-block px-4 py-1 rounded-full text-sm text-white font-bold mb-3" style={{ backgroundColor: '#B8352F' }}>
                                                {topArchetype[0]}
                                            </div>
                                        </motion.div>
                                        <motion.div 
                                            initial={{ width: 0 }}
                                            animate={{ width: "100%" }}
                                            transition={{ duration: 0.8, delay: 1 }}
                                            className="w-full max-w-xs"
                                        >
                                            <div className="flex items-center">
                                                <div className="w-full bg-gray-200 rounded-full h-4 mr-3">
                                                    <motion.div
                                                        className="h-4 rounded-full bg-[#B8352F]"
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${topArchetype[1]}%` }}
                                                        transition={{ duration: 0.8, delay: 1.2 }}
                                                    ></motion.div>
                                                </div>
                                                <motion.span 
                                                    className="text-lg font-bold text-gray-900"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ duration: 0.4, delay: 1.8 }}
                                                >
                                                    {topArchetype[1]}%
                                                </motion.span>
                                            </div>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            )}

                            {/* Other Archetypes Ranked */}
                            {!shufflingArchetypes && sortedArchetypes.length > 1 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 2 }}
                                >
                                    <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                                        <ChartBarIcon className="h-6 w-6 mr-2 text-[#B8352F]" />
                                        Other Archetype Matches
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {sortedArchetypes.slice(1).map(([code, score], index) => (
                                            <motion.div 
                                                key={code} 
                                                className="space-y-2"
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.5, delay: 2.2 + (index * 0.1) }}
                                            >
                                                <div className="flex justify-between items-center">
                                                    <div>
                                                        <span className="text-sm font-semibold text-gray-700">{code}</span>
                                                        <span className="ml-2 text-xs text-gray-500">{getArchetypeName(code)}</span>
                                                    </div>
                                                    <span className="text-sm font-bold ">{score}%</span>
                                                </div>
                                                <motion.div 
                                                    className="w-full bg-gray-200 rounded-full h-2.5"
                                                    initial={{ width: 0 }}
                                                    animate={{ width: "100%" }}
                                                    transition={{ duration: 0.8, delay: 2.3 + (index * 0.1) }}
                                                >
                                                    <motion.div
                                                        className={`h-2.5 rounded-full ${getArchetypeColor(code)}`}
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${score}%` }}
                                                        transition={{ duration: 1, delay: 2.4 + (index * 0.1) }}
                                                    ></motion.div>
                                                </motion.div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* Analysis Details with Fade-in and Typewriter effect */}
                            {profile.analysis && (
                                <AnimatePresence>
                                    {showAnalysis && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 1, delay: 3 }}
                                        >
                                            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                                                <AcademicCapIcon className="h-6 w-6 mr-2 text-[#B8352F]" />
                                                Archetype Analysis
                                            </h2>
                                            <div className="space-y-6 bg-gray-50 p-6 rounded-xl">
                                                {currentSection === 0 && (
                                                    <div>
                                                        <h3 className="text-lg font-medium text-gray-900 mb-2">Type Description</h3>
                                                        <p className="text-gray-700 min-h-[3rem]">{typewriterText}<span className="animate-pulse">|</span></p>
                                                    </div>
                                                )}
                                                
                                                {currentSection === 1 && (
                                                    <div>
                                                        <h3 className="text-lg font-medium text-gray-900 mb-2">Learning Style</h3>
                                                        <p className="text-gray-700 min-h-[3rem]">{typewriterText}<span className="animate-pulse">|</span></p>
                                                    </div>
                                                )}
                                                
                                                {currentSection >= 2 && (
                                                    <>
                                                        <motion.div
                                                            initial={{ opacity: 0, y: 20 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            transition={{ duration: 0.5 }}
                                                        >
                                                            <h3 className="text-lg font-medium text-gray-900 mb-2">Type Description</h3>
                                                            <p className="text-gray-700">{profile.analysis.type_description}</p>
                                                        </motion.div>
                                                        
                                                        <motion.div
                                                            initial={{ opacity: 0, y: 20 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            transition={{ duration: 0.5, delay: 0.2 }}
                                                        >
                                                            <h3 className="text-lg font-medium text-gray-900 mb-2">Learning Style</h3>
                                                            <p className="text-gray-700">{profile.analysis.learning_style}</p>
                                                        </motion.div>
                                                
                                                        <motion.div
                                                            initial={{ opacity: 0, y: 20 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            transition={{ duration: 0.5, delay: 0.4 }}
                                                        >
                                                            <h3 className="text-lg font-medium text-gray-900 mb-2">Recommended Majors</h3>
                                                            <div className="flex flex-wrap gap-2">
                                                                {profile.analysis.recommended_majors?.map((major, index) => (
                                                                    <motion.span 
                                                                        key={index} 
                                                                        className="px-3 py-1 bg-white text-sm rounded-full border border-gray-300 text-gray-700"
                                                                        initial={{ opacity: 0, scale: 0.8 }}
                                                                        animate={{ opacity: 1, scale: 1 }}
                                                                        transition={{ duration: 0.3, delay: 0.5 + (index * 0.1) }}
                                                                    >
                                                                        {major}
                                                                    </motion.span>
                                                                ))}
                                                            </div>
                                                        </motion.div>
                                                
                                                        <motion.div
                                                            initial={{ opacity: 0, y: 20 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            transition={{ duration: 0.5, delay: 0.6 }}
                                                        >
                                                            <h3 className="text-lg font-medium text-gray-900 mb-2">Study Techniques</h3>
                                                            <ul className="space-y-1">
                                                                {profile.analysis.study_techniques?.map((technique, index) => (
                                                                    <motion.li 
                                                                        key={index} 
                                                                        className="flex items-start"
                                                                        initial={{ opacity: 0, x: -10 }}
                                                                        animate={{ opacity: 1, x: 0 }}
                                                                        transition={{ duration: 0.3, delay: 0.7 + (index * 0.1) }}
                                                                    >
                                                                        <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-red-100 text-[#9A2D2D] mr-2 mt-0.5">
                                                                            {index + 1}
                                                                        </span>
                                                                        <span className="text-gray-700">{technique}</span>
                                                                    </motion.li>
                                                                ))}
                                                            </ul>
                                                        </motion.div>
                                                    </>
                                                )}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            )}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <motion.div 
                        className="px-6 py-6 bg-gray-50 border-t border-gray-200"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: animationComplete ? 1 : 0, y: animationComplete ? 0 : 20 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="flex justify-center space-x-4">
                            <motion.button 
                                className="px-6 py-3 bg-[#9A2D2D] text-white rounded-md hover:bg-[#822626] transition-colors duration-300"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Download Profile
                            </motion.button>
                            <motion.button 
                                className="px-6 py-3 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors duration-300"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Share Results
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default StudentProfile; 