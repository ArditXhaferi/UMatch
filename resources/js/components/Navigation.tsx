import React from 'react';
import { Link, router } from '@inertiajs/react';
import { StarIcon } from '@heroicons/react/24/outline';

// Avatar Dropdown Component
interface AvatarDropdownProps {
    userName: string;
    archetypeCode?: string;
    hexadType?: string;
    level?: number;
    hasXp?: boolean;
    isUniversityAdmin?: boolean;
}

function AvatarDropdown({ userName, archetypeCode, hexadType, level, hasXp, isUniversityAdmin }: AvatarDropdownProps) {
    const [isOpen, setIsOpen] = React.useState(false);
    const dropdownRef = React.useRef<HTMLDivElement>(null);
    
    // Handle clicking outside of dropdown
    React.useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        
        // Add event listener when dropdown is open
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        
        // Cleanup
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);
    
    return (
        <div className="flex items-center">
            <span className="text-sm text-gray-700 mr-2">{userName}</span>
            <div className="relative" ref={dropdownRef}>
                <button 
                    className="flex rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#9A2D2D]" 
                    onClick={() => setIsOpen(!isOpen)}
                    type="button"
                >
                    {isUniversityAdmin ? (
                        <div className="h-8 w-8 rounded-full bg-[#9A2D2D] flex items-center justify-center text-white font-bold">
                            U
                        </div>
                    ) : (
                        <img 
                            src={`/images/${archetypeCode}.png`}
                            alt={`${hexadType} Character`}
                            className="h-8 w-8 rounded-full object-cover border border-gray-200"
                        />
                    )}
                    {hasXp && !isUniversityAdmin && (
                        <div className="absolute -bottom-1 -right-1 bg-[#9A2D2D] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {level}
                        </div>
                    )}
                </button>
                
                {/* Dropdown Menu */}
                {isOpen && (
                    <div 
                        className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-10"
                    >
                        <Link href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            Settings
                        </Link>
                        {isUniversityAdmin && (
                            <Link href="/university/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                University Profile
                            </Link>
                        )}
                        <button 
                            onClick={() => router.post('/logout')}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                            Sign out
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

interface NavigationProps {
    auth: {
        user: {
            name: string;
            email: string;
            profile_photo_url?: string;
        };
    };
    studentProfile?: {
        id: number;
        hexad_type: string;
        archetype_code: string;
        xp?: number;
        credits?: number;
        school?: string;
    } | null;
    isUniversityAdmin?: boolean;
    currentPage?: 'home' | 'universities' | 'careers' | 'university-dashboard' | 'university-applications' | 'university-events' | 'university-programs' | 'university-analytics' | 'other';
}

export default function Navigation({ 
    auth, 
    studentProfile, 
    isUniversityAdmin = false,
    currentPage = 'other' 
}: NavigationProps) {
    // Calculate current level based on XP
    const currentXp = studentProfile?.xp || 0;
    const currentLevel = Math.floor(currentXp / 100) + 1;
    
    return (
        <nav className="bg-white shadow-sm border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <Link href="/">
                                <span className="text-[#9A2D2D] text-3xl font-bold">UMatch</span>
                            </Link>
                        </div>
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            {isUniversityAdmin ? (
                                <>
                                    <Link 
                                        href="/university/dashboard" 
                                        className={`${currentPage === 'university-dashboard' ? 'border-[#9A2D2D] text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                                    >
                                        Dashboard
                                    </Link>
                                    <Link 
                                        href="/university/applications" 
                                        className={`${currentPage === 'university-applications' ? 'border-[#9A2D2D] text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                                    >
                                        Applications
                                    </Link>
                                    <Link 
                                        href="/university/events" 
                                        className={`${currentPage === 'university-events' ? 'border-[#9A2D2D] text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                                    >
                                        Events
                                    </Link>
                                    <Link 
                                        href="/university/programs" 
                                        className={`${currentPage === 'university-programs' ? 'border-[#9A2D2D] text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                                    >
                                        Programs
                                    </Link>
                                    <Link 
                                        href="/university/analytics" 
                                        className={`${currentPage === 'university-analytics' ? 'border-[#9A2D2D] text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                                    >
                                        Analytics
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link 
                                        href="/dashboard" 
                                        className={`${currentPage === 'home' ? 'border-[#9A2D2D] text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                                    >
                                        Home
                                    </Link>
                                    <Link 
                                        href="/universities" 
                                        className={`${currentPage === 'universities' ? 'border-[#9A2D2D] text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                                    >
                                        Universities
                                    </Link>
                                    <Link 
                                        href="/careers" 
                                        className={`${currentPage === 'careers' ? 'border-[#9A2D2D] text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                                    >
                                        Careers
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        {studentProfile && !isUniversityAdmin && (
                            <div className="flex items-center bg-[#9A2D2D] bg-opacity-10 px-3 py-1 rounded-full">
                                <StarIcon className="h-5 w-5 text-white mr-1" />
                                <span className="text-sm font-medium text-white">{currentXp} XP</span>
                            </div>
                        )}
                        
                        {/* User Avatar with Dropdown */}
                        <div className="ml-3 relative">
                            <AvatarDropdown 
                                userName={auth.user.name}
                                archetypeCode={studentProfile?.archetype_code}
                                hexadType={studentProfile?.hexad_type}
                                level={currentLevel}
                                hasXp={currentXp > 0}
                                isUniversityAdmin={isUniversityAdmin}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
} 