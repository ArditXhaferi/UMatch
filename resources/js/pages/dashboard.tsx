import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { 
    UserCircleIcon, 
    BuildingLibraryIcon,
    FireIcon,
    TrophyIcon,
    CalendarIcon,
    UsersIcon,
    DocumentTextIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    StarIcon
} from '@heroicons/react/24/outline';
import { FireIcon as FireIconSolid } from '@heroicons/react/24/solid';
import Navigation from '@/components/Navigation';

interface QuestType {
    id: number;
    title: string;
    description: string;
    xp_reward: number;
    progress: number;
    is_complete: boolean;
}

interface DeadlineType {
    id: number;
    title: string;
    date: string;
    type: 'application' | 'event' | 'assignment' | 'exam' | 'scholarship' | 'interview' | 'workshop' | 'meeting' | 'deadline';
}

interface DashboardProps {
    auth: {
        user: {
            name: string;
            email: string;
            profile_photo_url?: string;
        };
    };
    studentProfile: {
        id: number;
        hexad_type: string;
        archetype_code: string;
        xp?: number;
        credits?: number;
        school?: string;
    } | null;
    quests?: QuestType[];
    deadlines?: DeadlineType[];
}

export default function Dashboard({ auth, studentProfile, quests = [], deadlines = [] }: DashboardProps) {
    // Calendar state and helpers
    const [currentDate, setCurrentDate] = useState(new Date());
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    
    // Mock deadlines if none provided
    const sampleDeadlines: DeadlineType[] = [
        { id: 1, title: 'University Application Deadline', date: '2023-06-15', type: 'application' },
        { id: 2, title: 'Career Fair', date: '2023-06-18', type: 'event' },
        { id: 3, title: 'Scholarship Essay Due', date: '2023-06-22', type: 'scholarship' },
        { id: 4, title: 'Midterm Exam', date: '2023-06-25', type: 'exam' },
        { id: 5, title: 'Interview with Admissions', date: '2023-06-28', type: 'interview' },
        { id: 6, title: 'Study Skills Workshop', date: '2023-06-30', type: 'workshop' }
    ];
    
    const displayDeadlines = deadlines.length > 0 ? deadlines : sampleDeadlines;
    
    // Calculate current level based on XP (just a simple calculation for demo)
    const currentXp = studentProfile?.xp || 0;
    const currentLevel = Math.floor(currentXp / 100) + 1;
    const xpProgress = currentXp > 0 ? (currentXp % 100) / 100 * 100 : 0; // Percentage to next level
    const daysStreak = 5; // Placeholder for streak data (should come from backend)

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation Bar */}
            <Navigation 
                auth={auth} 
                studentProfile={studentProfile} 
                currentPage="home" 
            />

            <Head title="Dashboard" />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">Welcome, {auth.user.name}!</h1>
                    <p className="mt-1 text-sm text-gray-600">
                        Your personalized university and career path guidance dashboard
                    </p>
                </div>

                {/* Main Dashboard Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column - Learning Profile */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Student Profile Card - PRIORITIZED */}
                        <div className="bg-white rounded-xl shadow-md overflow-hidden">
                            <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
                                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                                    <UserCircleIcon className="h-5 w-5 mr-2 text-[#9A2D2D]" />
                                    Your Learning Profile
                                </h2>
                                {studentProfile ? (
                                    <Link 
                                        href={`/profile/${studentProfile.id}`} 
                                        className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#9A2D2D]"
                                    >
                                        View Full Profile
                                    </Link>
                                ) : (
                                    <Link 
                                        href="/upload" 
                                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#9A2D2D] hover:bg-[#822626] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#9A2D2D]"
                                    >
                                        Create Profile
                                    </Link>
                                )}
                            </div>
                            <div className="px-6 py-5">
                                {studentProfile ? (
                                    <div className="flex flex-col md:flex-row md:items-center">
                                        <div className="flex-shrink-0 flex justify-center mb-4 md:mb-0">
                                            <img 
                                                src={`/images/${studentProfile.archetype_code}.png`}
                                                alt={`${studentProfile.hexad_type} Character`}
                                                className="h-32 w-32 object-contain"
                                            />
                                        </div>
                                        <div className="md:ml-6 flex-1">
                                            <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                                                <div>
                                                    <h3 className="text-xl font-bold text-gray-900">{studentProfile.hexad_type}</h3>
                                                    <div className="mt-1 flex items-center">
                                                        <span className="text-sm text-gray-500">Archetype Code: {studentProfile.archetype_code}</span>
                                                    </div>
                                                    {studentProfile.school && (
                                                        <div className="mt-1">
                                                            <span className="text-sm text-gray-500">School: {studentProfile.school}</span>
                                                        </div>
                                                    )}
                                                </div>
                                                
                                                {currentXp > 0 && (
                                                    <div className="mt-4 md:mt-0 flex flex-col items-center">
                                                        <div className="w-16 h-16 relative">
                                                            <svg className="w-full h-full" viewBox="0 0 36 36">
                                                                <path
                                                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                                                    fill="none"
                                                                    stroke="#E5E7EB"
                                                                    strokeWidth="3"
                                                                    strokeDasharray="100, 100"
                                                                />
                                                                <path
                                                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                                                    fill="none"
                                                                    stroke="#9A2D2D"
                                                                    strokeWidth="3"
                                                                    strokeDasharray={`${xpProgress}, 100`}
                                                                />
                                                            </svg>
                                                            <div className="absolute inset-0 flex items-center justify-center">
                                                                <span className="text-sm font-medium text-[#9A2D2D]">Lvl {currentLevel}</span>
                                                            </div>
                                                        </div>
                                                        <div className="mt-1 text-xs text-gray-500">{currentXp % 100}/100 XP</div>
                                                    </div>
                                                )}
                                            </div>
                                            
                                            <div className="mt-4 flex flex-wrap gap-2">
                                                <div className="bg-[#9A2D2D] bg-opacity-10 px-3 py-1 rounded-full flex items-center justify-center">
                                                    <span className="text-xs font-medium text-[#9A2D2D] text-white">{currentXp} Total XP</span>
                                                </div>
                                                {studentProfile.credits !== undefined && (
                                                    <div className="bg-blue-100 px-3 py-1 rounded-full">
                                                        <span className="text-xs font-medium text-blue-800">{studentProfile.credits} Credits</span>
                                                    </div>
                                                )}
                                            </div>
                                            
                                            <div className="mt-4">
                                                <p className="text-sm text-gray-700">
                                                    View your full profile to see your learning style, recommended majors, and personalized university matches.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center py-6">
                                        <img 
                                            src="/images/bearmascot-shirt.png" 
                                            alt="Bekim the Bear" 
                                            className="mx-auto h-28 w-28 object-contain" 
                                        />
                                        <h3 className="mt-4 text-lg font-medium text-gray-900">No Profile Yet</h3>
                                        <p className="mt-2 text-sm text-gray-500 max-w-md mx-auto">
                                            Upload your academic records to discover your learning archetype and get personalized university recommendations.
                                        </p>
                                        <div className="mt-4">
                                            <Link 
                                                href="/upload" 
                                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#9A2D2D] hover:bg-[#822626]"
                                            >
                                                Create Your Profile
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* University Matches - PRIORITIZED */}
                        <div className="bg-white rounded-xl shadow-md overflow-hidden">
                            <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
                                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                                    <BuildingLibraryIcon className="h-5 w-5 mr-2 text-[#9A2D2D]" />
                                    Your University Matches
                                </h2>
                                {studentProfile && (
                                    <Link 
                                        href="/universities" 
                                        className="text-sm font-medium text-[#9A2D2D] hover:text-[#822626]"
                                    >
                                        View All Matches
                                    </Link>
                                )}
                            </div>
                            <div className="px-6 py-5">
                                {studentProfile ? (
                                    <div className="space-y-5">
                                        {[1, 2, 3].map((item) => (
                                            <div key={item} className="flex items-start p-4 hover:bg-gray-50 rounded-lg cursor-pointer border border-gray-100">
                                                <div className="flex-shrink-0 bg-[#9A2D2D] bg-opacity-10 rounded-full h-12 w-12 flex items-center justify-center">
                                                    <span className="text-lg font-medium text-[#9A2D2D]">#{item}</span>
                                                </div>
                                                <div className="ml-4 flex-1">
                                                    <div className="flex justify-between">
                                                        <h3 className="text-base font-medium text-gray-900">Example University {item}</h3>
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                            {95 - (item * 5)}% match
                                                        </span>
                                                    </div>
                                                    <div className="mt-1 space-y-2">
                                                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                                                            <div className="bg-[#9A2D2D] h-1.5 rounded-full" style={{ width: `${95 - (item * 5)}%` }}></div>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-xs text-gray-500">Faculty: Example Faculty {item}</span>
                                                            <Link 
                                                                href={`/universities/${item}`} 
                                                                className="text-xs font-medium text-[#9A2D2D]"
                                                            >
                                                                View Details
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <div className="mx-auto h-12 w-12 text-gray-400">
                                            <BuildingLibraryIcon className="h-12 w-12" />
                                        </div>
                                        <h3 className="mt-2 text-sm font-medium text-gray-900">No Matches Yet</h3>
                                        <p className="mt-1 text-sm text-gray-500">
                                            Create your profile to get personalized university recommendations.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* XP Activity Chart - Secondary Priority */}
                        {studentProfile && (
                            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                                <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
                                    <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                                        <CalendarIcon className="h-5 w-5 mr-2 text-[#9A2D2D]" />
                                        Important Dates
                                    </h2>
                                    <div className="flex space-x-2">
                                        <button 
                                            onClick={() => {
                                                const newDate = new Date(currentDate);
                                                newDate.setMonth(newDate.getMonth() - 1);
                                                setCurrentDate(newDate);
                                            }}
                                            className="p-1 rounded-full hover:bg-gray-100"
                                            type="button"
                                        >
                                            <ChevronLeftIcon className="h-5 w-5 text-gray-600" />
                                        </button>
                                        <button 
                                            onClick={() => {
                                                const newDate = new Date(currentDate);
                                                newDate.setMonth(newDate.getMonth() + 1);
                                                setCurrentDate(newDate);
                                            }}
                                            className="p-1 rounded-full hover:bg-gray-100"
                                            type="button"
                                        >
                                            <ChevronRightIcon className="h-5 w-5 text-gray-600" />
                                        </button>
                                    </div>
                                </div>
                                <div className="px-6 py-5">
                                    {/* Month and Year Display */}
                                    <div className="text-center mb-4">
                                        <h3 className="text-lg font-medium text-gray-900">
                                            {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
                                        </h3>
                                    </div>

                                    {/* Days of Week */}
                                    <div className="grid grid-cols-7 gap-1 mb-2">
                                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                                            <div key={day} className="text-center text-xs font-medium text-gray-500">
                                                {day}
                                            </div>
                                        ))}
                                    </div>

                                    {/* Calendar Grid */}
                                    <div className="grid grid-cols-7 gap-1">
                                        {/* Empty cells for days before the first of the month */}
                                        {Array.from({ length: firstDayOfMonth }).map((_, index) => (
                                            <div key={`empty-${index}`} className="h-12 p-1" />
                                        ))}
                                        
                                        {/* Calendar days */}
                                        {Array.from({ length: daysInMonth }).map((_, index) => {
                                            const day = index + 1;
                                            const dateString = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                                            
                                            // Find events for this day
                                            const dayEvents = displayDeadlines.filter(event => 
                                                new Date(event.date).toISOString().split('T')[0] === dateString
                                            );
                                            
                                            const isToday = new Date().toISOString().split('T')[0] === dateString;
                                            
                                            return (
                                                <div 
                                                    key={day} 
                                                    className={`h-12 p-1 border rounded-md relative ${isToday ? 'bg-[#9A2D2D] bg-opacity-10 border-[#9A2D2D]' : 'border-gray-200'}`}
                                                >
                                                    <div className="absolute top-1 left-1 text-xs font-medium">
                                                        {day}
                                                    </div>
                                                    {dayEvents.length > 0 && (
                                                        <div className="absolute bottom-1 right-1 flex flex-col items-end space-y-1">
                                                            {dayEvents.slice(0, 2).map((event) => (
                                                                <div 
                                                                    key={event.id} 
                                                                    className={`w-2 h-2 rounded-full ${
                                                                        event.type === 'application' ? 'bg-red-500' : 
                                                                        event.type === 'event' ? 'bg-blue-500' : 
                                                                        event.type === 'assignment' ? 'bg-green-500' : 
                                                                        'bg-gray-500'
                                                                    }`}
                                                                    title={event.title}
                                                                />
                                                            ))}
                                                            {dayEvents.length > 2 && (
                                                                <span className="text-xs text-gray-500">+{dayEvents.length - 2}</span>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {/* Legend */}
                                    <div className="mt-4 flex flex-wrap gap-4 text-xs text-gray-600">
                                        <div className="flex items-center">
                                            <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
                                            <span>Application Deadline</span>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="w-3 h-3 rounded-full bg-blue-500 mr-1"></div>
                                            <span>Event</span>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
                                            <span>Assignment</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column - Secondary content */}
                    <div className="space-y-6">
                        {/* Current Quests */}
                        {studentProfile && (
                            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                                <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
                                    <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                                        <TrophyIcon className="h-5 w-5 mr-2 text-[#9A2D2D]" />
                                        Current Quests
                                    </h2>
                                    <Link 
                                        href="/quests" 
                                        className="text-sm font-medium text-[#9A2D2D] hover:text-[#822626]"
                                    >
                                        View All
                                    </Link>
                                </div>
                                <div className="px-6 py-5">
                                    {quests.length > 0 ? (
                                        <div className="space-y-4">
                                            {quests.slice(0, 3).map((quest) => (
                                                <div key={quest.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                                                    <div className="flex justify-between items-center mb-2">
                                                        <h3 className="text-sm font-medium text-gray-900">{quest.title}</h3>
                                                        <div className="flex items-center text-sm text-gray-500">
                                                            <StarIcon className="h-4 w-4 text-yellow-500 mr-1" />
                                                            {quest.xp_reward} XP
                                                        </div>
                                                    </div>
                                                    <p className="text-xs text-gray-500 mb-3">{quest.description}</p>
                                                    <div className="relative pt-1">
                                                        <div className="flex items-center justify-between">
                                                            <div>
                                                                <span className="text-xs font-medium text-gray-500">
                                                                    {quest.progress}% Complete
                                                                </span>
                                                            </div>
                                                            {quest.is_complete && (
                                                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                                                    Completed
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div className="mt-1 overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                                                            <div
                                                                style={{ width: `${quest.progress}%` }}
                                                                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#9A2D2D]"
                                                            ></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-6">
                                            <TrophyIcon className="h-12 w-12 text-gray-400 mx-auto" />
                                            <h3 className="mt-2 text-sm font-medium text-gray-900">No Quests Available</h3>
                                            <p className="mt-1 text-sm text-gray-500">
                                                New quests will appear here as they become available.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Streak Stats - if XP exists */}
                        {studentProfile && currentXp > 0 && (
                            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                                <div className="px-6 py-5 border-b border-gray-200">
                                    <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                                        <FireIcon className="h-5 w-5 mr-2 text-orange-500" />
                                        Your Streak
                                    </h2>
                                </div>
                                <div className="px-6 py-5">
                                    <div className="flex justify-around">
                                        <div className="text-center">
                                            <div className="text-3xl font-bold text-[#9A2D2D]">{daysStreak}</div>
                                            <div className="text-xs text-gray-500">Current Streak</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-3xl font-bold text-[#9A2D2D]">12</div>
                                            <div className="text-xs text-gray-500">Longest Streak</div>
                                        </div>
                                    </div>
                                    <div className="mt-4 flex justify-center">
                                        <button className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#9A2D2D] hover:bg-[#822626] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#9A2D2D]">
                                            <FireIconSolid className="h-4 w-4 mr-2" />
                                            Continue Streak Today
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Quick Links Card */}
                        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                            <div className="px-6 py-5 border-b border-gray-200">
                                <h2 className="text-lg font-semibold text-gray-900">Quick Links</h2>
                            </div>
                            <div className="px-6 py-5">
                                <nav className="space-y-1">
                                    <Link
                                        href="/universities"
                                        className="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:text-[#9A2D2D] hover:bg-gray-50"
                                    >
                                        <BuildingLibraryIcon className="flex-shrink-0 mr-3 h-5 w-5 text-gray-400 group-hover:text-[#9A2D2D]" />
                                        <span className="truncate">Find Universities</span>
                                    </Link>
                                    <Link
                                        href="/events"
                                        className="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:text-[#9A2D2D] hover:bg-gray-50"
                                    >
                                        <CalendarIcon className="flex-shrink-0 mr-3 h-5 w-5 text-gray-400 group-hover:text-[#9A2D2D]" />
                                        <span className="truncate">Upcoming Events</span>
                                    </Link>
                                    <Link
                                        href="/squads"
                                        className="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:text-[#9A2D2D] hover:bg-gray-50"
                                    >
                                        <UsersIcon className="flex-shrink-0 mr-3 h-5 w-5 text-gray-400 group-hover:text-[#9A2D2D]" />
                                        <span className="truncate">Find Study Groups</span>
                                    </Link>
                                    <Link
                                        href="/resources"
                                        className="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:text-[#9A2D2D] hover:bg-gray-50"
                                    >
                                        <DocumentTextIcon className="flex-shrink-0 mr-3 h-5 w-5 text-gray-400 group-hover:text-[#9A2D2D]" />
                                        <span className="truncate">Resources</span>
                                    </Link>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
