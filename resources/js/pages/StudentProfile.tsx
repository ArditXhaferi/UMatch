import React from 'react';
import { PageProps } from '@/types';
import { UserCircleIcon, AcademicCapIcon, LightBulbIcon, ChartBarIcon } from '@heroicons/react/24/outline';

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

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    {/* Profile Header */}
                    <div className="px-6 py-8 bg-gradient-to-r from-green-400 to-blue-500">
                        <h1 className="text-3xl font-bold text-white">Student Profile</h1>
                        <p className="mt-2 text-white opacity-90">Learning Archetype Analysis</p>
                    </div>

                    {/* Profile Content */}
                    <div className="px-6 py-8">
                        <div className="space-y-8">
                            {/* Basic Information */}
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">Basic Information</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-500">Learning Archetype</p>
                                        <p className="text-lg font-medium text-gray-900">{profile.hexad_type}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">School</p>
                                        <p className="text-lg font-medium text-gray-900">{profile.school || 'Not specified'}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Archetype Code</p>
                                        <p className="text-lg font-medium text-gray-900">{profile.archetype_code}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Archetype Scores */}
                            {profile.analysis && (
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Archetype Scores</h2>
                                    <div className="space-y-4">
                                        {Object.entries(profile.analysis.archetype_scores).map(([code, score]) => (
                                            <div key={code} className="space-y-2">
                                                <div className="flex justify-between">
                                                    <span className="text-sm font-medium text-gray-700">{code}</span>
                                                    <span className="text-sm text-gray-500">{score}%</span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                                    <div
                                                        className={`h-2.5 rounded-full ${getArchetypeColor(code)}`}
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
                                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Analysis Details</h2>
                                    <div className="space-y-6">
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
                                            <ul className="list-disc list-inside space-y-1">
                                                {profile.analysis.recommended_majors?.map((major, index) => (
                                                    <li key={index} className="text-gray-700">{major}</li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div>
                                            <h3 className="text-lg font-medium text-gray-900 mb-2">Study Techniques</h3>
                                            <ul className="list-disc list-inside space-y-1">
                                                {profile.analysis.study_techniques?.map((technique, index) => (
                                                    <li key={index} className="text-gray-700">{technique}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="px-6 py-8 bg-gray-50 border-t border-gray-200">
                        <div className="flex justify-center space-x-4">
                            <button className="px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors duration-300">
                                Download Profile
                            </button>
                            <button className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors duration-300">
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