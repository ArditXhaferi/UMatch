import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { 
    UserCircleIcon, 
    BuildingLibraryIcon,
    FireIcon,
    CalendarIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    XMarkIcon,
    AcademicCapIcon,
    ChartBarIcon,
    ClipboardDocumentListIcon
} from '@heroicons/react/24/outline';
import Navigation from '@/components/Navigation';

interface Application {
    id: number;
    student_name: string;
    program: string;
    status: 'pending' | 'reviewed' | 'accepted' | 'rejected';
    submitted_at: string;
    match_percentage: number;
}

interface Event {
    id: number;
    title: string;
    date: string;
    type: 'open_day' | 'workshop' | 'interview' | 'deadline';
    status: 'upcoming' | 'ongoing' | 'completed';
}

interface UniversityStats {
    total_applications: number;
    pending_applications: number;
    accepted_applications: number;
    rejected_applications: number;
    average_match_percentage: number;
    top_programs: string[];
}

interface UniversityDashboardProps {
    auth: {
        user: {
            name: string;
            email: string;
            profile_photo_url?: string;
        };
    };
    university: {
        id: number;
        university_name: string;
        city: string;
        description: string;
        website: string;
        logo: string;
        image: string;
        branches_offered: string[];
        qualities_sought: string[];
    };
    stats: UniversityStats;
    recent_applications: Application[];
    upcoming_events: Event[];
}

export default function UniversityDashboard({ auth, university, stats = {
    total_applications: 0,
    pending_applications: 0,
    accepted_applications: 0,
    rejected_applications: 0,
    average_match_percentage: 0,
    top_programs: []
}, recent_applications = [], upcoming_events = [] }: UniversityDashboardProps) {
    // Calendar state and helpers
    const [currentDate, setCurrentDate] = useState(new Date());
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    
    // Notification banner state
    const [showNotification, setShowNotification] = useState(true);

    // Hardcoded university data
    const hardcodedUniversity = {
        id: university.id || 1,
        university_name: university.university_name || "Oxford University",
        city: university.city || "Oxford, United Kingdom",
        description: university.description || "Oxford University is one of the world's leading academic institutions, with a rich history dating back to the 12th century. We offer exceptional teaching, research, and innovation across a wide range of disciplines.",
        website: university.website || "https://www.ox.ac.uk",
        logo: university.logo || "https://upload.wikimedia.org/wikipedia/commons/f/ff/Oxford-University-Circlet.svg",
        image: university.image || "https://www.ox.ac.uk/sites/files/oxford/styles/ow_large_feature/s3/field/field_image_main/UAS%20quad.jpg",
        branches_offered: university.branches_offered?.length > 0 ? university.branches_offered : [
            "Computer Science",
            "Medicine",
            "Law",
            "Engineering",
            "Business",
            "Arts & Humanities",
            "Social Sciences",
            "Mathematics",
            "Natural Sciences"
        ],
        qualities_sought: university.qualities_sought?.length > 0 ? university.qualities_sought : [
            "Academic Excellence",
            "Critical Thinking",
            "Research Potential",
            "Leadership",
            "Community Engagement"
        ]
    };

    // Hardcoded upcoming events data
    const hardcodedEvents: Event[] = [
        {
            id: 1,
            title: "Spring Open Day",
            date: new Date(currentYear, currentMonth, currentDate.getDate() + 5).toISOString(),
            type: "open_day",
            status: "upcoming"
        },
        {
            id: 2,
            title: "Computer Science Workshop",
            date: new Date(currentYear, currentMonth, currentDate.getDate() + 2).toISOString(),
            type: "workshop",
            status: "upcoming"
        },
        {
            id: 3,
            title: "STEM Faculty Interviews",
            date: new Date(currentYear, currentMonth, currentDate.getDate() + 7).toISOString(),
            type: "interview",
            status: "upcoming"
        },
        {
            id: 4,
            title: "International Students Orientation",
            date: new Date(currentYear, currentMonth, currentDate.getDate() + 10).toISOString(),
            type: "open_day",
            status: "upcoming"
        },
        {
            id: 5,
            title: "Scholarship Application Deadline",
            date: new Date(currentYear, currentMonth, currentDate.getDate() + 15).toISOString(),
            type: "deadline",
            status: "upcoming"
        },
        {
            id: 6,
            title: "Summer Research Program Info Session",
            date: new Date(currentYear, currentMonth, currentDate.getDate() + 8).toISOString(),
            type: "workshop",
            status: "upcoming"
        }
    ];

    // Hardcoded recent applications data
    const hardcodedApplications: Application[] = [
        {
            id: 1,
            student_name: "Emma Johnson",
            program: "Computer Science BSc",
            status: "pending",
            submitted_at: new Date(currentYear, currentMonth, currentDate.getDate() - 2).toISOString(),
            match_percentage: 87
        },
        {
            id: 2,
            student_name: "Liam Garcia",
            program: "Mechanical Engineering MSc",
            status: "reviewed",
            submitted_at: new Date(currentYear, currentMonth, currentDate.getDate() - 5).toISOString(),
            match_percentage: 92
        },
        {
            id: 3,
            student_name: "Olivia Martinez",
            program: "Business Administration MBA",
            status: "accepted",
            submitted_at: new Date(currentYear, currentMonth, currentDate.getDate() - 7).toISOString(),
            match_percentage: 95
        },
        {
            id: 4,
            student_name: "Noah Rodriguez",
            program: "Data Science MSc",
            status: "rejected",
            submitted_at: new Date(currentYear, currentMonth, currentDate.getDate() - 10).toISOString(),
            match_percentage: 65
        },
        {
            id: 5,
            student_name: "Sophia Thompson",
            program: "Architecture BSc",
            status: "pending",
            submitted_at: new Date(currentYear, currentMonth, currentDate.getDate() - 3).toISOString(),
            match_percentage: 82
        }
    ];

    // Hardcoded statistics data
    const hardcodedStats: UniversityStats = {
        total_applications: 432,
        pending_applications: 85,
        accepted_applications: 267,
        rejected_applications: 80,
        average_match_percentage: 78,
        top_programs: ["Computer Science", "Business Administration", "Mechanical Engineering", "Psychology", "Medicine"]
    };

    // Use hardcoded data instead of the passed props
    const displayUniversity = hardcodedUniversity;
    const displayEvents = hardcodedEvents.length > 0 ? hardcodedEvents : upcoming_events;
    const displayApplications = hardcodedApplications.length > 0 ? hardcodedApplications : recent_applications;
    const displayStats = hardcodedStats.total_applications > 0 ? hardcodedStats : stats;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation Bar */}
            <Navigation 
                auth={auth} 
                isUniversityAdmin={true}
            />

            <Head title="University Dashboard" />
            
            {/* Notification Banner */}
            {showNotification && (
                <div className="bg-[#9A2D2D] bg-opacity-10 py-3">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between flex-wrap">
                            <div className="w-0 flex-1 flex items-center">
                                <span className="flex p-2 rounded-lg bg-[#9A2D2D] bg-opacity-20">
                                    <FireIcon className="h-6 w-6 text-[#9A2D2D]" />
                                </span>
                                <p className="ml-3 font-medium text-[#9A2D2D] truncate">
                                    <span className="md:hidden">You have 5 new applications to review!</span>
                                    <span className="hidden md:inline">Important! You have 5 new student applications that require your review.</span>
                                </p>
                            </div>
                            <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
                                <Link
                                    href="/university/applications"
                                    className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#9A2D2D] hover:bg-[#822626]"
                                >
                                    View applications
                                </Link>
                            </div>
                            <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
                                <button
                                    type="button"
                                    onClick={() => setShowNotification(false)}
                                    className="-mr-1 flex p-2 rounded-md hover:bg-[#9A2D2D] hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2"
                                >
                                    <span className="sr-only">Dismiss</span>
                                    <XMarkIcon className="h-6 w-6 text-[#9A2D2D]" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">Welcome, {auth.user.name}!</h1>
                    <p className="mt-1 text-sm text-gray-600">
                        Manage your university profile and applications
                    </p>
                </div>

                {/* Main Dashboard Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column - University Profile & Stats */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* University Profile Card */}
                        <div className="bg-white rounded-xl shadow-md overflow-hidden">
                            <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
                                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                                    <BuildingLibraryIcon className="h-5 w-5 mr-2 text-[#9A2D2D]" />
                                    University Profile
                                </h2>
                                <Link 
                                    href={`/university/profile/${displayUniversity.id}`} 
                                    className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#9A2D2D]"
                                >
                                    Edit Profile
                                </Link>
                            </div>
                            <div className="px-6 py-5">
                                <div className="flex flex-col md:flex-row md:items-center">
                                    <div className="flex-shrink-0 flex justify-center mb-4 md:mb-0">
                                        <img 
                                            src={displayUniversity.logo || displayUniversity.image} 
                                            alt={displayUniversity.university_name}
                                            className="h-32 w-32 object-contain"
                                        />
                                    </div>
                                    <div className="md:ml-6 flex-1">
                                        <h3 className="text-xl font-bold text-gray-900">{displayUniversity.university_name}</h3>
                                        <div className="mt-1 flex items-center">
                                            <span className="text-sm text-gray-500">{displayUniversity.city}</span>
                                        </div>
                                        <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                                            {displayUniversity.description}
                                        </p>
                                        <div className="mt-4 flex flex-wrap gap-2">
                                            {displayUniversity.branches_offered.map((branch, index) => (
                                                <span 
                                                    key={index}
                                                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                                                >
                                                    {branch}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Statistics Overview */}
                        <div className="bg-white rounded-xl shadow-md overflow-hidden">
                            <div className="px-6 py-5 border-b border-gray-200">
                                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                                    <ChartBarIcon className="h-5 w-5 mr-2 text-[#9A2D2D]" />
                                    Application Statistics
                                </h2>
                            </div>
                            <div className="px-6 py-5">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <div className="text-2xl font-bold text-[#9A2D2D]">{displayStats.total_applications}</div>
                                        <div className="text-sm text-gray-600">Total Applications</div>
                                    </div>
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <div className="text-2xl font-bold text-yellow-600">{displayStats.pending_applications}</div>
                                        <div className="text-sm text-gray-600">Pending Review</div>
                                    </div>
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <div className="text-2xl font-bold text-green-600">{displayStats.accepted_applications}</div>
                                        <div className="text-sm text-gray-600">Accepted</div>
                                    </div>
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <div className="text-2xl font-bold text-red-600">{displayStats.rejected_applications}</div>
                                        <div className="text-sm text-gray-600">Rejected</div>
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <h3 className="text-sm font-medium text-gray-900 mb-2">Top Programs</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {displayStats?.top_programs?.map((program, index) => (
                                            <span 
                                                key={index}
                                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
                                            >
                                                {program}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recent Applications */}
                        <div className="bg-white rounded-xl shadow-md overflow-hidden">
                            <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
                                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                                    <ClipboardDocumentListIcon className="h-5 w-5 mr-2 text-[#9A2D2D]" />
                                    Recent Applications
                                </h2>
                                <Link 
                                    href="/university/applications" 
                                    className="text-sm font-medium text-[#9A2D2D] hover:text-[#822626]"
                                >
                                    View All
                                </Link>
                            </div>
                            <div className="px-6 py-5">
                                <div className="space-y-4">
                                    {displayApplications.map((application) => (
                                        <div key={application.id} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg border border-gray-100">
                                            <div className="flex items-center space-x-4">
                                                <div className="flex-shrink-0">
                                                    <UserCircleIcon className="h-10 w-10 text-gray-400" />
                                                </div>
                                                <div>
                                                    <h3 className="text-sm font-medium text-gray-900">{application.student_name}</h3>
                                                    <p className="text-sm text-gray-500">{application.program}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-4">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                    application.status === 'accepted' ? 'bg-green-100 text-green-800' :
                                                    application.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                                    application.status === 'reviewed' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-gray-100 text-gray-800'
                                                }`}>
                                                    {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                                                </span>
                                                <span className="text-sm text-gray-500">
                                                    {new Date(application.submitted_at).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Calendar & Quick Actions */}
                    <div className="space-y-6">
                        {/* Calendar */}
                        <div className="bg-white rounded-xl shadow-md overflow-hidden">
                            <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
                                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                                    <CalendarIcon className="h-5 w-5 mr-2 text-[#9A2D2D]" />
                                    Upcoming Events
                                </h2>
                                <div className="flex space-x-2">
                                    <button 
                                        onClick={() => {
                                            const newDate = new Date(currentDate);
                                            newDate.setMonth(newDate.getMonth() - 1);
                                            setCurrentDate(newDate);
                                        }}
                                        className="p-1 rounded-full hover:bg-gray-100"
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
                                    >
                                        <ChevronRightIcon className="h-5 w-5 text-gray-600" />
                                    </button>
                                </div>
                            </div>
                            <div className="px-6 py-5">
                                <div className="space-y-4">
                                    {displayEvents.map((event) => (
                                        <div key={event.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg border border-gray-100">
                                            <div>
                                                <h3 className="text-sm font-medium text-gray-900">{event.title}</h3>
                                                <p className="text-sm text-gray-500">
                                                    {new Date(event.date).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                event.type === 'open_day' ? 'bg-blue-100 text-blue-800' :
                                                event.type === 'workshop' ? 'bg-purple-100 text-purple-800' :
                                                event.type === 'interview' ? 'bg-yellow-100 text-yellow-800' :
                                                event.type === 'deadline' ? 'bg-red-100 text-red-800' :
                                                'bg-gray-100 text-gray-800'
                                            }`}>
                                                {event.type.replace('_', ' ').charAt(0).toUpperCase() + event.type.replace('_', ' ').slice(1)}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-white rounded-xl shadow-md overflow-hidden">
                            <div className="px-6 py-5 border-b border-gray-200">
                                <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
                            </div>
                            <div className="px-6 py-5">
                                <nav className="space-y-1">
                                    <Link
                                        href="/university/applications"
                                        className="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:text-[#9A2D2D] hover:bg-gray-50"
                                    >
                                        <ClipboardDocumentListIcon className="flex-shrink-0 mr-3 h-5 w-5 text-gray-400 group-hover:text-[#9A2D2D]" />
                                        <span className="truncate">Review Applications</span>
                                    </Link>
                                    <Link
                                        href="/university/events"
                                        className="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:text-[#9A2D2D] hover:bg-gray-50"
                                    >
                                        <CalendarIcon className="flex-shrink-0 mr-3 h-5 w-5 text-gray-400 group-hover:text-[#9A2D2D]" />
                                        <span className="truncate">Manage Events</span>
                                    </Link>
                                    <Link
                                        href="/university/programs"
                                        className="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:text-[#9A2D2D] hover:bg-gray-50"
                                    >
                                        <AcademicCapIcon className="flex-shrink-0 mr-3 h-5 w-5 text-gray-400 group-hover:text-[#9A2D2D]" />
                                        <span className="truncate">Manage Programs</span>
                                    </Link>
                                    <Link
                                        href="/university/analytics"
                                        className="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:text-[#9A2D2D] hover:bg-gray-50"
                                    >
                                        <ChartBarIcon className="flex-shrink-0 mr-3 h-5 w-5 text-gray-400 group-hover:text-[#9A2D2D]" />
                                        <span className="truncate">View Analytics</span>
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
