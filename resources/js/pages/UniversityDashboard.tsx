import React, { useState, useCallback, useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
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
    StarIcon,
    DocumentArrowUpIcon,
    XMarkIcon,
    DocumentIcon,
    AcademicCapIcon,
    ChartBarIcon,
    ClipboardDocumentListIcon
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

interface UniversityMatch {
    id: number;
    university_name: string;
    city: string;
    description: string;
    website: string;
    logo: string;
    image: string;
    branches_offered: string[];
    qualities_sought: string[];
    match_percentage: number;
}

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

interface LoadingPopupProps {
    isOpen: boolean;
    progress: number;
    state: 'uploading' | 'processing' | 'success' | 'error';
    onClose?: () => void;
}

const LoadingPopup: React.FC<LoadingPopupProps> = ({ isOpen, progress, state, onClose }) => {
    const [loadingMessage, setLoadingMessage] = useState('');
    const [currentVideo, setCurrentVideo] = useState(0);
    const [videoError, setVideoError] = useState(false);
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);

    const loadingMessages = [
        "Bashkim is putting on his thinking cap... 🧢",
        "Bashkim is analyzing your academic superpowers... 💪",
        "Bashkim is searching for the perfect university match... 🏫",
        "Bashkim is doing some bear-y important calculations... 🧮",
        "Bashkim is checking his university database... 📚",
        "Bashkim is making sure everything is just right... ✨",
        "Bashkim is double-checking his bear-ometer... 📊",
        "Bashkim is consulting with his academic advisors... 👨‍🏫",
        "Bashkim is mapping out your future success... 🗺️",
        "Bashkim is putting the finishing touches... 🎨"
    ];

    const videos = [
        '/videos/cap-shirt.mp4',
        '/videos/sad-shirt.mp4',
        '/videos/waving shirt.mp4',
        '/videos/celebrating.mp4'
    ];

    useEffect(() => {
        let messageInterval: NodeJS.Timeout;
        let videoInterval: NodeJS.Timeout;

        if (isOpen && (state === 'uploading' || state === 'processing')) {
            // Change message every 3 seconds
            messageInterval = setInterval(() => {
                setLoadingMessage(loadingMessages[Math.floor(Math.random() * loadingMessages.length)]);
            }, 3000);

            // Change video every 4 seconds
            videoInterval = setInterval(() => {
                setCurrentVideo((prev) => (prev + 1) % videos.length);
                setIsVideoLoaded(false);
            }, 4000);
        }

        return () => {
            clearInterval(messageInterval);
            clearInterval(videoInterval);
        };
    }, [isOpen, state]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="relative bg-white rounded-2xl p-8 max-w-md w-full mx-4 pt-28 overflow-visible">
                {/* Video Circle - half above the popup */}
                <div className="absolute left-1/2 -top-24 -translate-x-1/2 w-48 h-48 rounded-full overflow-hidden border-2 border-[#9A2D2D] shadow-lg z-10 bg-white">
                    {!videoError ? (
                        <>
                            <video
                                key={videos[currentVideo]}
                                src={videos[currentVideo]}
                                autoPlay
                                loop
                                muted
                                playsInline
                                preload="auto"
                                className={`w-full h-full object-cover transition-opacity duration-300 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
                                onError={() => setVideoError(true)}
                                onLoadedData={() => {
                                    setIsVideoLoaded(true);
                                    setVideoError(false);
                                }}
                            />
                            {!isVideoLoaded && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-8 h-8 border-4 border-[#9A2D2D] border-t-transparent rounded-full animate-spin" />
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <DocumentArrowUpIcon className="w-12 h-12 text-[#9A2D2D]" />
                        </div>
                    )}
                </div>
                <div className="text-center space-y-6">
                    {/* Loading Message */}
                    <div className="space-y-4">
                        <p className="text-lg font-medium text-[#9A2D2D] animate-fade-in-out">
                            {loadingMessage}
                        </p>

                        {/* Progress Bar */}
                        <div className="relative pt-1">
                            <div className="flex mb-2 items-center justify-between">
                                <div>
                                    <span className="text-xs font-semibold inline-block py-1 px-3 uppercase rounded-full text-white bg-[#9A2D2D] bg-opacity-10">
                                        {state === 'uploading' ? 'Uploading...' : 'Processing...'}
                                    </span>
                                </div>
                                <div className="text-right">
                                    <span className="text-xs font-semibold inline-block text-[#9A2D2D]">
                                        {Math.round(progress)}%
                                    </span>
                                </div>
                            </div>
                            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-[#9A2D2D] bg-opacity-10">
                                <div
                                    style={{ width: `${progress}%` }}
                                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#9A2D2D] transition-all duration-500 rounded-full"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Close Button */}
                    {onClose && (
                        <button
                            onClick={onClose}
                            className="mt-4 text-sm text-gray-500 hover:text-gray-700"
                        >
                            Close
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

const FileUpload: React.FC = () => {
    const [isDragging, setIsDragging] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [processingState, setProcessingState] = useState<'idle' | 'uploading' | 'processing' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');
    const [showPopup, setShowPopup] = useState(false);

    const { data, setData, post, processing } = useForm({
        files: [] as File[],
    });

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        
        const droppedFiles = Array.from(e.dataTransfer.files);
        setData('files', [...data.files, ...droppedFiles]);
    }, [data.files, setData]);

    const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFiles = Array.from(e.target.files);
            setData('files', [...data.files, ...selectedFiles]);
        }
    }, [data.files, setData]);

    const removeFile = useCallback((index: number) => {
        const newFiles = [...data.files];
        newFiles.splice(index, 1);
        setData('files', newFiles);
    }, [data.files, setData]);

    const handleUpload = useCallback(() => {
        setProcessingState('uploading');
        setUploadProgress(0);
        setErrorMessage('');
        setShowPopup(true);

        const formData = new FormData();
        data.files.forEach((file) => {
            formData.append('files[]', file);
        });

        post('/upload', {
            onProgress: (progress) => {
                if (progress?.percentage) {
                    setUploadProgress(progress.percentage);
                }
            },
            onSuccess: () => {
                setProcessingState('success');
                setTimeout(() => {
                    setShowPopup(false);
                }, 2000);
            },
            onError: (errors) => {
                setProcessingState('error');
                setErrorMessage(errors.message || 'Failed to upload files');
                setShowPopup(false);
            },
        });
    }, [data.files, post]);

    return (
        <>
            <div className="space-y-6">
                <div className="text-center">
                    <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 bg-[#9A2D2D] bg-opacity-10 rounded-full flex items-center justify-center">
                            <DocumentArrowUpIcon className="w-8 h-8 text-white" />
                        </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Ready to Begin Your Journey?</h3>
                    <p className="mt-2 text-sm text-gray-600">
                        Drop your academic records and let's find your perfect match!
                    </p>
                </div>

                <div
                    className={`flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-xl transition-all duration-300 ${
                        isDragging ? 'border-[#9A2D2D] bg-[#9A2D2D] bg-opacity-5' : 'border-gray-300'
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    <div className="space-y-3 text-center">
                        <div className="flex justify-center">
                            <div className="w-12 h-12 bg-[#9A2D2D] bg-opacity-10 rounded-full flex items-center justify-center">
                                <DocumentArrowUpIcon className="w-6 h-6 text-white" />
                            </div>
                        </div>
                        <div className="flex text-sm text-gray-600">
                            <label className="relative cursor-pointer bg-white rounded-md px-4 py-2 font-medium text-[#9A2D2D] hover:text-white focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#9A2D2D] transition-all duration-300 hover:bg-[#9A2D2D] hover:bg-opacity-5">
                                <span>Choose Files</span>
                                <input
                                    type="file"
                                    className="sr-only"
                                    multiple
                                    accept=".pdf,.jpg,.jpeg,.png"
                                    onChange={handleFileSelect}
                                />
                            </label>
                            <p className="pl-3 self-center">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PDF, JPG, PNG up to 10MB</p>
                    </div>
                </div>

                {data.files.length > 0 && (
                    <div className="mt-4">
                        <div className="space-y-2">
                            {data.files.map((file, index) => (
                                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 bg-[#9A2D2D] bg-opacity-10 rounded-full flex items-center justify-center">
                                            <DocumentIcon className="w-5 h-5 text-[#9A2D2D]" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{file.name}</p>
                                            <p className="text-xs text-gray-500">{Math.round(file.size / 1024)} KB</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => removeFile(index)}
                                        className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                                    >
                                        <XMarkIcon className="w-5 h-5" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {errorMessage && (
                    <div className="mt-4 p-4 bg-red-50 rounded-xl">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <XMarkIcon className="h-5 w-5 text-red-400" />
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-red-700">{errorMessage}</p>
                            </div>
                        </div>
                    </div>
                )}

                {data.files.length > 0 && !processing && (
                    <div className="mt-6">
                        <button
                            onClick={handleUpload}
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#9A2D2D] hover:bg-[#822626] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#9A2D2D] transition-all duration-300"
                        >
                            Let's Find Your Match! 🚀
                        </button>
                    </div>
                )}
            </div>
            <LoadingPopup
                isOpen={showPopup}
                progress={uploadProgress}
                state={processingState === 'idle' ? 'uploading' : processingState}
                onClose={() => setShowPopup(false)}
            />
        </>
    );
};

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
    
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation Bar */}
            <Navigation 
                auth={auth} 
                isUniversityAdmin={true}
            />

            <Head title="University Dashboard" />
            
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
                                    href={`/university/profile/${university.id}`} 
                                    className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#9A2D2D]"
                                >
                                    Edit Profile
                                </Link>
                            </div>
                            <div className="px-6 py-5">
                                <div className="flex flex-col md:flex-row md:items-center">
                                    <div className="flex-shrink-0 flex justify-center mb-4 md:mb-0">
                                        <img 
                                            src={university.logo || university.image} 
                                            alt={university.university_name}
                                            className="h-32 w-32 object-contain"
                                        />
                                    </div>
                                    <div className="md:ml-6 flex-1">
                                        <h3 className="text-xl font-bold text-gray-900">{university.university_name}</h3>
                                        <div className="mt-1 flex items-center">
                                            <span className="text-sm text-gray-500">{university.city}</span>
                                        </div>
                                        <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                                            {university.description}
                                        </p>
                                        <div className="mt-4 flex flex-wrap gap-2">
                                            {university.branches_offered.map((branch, index) => (
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
                                        <div className="text-2xl font-bold text-[#9A2D2D]">{stats.total_applications}</div>
                                        <div className="text-sm text-gray-600">Total Applications</div>
                                    </div>
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <div className="text-2xl font-bold text-yellow-600">{stats.pending_applications}</div>
                                        <div className="text-sm text-gray-600">Pending Review</div>
                                    </div>
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <div className="text-2xl font-bold text-green-600">{stats.accepted_applications}</div>
                                        <div className="text-sm text-gray-600">Accepted</div>
                                    </div>
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <div className="text-2xl font-bold text-red-600">{stats.rejected_applications}</div>
                                        <div className="text-sm text-gray-600">Rejected</div>
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <h3 className="text-sm font-medium text-gray-900 mb-2">Top Programs</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {stats?.top_programs?.map((program, index) => (
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
                                    {recent_applications.map((application) => (
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
                                    {upcoming_events.map((event) => (
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
                                                'bg-gray-100 text-gray-800'
                                            }`}>
                                                {event.type.replace('_', ' ').charAt(0).toUpperCase() + event.type.slice(1)}
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
