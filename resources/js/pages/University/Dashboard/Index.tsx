import React from 'react';
import { Head } from '@inertiajs/react';
import { 
    BuildingLibraryIcon,
    UserGroupIcon,
    CalendarIcon,
    AcademicCapIcon,
    ChartBarIcon
} from '@heroicons/react/24/outline';
import Navigation from '@/components/Navigation';

interface DashboardMetrics {
    total_applications: number;
    pending_applications: number;
    total_events: number;
    upcoming_events: number;
    total_programs: number;
    active_programs: number;
}

interface UniversityDashboardProps {
    auth: {
        user: {
            name: string;
            email: string;
            profile_photo_url?: string;
        };
    };
    metrics?: DashboardMetrics;
}

export default function UniversityDashboard({ auth, metrics }: UniversityDashboardProps) {
    // Use default values if metrics are not provided
    const dashboardMetrics = metrics || {
        total_applications: 0,
        pending_applications: 0,
        total_events: 0,
        upcoming_events: 0,
        total_programs: 0,
        active_programs: 0
    };
    
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation Bar */}
            <Navigation 
                auth={auth} 
                currentPage="university-dashboard"
                isUniversityAdmin={true}
            />

            <Head title="University Dashboard" />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">University Dashboard</h1>
                    <p className="mt-1 text-sm text-gray-600">
                        Manage your university profile, applications, events, and programs
                    </p>
                </div>

                {/* Dashboard Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {/* Applications Stats */}
                    <div className="bg-white rounded-xl shadow-md overflow-hidden">
                        <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
                            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                                <UserGroupIcon className="h-5 w-5 mr-2 text-[#9A2D2D]" />
                                Applications
                            </h2>
                        </div>
                        <div className="p-6">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">{dashboardMetrics.pending_applications}</p>
                                    <p className="text-sm text-gray-500">Pending Applications</p>
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">{dashboardMetrics.total_applications}</p>
                                    <p className="text-sm text-gray-500">Total Applications</p>
                                </div>
                            </div>
                            <div className="mt-4">
                                <a 
                                    href="/university/applications" 
                                    className="text-sm font-medium text-[#9A2D2D] hover:text-[#822626]"
                                >
                                    View All Applications →
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Events Stats */}
                    <div className="bg-white rounded-xl shadow-md overflow-hidden">
                        <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
                            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                                <CalendarIcon className="h-5 w-5 mr-2 text-[#9A2D2D]" />
                                Events
                            </h2>
                        </div>
                        <div className="p-6">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">{dashboardMetrics.upcoming_events}</p>
                                    <p className="text-sm text-gray-500">Upcoming Events</p>
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">{dashboardMetrics.total_events}</p>
                                    <p className="text-sm text-gray-500">Total Events</p>
                                </div>
                            </div>
                            <div className="mt-4">
                                <a 
                                    href="/university/events" 
                                    className="text-sm font-medium text-[#9A2D2D] hover:text-[#822626]"
                                >
                                    View All Events →
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Programs Stats */}
                    <div className="bg-white rounded-xl shadow-md overflow-hidden">
                        <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
                            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                                <AcademicCapIcon className="h-5 w-5 mr-2 text-[#9A2D2D]" />
                                Programs
                            </h2>
                        </div>
                        <div className="p-6">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">{dashboardMetrics.active_programs}</p>
                                    <p className="text-sm text-gray-500">Active Programs</p>
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">{dashboardMetrics.total_programs}</p>
                                    <p className="text-sm text-gray-500">Total Programs</p>
                                </div>
                            </div>
                            <div className="mt-4">
                                <a 
                                    href="/university/programs" 
                                    className="text-sm font-medium text-[#9A2D2D] hover:text-[#822626]"
                                >
                                    View All Programs →
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Activities Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recent Applications */}
                    <div className="bg-white rounded-xl shadow-md overflow-hidden">
                        <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
                            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                                <UserGroupIcon className="h-5 w-5 mr-2 text-[#9A2D2D]" />
                                Recent Applications
                            </h2>
                            <a 
                                href="/university/applications" 
                                className="text-sm font-medium text-[#9A2D2D] hover:text-[#822626]"
                            >
                                View All
                            </a>
                        </div>
                        <div className="p-6">
                            <div className="text-center py-6">
                                <UserGroupIcon className="h-12 w-12 text-gray-400 mx-auto" />
                                <h3 className="mt-2 text-sm font-medium text-gray-900">No Recent Applications</h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    New applications will appear here as they come in.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Upcoming Events */}
                    <div className="bg-white rounded-xl shadow-md overflow-hidden">
                        <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
                            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                                <CalendarIcon className="h-5 w-5 mr-2 text-[#9A2D2D]" />
                                Upcoming Events
                            </h2>
                            <a 
                                href="/university/events" 
                                className="text-sm font-medium text-[#9A2D2D] hover:text-[#822626]"
                            >
                                View All
                            </a>
                        </div>
                        <div className="p-6">
                            <div className="text-center py-6">
                                <CalendarIcon className="h-12 w-12 text-gray-400 mx-auto" />
                                <h3 className="mt-2 text-sm font-medium text-gray-900">No Upcoming Events</h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    Schedule events to appear here.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="mt-8 bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="px-6 py-5 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
                    </div>
                    <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                        <a 
                            href="/university/applications"
                            className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            <UserGroupIcon className="h-8 w-8 text-[#9A2D2D]" />
                            <span className="mt-2 text-sm font-medium text-gray-900">Manage Applications</span>
                        </a>
                        <a 
                            href="/university/events/create"
                            className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            <CalendarIcon className="h-8 w-8 text-[#9A2D2D]" />
                            <span className="mt-2 text-sm font-medium text-gray-900">Create Event</span>
                        </a>
                        <a 
                            href="/university/programs/create"
                            className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            <AcademicCapIcon className="h-8 w-8 text-[#9A2D2D]" />
                            <span className="mt-2 text-sm font-medium text-gray-900">Add Program</span>
                        </a>
                        <a 
                            href="/university/analytics"
                            className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            <ChartBarIcon className="h-8 w-8 text-[#9A2D2D]" />
                            <span className="mt-2 text-sm font-medium text-gray-900">View Analytics</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
} 