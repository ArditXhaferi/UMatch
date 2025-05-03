import React from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

export default function UniversityAnalytics() {
    return (
        <AppLayout>
            <Head title="University Analytics" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h2 className="text-2xl font-semibold mb-6">Analytics Dashboard</h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                                {/* Key Metrics */}
                                <div className="bg-[#9A2D2D] bg-opacity-10 p-4 rounded-lg">
                                    <h3 className="text-lg font-medium mb-2">Total Applications</h3>
                                    <p className="text-2xl font-bold">0</p>
                                </div>
                                <div className="bg-[#9A2D2D] bg-opacity-10 p-4 rounded-lg">
                                    <h3 className="text-lg font-medium mb-2">Acceptance Rate</h3>
                                    <p className="text-2xl font-bold">0%</p>
                                </div>
                                <div className="bg-[#9A2D2D] bg-opacity-10 p-4 rounded-lg">
                                    <h3 className="text-lg font-medium mb-2">Active Programs</h3>
                                    <p className="text-2xl font-bold">0</p>
                                </div>
                                <div className="bg-[#9A2D2D] bg-opacity-10 p-4 rounded-lg">
                                    <h3 className="text-lg font-medium mb-2">Total Events</h3>
                                    <p className="text-2xl font-bold">0</p>
                                </div>
                            </div>

                            {/* Charts Placeholder */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h3 className="text-lg font-medium mb-4">Applications Over Time</h3>
                                    <div className="h-64 flex items-center justify-center">
                                        <p className="text-gray-500">Chart will be displayed here</p>
                                    </div>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h3 className="text-lg font-medium mb-4">Program Distribution</h3>
                                    <div className="h-64 flex items-center justify-center">
                                        <p className="text-gray-500">Chart will be displayed here</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
} 