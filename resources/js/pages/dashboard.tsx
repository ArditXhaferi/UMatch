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
    DocumentIcon
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
        analysis?: {
            learning_style: string;
            archetype_scores: Record<string, number>;
            study_techniques: string[];
            type_description: string;
            recommended_majors: string[];
        };
    } | null;
    quests?: QuestType[];
    deadlines?: DeadlineType[];
    universityMatches?: UniversityMatch[];
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

export default function Dashboard({ auth, studentProfile, quests = [], deadlines = [], universityMatches = [] }: DashboardProps) {
    // Add debugging logs
    console.log('Dashboard Props:', {
        auth,
        studentProfile,
        quests,
        deadlines,
        universityMatches
    });
    
    // Add debugging for university matches
    React.useEffect(() => {
        if (studentProfile && Array.isArray(universityMatches)) {
            console.log('University Matches Data:', {
                total: universityMatches.length,
                first_three: universityMatches.slice(0, 3),
                has_student_profile: !!studentProfile,
                has_analysis: studentProfile ? !!studentProfile.analysis : false,
                matches_array_type: typeof universityMatches,
                is_array: Array.isArray(universityMatches),
                first_match: universityMatches[0]
            });
        }
    }, [studentProfile, universityMatches]);
    
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
                isAdmin={false}
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
                        {/* Student Profile Card */}
                        <div className="bg-white rounded-xl shadow-md overflow-hidden">
                            <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
                                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                                    <UserCircleIcon className="h-5 w-5 mr-2 text-[#9A2D2D]" />
                                    Your Learning Profile
                                </h2>
                                {studentProfile && (
                                    <Link 
                                        href={`/profile/${studentProfile.id}`} 
                                        className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#9A2D2D]"
                                    >
                                        View Full Profile
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
                                            </div>
                                            
                                            <div className="mt-4">
                                                <p className="text-sm text-gray-700">
                                                    View your full profile to see your learning style, recommended majors, and personalized university matches.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <FileUpload />
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
                                        {Array.isArray(universityMatches) && universityMatches.length > 0 ? (
                                            universityMatches.slice(0, 3).map((university) => (
                                                <div key={university.id} className="flex items-start p-4 hover:bg-gray-50 rounded-lg cursor-pointer border border-gray-100">
                                                    <div className="flex-shrink-0 bg-[#9A2D2D] bg-opacity-10 rounded-full h-12 w-12 flex items-center justify-center">
                                                        <img 
                                                            src={university.logo || university.image} 
                                                            alt={university.university_name}
                                                            className="h-8 w-8 object-contain"
                                                        />
                                                    </div>
                                                    <div className="ml-4 flex-1">
                                                        <div className="flex justify-between">
                                                            <h3 className="text-base font-medium text-gray-900">{university.university_name}</h3>
                                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                                {university.match_percentage}% match
                                                            </span>
                                                        </div>
                                                        <div className="mt-1 space-y-2">
                                                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                                                                <div 
                                                                    className="bg-[#9A2D2D] h-1.5 rounded-full" 
                                                                    style={{ width: `${university.match_percentage}%` }}
                                                                ></div>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                <span className="text-xs text-gray-500">
                                                                    {Array.isArray(university.branches_offered) ? (
                                                                        <>
                                                                            {university.branches_offered.slice(0, 2).join(', ')}
                                                                            {university.branches_offered.length > 2 ? '...' : ''}
                                                                        </>
                                                                    ) : (
                                                                        'No branches specified'
                                                                    )}
                                                                </span>
                                                                <Link 
                                                                    href={`/universities/${university.id}`} 
                                                                    className="text-xs font-medium text-[#9A2D2D]"
                                                                >
                                                                    View Details
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-center py-8">
                                                <div className="mx-auto h-12 w-12 text-gray-400">
                                                    <BuildingLibraryIcon className="h-12 w-12" />
                                                </div>
                                                <h3 className="mt-2 text-sm font-medium text-gray-900">No Matches Found</h3>
                                                <p className="mt-1 text-sm text-gray-500">
                                                    We couldn't find any university matches for your profile. Try updating your profile or preferences.
                                                </p>
                                            </div>
                                        )}
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
                                                                        event.type === 'workshop' ? 'bg-purple-500' :
                                                                        event.type === 'interview' ? 'bg-yellow-500' :
                                                                        event.type === 'exam' ? 'bg-green-500' :
                                                                        event.type === 'scholarship' ? 'bg-indigo-500' :
                                                                        event.type === 'meeting' ? 'bg-pink-500' :
                                                                        'bg-gray-500'
                                                                    }`}
                                                                    title={`${event.title} (${event.type})`}
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
                                            <span>Application</span>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="w-3 h-3 rounded-full bg-blue-500 mr-1"></div>
                                            <span>Event</span>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="w-3 h-3 rounded-full bg-purple-500 mr-1"></div>
                                            <span>Workshop</span>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="w-3 h-3 rounded-full bg-yellow-500 mr-1"></div>
                                            <span>Interview</span>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
                                            <span>Exam</span>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="w-3 h-3 rounded-full bg-indigo-500 mr-1"></div>
                                            <span>Scholarship</span>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="w-3 h-3 rounded-full bg-pink-500 mr-1"></div>
                                            <span>Meeting</span>
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
                                            <div className="text-3xl font-bold text-[#9A2D2D]">0</div>
                                            <div className="text-xs text-gray-500">Current Streak</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-3xl font-bold text-[#9A2D2D]">0</div>
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
