import React from 'react';
import { PageProps } from '@/types';
import { Link } from '@inertiajs/react';
import { AcademicCapIcon, ChartBarIcon, TrophyIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

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
    
    // Get top 3 archetypes
    const topThreeArchetypes = sortedArchetypes.slice(0, 3);

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
                        <div className="space-y-10">
                            {/* Basic Information with Bear Mascot */}
                            <div className="flex flex-wrap items-center gap-6">
                                <div className="w-32 h-32 relative">
                                    <img 
                                        src="/images/bearmascot-shirt.png" 
                                        alt="Bekim the Bear" 
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Basic Information</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-sm text-gray-500">Primary Learning Archetype</p>
                                            <p className="text-lg font-medium text-gray-900">{profile.hexad_type}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">School</p>
                                            <p className="text-lg font-medium text-gray-900">{profile.school || 'Not specified'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Top 3 Archetypes with Images */}
                            {topThreeArchetypes.length > 0 && (
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                                        <TrophyIcon className="h-6 w-6 mr-2 text-[#B8352F]" />
                                        Top Archetype Matches
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        {topThreeArchetypes.map(([code, score], index) => (
                                            <div key={code} className="flex flex-col items-center">
                                                <div className="relative mb-3">
                                                    <img 
                                                        src={`/images/${code}.png`} 
                                                        alt={getArchetypeName(code)}
                                                        className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                                                        onError={(e) => {
                                                            // If image fails to load, show a fallback
                                                            (e.target as HTMLImageElement).src = '/images/bearmascot-shirt.png';
                                                        }}
                                                    />
                                                    <div className={`absolute -top-2 -right-2 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${index === 0 ? 'bg-[#B8352F]' : index === 1 ? 'bg-gray-400' : 'bg-amber-600'}`}>
                                                        #{index + 1}
                                                    </div>
                                                </div>
                                                <h3 className="text-lg font-semibold text-gray-900 text-center">{getArchetypeName(code)}</h3>
                                                <div className="mt-2 flex items-center">
                                                    <div className="w-full bg-gray-200 rounded-full h-3 mr-2">
                                                        <div
                                                            className={`h-3 rounded-full ${index === 0 ? 'bg-[#B8352F]' : getArchetypeColor(code)}`}
                                                            style={{ width: `${score}%` }}
                                                        ></div>
                                                    </div>
                                                    <span className="text-sm font-bold">{score}%</span>
                                                </div>
                                                <span className="mt-1 text-xs text-gray-500">{code}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* All Archetype Scores Ranked */}
                            {sortedArchetypes.length > 0 && (
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                                        <ChartBarIcon className="h-6 w-6 mr-2 text-[#B8352F]" />
                                        Archetype Scores (Ranked)
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {sortedArchetypes.map(([code, score], index) => (
                                            <div key={code} className="space-y-2">
                                                <div className="flex justify-between items-center">
                                                    <div>
                                                        <span className="text-sm font-semibold text-gray-700">{code}</span>
                                                        <span className="ml-2 text-xs text-gray-500">{getArchetypeName(code)}</span>
                                                    </div>
                                                    <span className="text-sm font-bold">{score}%</span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                                    <div
                                                        className={`h-2.5 rounded-full ${index === 0 ? 'bg-[#B8352F]' : getArchetypeColor(code)}`}
                                                        style={{ width: `${score}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Analysis Details */}
                            {profile.analysis && (
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                                        <AcademicCapIcon className="h-6 w-6 mr-2 text-[#B8352F]" />
                                        Archetype Analysis
                                    </h2>
                                    <div className="space-y-6 bg-gray-50 p-6 rounded-xl">
                                        <div>
                                            <h3 className="text-lg font-medium text-gray-900 mb-2">Type Description</h3>
                                            <p className="text-gray-700">{profile.analysis.type_description}</p>
                                        </div>

                                        <div>
                                            <h3 className="text-lg font-medium text-gray-900 mb-2">Learning Style</h3>
                                            <p className="text-gray-700">{profile.analysis.learning_style}</p>
                                        </div>

                                        <div>
                                            <h3 className="text-lg font-medium text-gray-900 mb-2">Recommended Majors</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {profile.analysis.recommended_majors?.map((major, index) => (
                                                    <span key={index} className="px-3 py-1 bg-white text-sm rounded-full border border-gray-300 text-gray-700">
                                                        {major}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="text-lg font-medium text-gray-900 mb-2">Study Techniques</h3>
                                            <ul className="space-y-1">
                                                {profile.analysis.study_techniques?.map((technique, index) => (
                                                    <li key={index} className="flex items-start">
                                                        <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-red-100 text-[#9A2D2D] mr-2 mt-0.5">
                                                            {index + 1}
                                                        </span>
                                                        <span className="text-gray-700">{technique}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="px-6 py-6 bg-gray-50 border-t border-gray-200">
                        <div className="flex justify-center space-x-4">
                            <button className="px-6 py-3 bg-[#9A2D2D] text-white rounded-md hover:bg-[#822626] transition-colors duration-300">
                                Download Profile
                            </button>
                            <button className="px-6 py-3 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors duration-300">
                                Share Results
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentProfile; 