import React from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

export default function UniversityEvents() {
    return (
        <AppLayout>
            <Head title="University Events" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-semibold">Events</h2>
                                <button className="bg-[#9A2D2D] text-white px-4 py-2 rounded-md hover:bg-opacity-90">
                                    Create Event
                                </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {/* Event Card Placeholder */}
                                <div className="border rounded-lg p-4">
                                    <p className="text-gray-500 text-center">No events found</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
} 