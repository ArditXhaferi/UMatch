import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import { 
    UserGroupIcon,
    MagnifyingGlassIcon,
    AdjustmentsHorizontalIcon,
    ChevronDownIcon,
    ChevronUpIcon,
    EyeIcon,
    CheckCircleIcon,
    XCircleIcon
} from '@heroicons/react/24/outline';
import Navigation from '@/components/Navigation';

interface Application {
    id: number;
    student_name: string;
    program: string;
    status: 'pending' | 'approved' | 'rejected' | 'reviewing';
    applied_date: string;
    student_email?: string;
    student_documents?: string[];
}

interface ApplicationsProps {
    auth: {
        user: {
            name: string;
            email: string;
            profile_photo_url?: string;
        };
    };
    applications?: Application[];
}

export default function UniversityApplications({ auth, applications = [] }: ApplicationsProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [sortBy, setSortBy] = useState<'date' | 'name' | 'program'>('date');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
    
    // Filter and sort applications
    const filteredApplications = applications.filter(app => {
        // Apply search filter
        const matchesSearch = searchTerm === '' || 
            app.student_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.program.toLowerCase().includes(searchTerm.toLowerCase());
        
        // Apply status filter
        const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
        
        return matchesSearch && matchesStatus;
    }).sort((a, b) => {
        // Apply sorting
        let comparison = 0;
        
        switch (sortBy) {
            case 'date':
                comparison = new Date(a.applied_date).getTime() - new Date(b.applied_date).getTime();
                break;
            case 'name':
                comparison = a.student_name.localeCompare(b.student_name);
                break;
            case 'program':
                comparison = a.program.localeCompare(b.program);
                break;
        }
        
        // Reverse if descending order
        return sortOrder === 'desc' ? -comparison : comparison;
    });
    
    // Toggle sort order
    const toggleSort = (column: 'date' | 'name' | 'program') => {
        if (sortBy === column) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(column);
            setSortOrder('asc');
        }
    };
    
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation Bar */}
            <Navigation 
                auth={auth} 
                currentPage="university-applications"
                isUniversityAdmin={true}
            />

            <Head title="Applications" />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">Applications</h1>
                    <p className="mt-1 text-sm text-gray-600">
                        Manage and review student applications to your university programs
                    </p>
                </div>

                {/* Filters and Search */}
                <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Search Box */}
                        <div className="flex-1 relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-[#9A2D2D] focus:border-[#9A2D2D] sm:text-sm"
                                placeholder="Search by student name or program..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        
                        {/* Status Filter */}
                        <div className="md:w-48">
                            <select
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#9A2D2D] focus:border-[#9A2D2D] sm:text-sm"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                <option value="all">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="reviewing">Reviewing</option>
                                <option value="approved">Approved</option>
                                <option value="rejected">Rejected</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Applications Table */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
                        <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                            <UserGroupIcon className="h-5 w-5 mr-2 text-[#9A2D2D]" />
                            Applications
                        </h2>
                        <span className="text-sm text-gray-600">
                            {filteredApplications.length} {filteredApplications.length === 1 ? 'application' : 'applications'}
                        </span>
                    </div>
                    
                    {filteredApplications.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            <button 
                                                className="group inline-flex items-center"
                                                onClick={() => toggleSort('name')}
                                            >
                                                Student
                                                <span className="ml-1 flex-none rounded text-gray-400">
                                                    {sortBy === 'name' 
                                                        ? (sortOrder === 'desc' ? <ChevronDownIcon className="h-4 w-4" /> : <ChevronUpIcon className="h-4 w-4" />)
                                                        : <ChevronDownIcon className="h-4 w-4 opacity-0 group-hover:opacity-100" />
                                                    }
                                                </span>
                                            </button>
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            <button 
                                                className="group inline-flex items-center"
                                                onClick={() => toggleSort('program')}
                                            >
                                                Program
                                                <span className="ml-1 flex-none rounded text-gray-400">
                                                    {sortBy === 'program' 
                                                        ? (sortOrder === 'desc' ? <ChevronDownIcon className="h-4 w-4" /> : <ChevronUpIcon className="h-4 w-4" />)
                                                        : <ChevronDownIcon className="h-4 w-4 opacity-0 group-hover:opacity-100" />
                                                    }
                                                </span>
                                            </button>
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            <button 
                                                className="group inline-flex items-center"
                                                onClick={() => toggleSort('date')}
                                            >
                                                Applied Date
                                                <span className="ml-1 flex-none rounded text-gray-400">
                                                    {sortBy === 'date' 
                                                        ? (sortOrder === 'desc' ? <ChevronDownIcon className="h-4 w-4" /> : <ChevronUpIcon className="h-4 w-4" />)
                                                        : <ChevronDownIcon className="h-4 w-4 opacity-0 group-hover:opacity-100" />
                                                    }
                                                </span>
                                            </button>
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredApplications.map((application) => (
                                        <tr key={application.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-gray-100 rounded-full">
                                                        <span className="text-sm font-medium text-gray-700">
                                                            {application.student_name.charAt(0)}
                                                        </span>
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">{application.student_name}</div>
                                                        {application.student_email && (
                                                            <div className="text-sm text-gray-500">{application.student_email}</div>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{application.program}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                    application.status === 'approved' ? 'bg-green-100 text-green-800' :
                                                    application.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                                    application.status === 'reviewing' ? 'bg-blue-100 text-blue-800' :
                                                    'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                    {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {new Date(application.applied_date).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex justify-end space-x-2">
                                                    <button
                                                        title="View Details"
                                                        className="text-[#9A2D2D] hover:text-[#822626] p-1"
                                                    >
                                                        <EyeIcon className="h-5 w-5" />
                                                    </button>
                                                    {application.status === 'pending' || application.status === 'reviewing' ? (
                                                        <>
                                                            <button
                                                                title="Approve"
                                                                className="text-green-600 hover:text-green-800 p-1"
                                                            >
                                                                <CheckCircleIcon className="h-5 w-5" />
                                                            </button>
                                                            <button
                                                                title="Reject"
                                                                className="text-red-600 hover:text-red-800 p-1"
                                                            >
                                                                <XCircleIcon className="h-5 w-5" />
                                                            </button>
                                                        </>
                                                    ) : null}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <UserGroupIcon className="mx-auto h-12 w-12 text-gray-400" />
                            <h3 className="mt-2 text-sm font-medium text-gray-900">No applications found</h3>
                            <p className="mt-1 text-sm text-gray-500">
                                {searchTerm || statusFilter !== 'all' 
                                    ? 'Try adjusting your filters to see more applications.' 
                                    : 'No applications have been submitted yet.'}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
} 