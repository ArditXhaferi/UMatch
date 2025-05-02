import React from 'react';
import { PageProps } from '@/types';
import { UserCircleIcon, AcademicCapIcon, LightBulbIcon, ChartBarIcon } from '@heroicons/react/24/outline';

interface Analysis {
    learning_style: string;
    strengths: string[];
    challenges: string[];
    recommended_approaches: string[];
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
    const getHexadTypeColor = (type: string) => {
        const colors = {
            philanthropist: 'bg-purple-500',
            socialiser: 'bg-blue-500',
            free_spirit: 'bg-green-500',
            achiever: 'bg-yellow-500',
            player: 'bg-red-500',
            disruptor: 'bg-orange-500',
        };
        return colors[type as keyof typeof colors] || 'bg-gray-500';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-400 via-green-300 to-blue-400 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">Your Learning Profile 🎓</h1>
                    <p className="text-xl text-white/90">Discover your unique learning style and potential!</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Profile Overview Card */}
                    <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8">
                        <div className="flex items-center space-x-4 mb-6">
                            <div className={`w-16 h-16 ${getHexadTypeColor(profile.hexad_type)} rounded-full flex items-center justify-center`}>
                                <UserCircleIcon className="w-10 h-10 text-white" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">Learning Archetype</h2>
                                <p className="text-lg text-gray-600 capitalize">{profile.hexad_type}</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <AcademicCapIcon className="w-6 h-6 text-green-500" />
                                <span className="text-gray-700">School: {profile.school || 'Not specified'}</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <ChartBarIcon className="w-6 h-6 text-green-500" />
                                <span className="text-gray-700">Archetype Code: {profile.archetype_code}</span>
                            </div>
                        </div>
                    </div>

                    {/* Learning Style Card */}
                    {profile.analysis && (
                        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8">
                            <div className="flex items-center space-x-4 mb-6">
                                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                                    <LightBulbIcon className="w-10 h-10 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">Learning Style</h2>
                                    <p className="text-lg text-gray-600">Your Unique Approach</p>
                                </div>
                            </div>

                            <p className="text-gray-700 mb-6">{profile.analysis.learning_style}</p>

                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Strengths</h3>
                                    <ul className="list-disc list-inside space-y-1">
                                        {profile.analysis.strengths.map((strength, index) => (
                                            <li key={index} className="text-gray-700">{strength}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Challenges</h3>
                                    <ul className="list-disc list-inside space-y-1">
                                        {profile.analysis.challenges.map((challenge, index) => (
                                            <li key={index} className="text-gray-700">{challenge}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Recommended Approaches</h3>
                                    <ul className="list-disc list-inside space-y-1">
                                        {profile.analysis.recommended_approaches.map((approach, index) => (
                                            <li key={index} className="text-gray-700">{approach}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="mt-8 flex justify-center space-x-4">
                    <button className="px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors duration-300">
                        Download Profile
                    </button>
                    <button className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors duration-300">
                        Share Results
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StudentProfile; 