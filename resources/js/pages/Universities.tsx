import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import { 
    UserCircleIcon, 
    BuildingLibraryIcon,
    MagnifyingGlassIcon,
    AdjustmentsHorizontalIcon,
    StarIcon,
    MapPinIcon,
    GlobeAltIcon,
    AcademicCapIcon,
    ChevronDownIcon,
    XMarkIcon
} from '@heroicons/react/24/outline';
import Navigation from '@/components/Navigation';

interface University {
    id: number;
    university_name: string;
    city: string;
    description: string;
    website: string;
    logo: string;
    branches_offered: string[];
    qualities_sought: string[];
    address: string;
    match_percentage?: number;
    faculties: Faculty[];
}

interface Faculty {
    id: number;
    university_id: number;
    name: string;
    slug: string;
    description: string;
    programmes: Programme[];
}

interface Programme {
    id: number;
    faculty_id: number;
    name: string;
    slug: string;
    tuition: number;
    ects: number;
    duration: string;
    scholarship_available: boolean;
    open_for_application: boolean;
    deadline: string;
    description: string;
}

interface StudentProfile {
    id: number;
    hexad_type: string;
    archetype_code: string;
    xp?: number;
    credits?: number;
    school?: string;
}

interface UniversitiesProps {
    auth: {
        user: {
            name: string;
            email: string;
        };
    };
    studentProfile?: StudentProfile;
    universities: University[];
    filters?: {
        cities: string[];
        branches: string[];
        qualities: string[];
    };
}

export default function Universities({ auth, studentProfile, universities, filters = { cities: [], branches: [], qualities: [] } }: UniversitiesProps) {
    // State for filtering and sorting
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedBranches, setSelectedBranches] = useState<string[]>([]);
    const [selectedCities, setSelectedCities] = useState<string[]>([]);
    const [selectedQualities, setSelectedQualities] = useState<string[]>([]);
    const [sortBy, setSortBy] = useState<'match' | 'name' | 'city'>('match');
    const [filteredUniversities, setFilteredUniversities] = useState<University[]>(universities);
    const [showFilters, setShowFilters] = useState(false);

    // Filter and sort universities when criteria change
    useEffect(() => {
        let results = [...universities];

        // Apply search term
        if (searchTerm) {
            const lowercasedTerm = searchTerm.toLowerCase();
            results = results.filter(university => 
                university.university_name.toLowerCase().includes(lowercasedTerm) ||
                university.description.toLowerCase().includes(lowercasedTerm) ||
                university.city.toLowerCase().includes(lowercasedTerm) ||
                university.faculties.some(faculty => faculty.name.toLowerCase().includes(lowercasedTerm)) ||
                university.faculties.some(faculty => 
                    faculty.programmes.some(programme => 
                        programme.name.toLowerCase().includes(lowercasedTerm)
                    )
                )
            );
        }

        // Apply branch filter
        if (selectedBranches.length > 0) {
            results = results.filter(university => 
                selectedBranches.some(branch => university.branches_offered.includes(branch))
            );
        }

        // Apply city filter
        if (selectedCities.length > 0) {
            results = results.filter(university => 
                selectedCities.includes(university.city)
            );
        }

        // Apply qualities filter
        if (selectedQualities.length > 0) {
            results = results.filter(university => 
                selectedQualities.some(quality => university.qualities_sought.includes(quality))
            );
        }

        // Sort results
        switch (sortBy) {
            case 'match':
                results.sort((a, b) => (b.match_percentage || 0) - (a.match_percentage || 0));
                break;
            case 'name':
                results.sort((a, b) => a.university_name.localeCompare(b.university_name));
                break;
            case 'city':
                results.sort((a, b) => a.city.localeCompare(b.city));
                break;
        }

        setFilteredUniversities(results);
    }, [universities, searchTerm, selectedBranches, selectedCities, selectedQualities, sortBy]);

    const clearFilters = () => {
        setSearchTerm('');
        setSelectedBranches([]);
        setSelectedCities([]);
        setSelectedQualities([]);
    };

    const toggleBranch = (branch: string) => {
        if (selectedBranches.includes(branch)) {
            setSelectedBranches(selectedBranches.filter(b => b !== branch));
        } else {
            setSelectedBranches([...selectedBranches, branch]);
        }
    };

    const toggleCity = (city: string) => {
        if (selectedCities.includes(city)) {
            setSelectedCities(selectedCities.filter(c => c !== city));
        } else {
            setSelectedCities([...selectedCities, city]);
        }
    };

    const toggleQuality = (quality: string) => {
        if (selectedQualities.includes(quality)) {
            setSelectedQualities(selectedQualities.filter(q => q !== quality));
        } else {
            setSelectedQualities([...selectedQualities, quality]);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation Bar */}
            <Navigation 
                auth={auth} 
                studentProfile={studentProfile} 
                currentPage="universities" 
            />

            <Head title="Universities" />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row justify-between items-start mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Universities</h1>
                        <p className="mt-1 text-sm text-gray-600">
                            Find your perfect university match based on your learning profile
                        </p>
                    </div>
                    
                    {/* Match Profile Badge (if available) */}
                    {studentProfile && (
                        <div className="mt-4 md:mt-0 bg-white p-4 rounded-xl shadow-sm">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 mr-3">
                                    <img 
                                        src={`/images/${studentProfile.archetype_code}.png`}
                                        alt={`${studentProfile.hexad_type} Character`}
                                        className="h-12 w-12 object-contain" 
                                    />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-700">Matching as</p>
                                    <p className="text-lg font-bold text-[#9A2D2D]">{studentProfile.hexad_type}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Search and Filter Section */}
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
                                placeholder="Search universities, programs, faculties..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        
                        {/* Sort and Filter Buttons */}
                        <div className="flex gap-2">
                            {/* Sort Dropdown */}
                            <div className="relative">
                                <select
                                    className="appearance-none block px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#9A2D2D] focus:border-[#9A2D2D] sm:text-sm"
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value as 'match' | 'name' | 'city')}
                                >
                                    <option value="match">Sort by Match</option>
                                    <option value="name">Sort by Name</option>
                                    <option value="city">Sort by City</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <ChevronDownIcon className="h-4 w-4" />
                                </div>
                            </div>
                            
                            {/* Filter Button */}
                            <button
                                type="button"
                                onClick={() => setShowFilters(!showFilters)}
                                className={`inline-flex items-center px-4 py-2 border rounded-md shadow-sm text-sm font-medium ${
                                    showFilters || selectedBranches.length > 0 || selectedCities.length > 0 || selectedQualities.length > 0
                                        ? 'bg-[#9A2D2D] text-white border-[#9A2D2D]'
                                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                }`}
                            >
                                <AdjustmentsHorizontalIcon className="h-5 w-5 mr-2" />
                                Filters
                                {(selectedBranches.length > 0 || selectedCities.length > 0 || selectedQualities.length > 0) && (
                                    <span className="ml-2 inline-flex items-center justify-center w-5 h-5 text-xs font-semibold rounded-full bg-white text-[#9A2D2D]">
                                        {selectedBranches.length + selectedCities.length + selectedQualities.length}
                                    </span>
                                )}
                            </button>
                            
                            {/* Clear Filters Button (only when filters are applied) */}
                            {(searchTerm || selectedBranches.length > 0 || selectedCities.length > 0 || selectedQualities.length > 0) && (
                                <button
                                    type="button"
                                    onClick={clearFilters}
                                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium bg-white text-gray-700 hover:bg-gray-50"
                                >
                                    <XMarkIcon className="h-5 w-5 mr-2" />
                                    Clear
                                </button>
                            )}
                        </div>
                    </div>
                    
                    {/* Filter Options Panel */}
                    {showFilters && (
                        <div className="mt-4 border-t border-gray-200 pt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Branch Filter */}
                            <div>
                                <h3 className="text-sm font-medium text-gray-700 mb-2">Branches</h3>
                                <div className="space-y-2">
                                    {filters.branches.map(branch => (
                                        <div key={branch} className="flex items-center">
                                            <input
                                                id={`branch-${branch}`}
                                                type="checkbox"
                                                className="h-4 w-4 text-[#9A2D2D] focus:ring-[#9A2D2D] border-gray-300 rounded"
                                                checked={selectedBranches.includes(branch)}
                                                onChange={() => toggleBranch(branch)}
                                            />
                                            <label htmlFor={`branch-${branch}`} className="ml-2 text-sm text-gray-700">
                                                {branch}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            {/* City Filter */}
                            <div>
                                <h3 className="text-sm font-medium text-gray-700 mb-2">Cities</h3>
                                <div className="space-y-2">
                                    {filters.cities.map(city => (
                                        <div key={city} className="flex items-center">
                                            <input
                                                id={`city-${city}`}
                                                type="checkbox"
                                                className="h-4 w-4 text-[#9A2D2D] focus:ring-[#9A2D2D] border-gray-300 rounded"
                                                checked={selectedCities.includes(city)}
                                                onChange={() => toggleCity(city)}
                                            />
                                            <label htmlFor={`city-${city}`} className="ml-2 text-sm text-gray-700">
                                                {city}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            {/* Qualities Filter */}
                            <div>
                                <h3 className="text-sm font-medium text-gray-700 mb-2">Qualities Sought</h3>
                                <div className="space-y-2">
                                    {filters.qualities.map(quality => (
                                        <div key={quality} className="flex items-center">
                                            <input
                                                id={`quality-${quality}`}
                                                type="checkbox"
                                                className="h-4 w-4 text-[#9A2D2D] focus:ring-[#9A2D2D] border-gray-300 rounded"
                                                checked={selectedQualities.includes(quality)}
                                                onChange={() => toggleQuality(quality)}
                                            />
                                            <label htmlFor={`quality-${quality}`} className="ml-2 text-sm text-gray-700">
                                                {quality}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Results Summary */}
                <div className="mb-6 flex justify-between items-center">
                    <div className="text-sm text-gray-600">
                        Showing {filteredUniversities.length} of {universities.length} universities
                    </div>
                    
                    {/* Additional actions could go here */}
                </div>

                {/* University List */}
                <div className="space-y-6">
                    {filteredUniversities.length > 0 ? (
                        filteredUniversities.map((university) => (
                            <div key={university.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                                <div className="md:flex">
                                    {/* University Logo */}
                                    <div className="md:flex-shrink-0 flex items-center justify-center p-6 bg-gray-50 md:w-48">
                                        {university.logo ? (
                                            <img 
                                                src={university.logo} 
                                                alt={`${university.university_name} logo`} 
                                                className="h-24 w-auto object-contain"
                                            />
                                        ) : (
                                            <BuildingLibraryIcon className="h-24 w-24 text-gray-400" />
                                        )}
                                    </div>
                                    
                                    {/* University Details */}
                                    <div className="p-6 flex-1">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h2 className="text-xl font-bold text-gray-900">{university.university_name}</h2>
                                                <div className="mt-1 flex items-center text-sm text-gray-500">
                                                    <MapPinIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                                                    {university.city}
                                                </div>
                                            </div>
                                            
                                            {/* Match Percentage Badge */}
                                            {university.match_percentage !== undefined && (
                                                <div className="ml-4 flex-shrink-0">
                                                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                                        university.match_percentage >= 80 ? 'bg-green-100 text-green-800' :
                                                        university.match_percentage >= 60 ? 'bg-yellow-100 text-yellow-800' :
                                                        'bg-gray-100 text-gray-800'
                                                    }`}>
                                                        <StarIcon className="h-4 w-4 mr-1" />
                                                        {university.match_percentage}% Match
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        
                                        {/* Description */}
                                        <p className="mt-3 text-sm text-gray-600 line-clamp-2">
                                            {university.description}
                                        </p>
                                        
                                        {/* Faculty Snippets */}
                                        {university.faculties.length > 0 && (
                                            <div className="mt-4">
                                                <h3 className="text-sm font-medium text-gray-900">Faculties:</h3>
                                                <div className="mt-2 flex flex-wrap gap-2">
                                                    {university.faculties.slice(0, 5).map(faculty => (
                                                        <span 
                                                            key={faculty.id} 
                                                            className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-blue-100 text-blue-800"
                                                        >
                                                            {faculty.name}
                                                        </span>
                                                    ))}
                                                    {university.faculties.length > 5 && (
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                                                            +{university.faculties.length - 5} more
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                        
                                        {/* University Stats */}
                                        <div className="mt-4 flex flex-col md:flex-row md:justify-between">
                                            <div className="flex flex-wrap gap-6">
                                                {/* Branches */}
                                                <div className="flex items-center">
                                                    <AcademicCapIcon className="h-5 w-5 text-gray-400 mr-1.5" />
                                                    <span className="text-sm text-gray-500">
                                                        {university.branches_offered.length} {university.branches_offered.length === 1 ? 'branch' : 'branches'}
                                                    </span>
                                                </div>
                                                
                                                {/* Website */}
                                                {university.website && (
                                                    <div className="flex items-center">
                                                        <GlobeAltIcon className="h-5 w-5 text-gray-400 mr-1.5" />
                                                        <a 
                                                            href={university.website} 
                                                            target="_blank" 
                                                            rel="noopener noreferrer"
                                                            className="text-sm text-[#9A2D2D] hover:underline"
                                                        >
                                                            Visit Website
                                                        </a>
                                                    </div>
                                                )}
                                            </div>
                                            
                                            {/* Action Button */}
                                            <Link
                                                href={`/universities/${university.id}`}
                                                className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#9A2D2D] hover:bg-[#822626] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#9A2D2D]"
                                            >
                                                View Details
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="bg-white rounded-xl shadow-md p-12 text-center">
                            <BuildingLibraryIcon className="mx-auto h-16 w-16 text-gray-400" />
                            <h3 className="mt-4 text-lg font-medium text-gray-900">No universities found</h3>
                            <p className="mt-2 text-sm text-gray-500">
                                Try adjusting your filters or search term to find universities that match your criteria.
                            </p>
                            <button
                                onClick={clearFilters}
                                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#9A2D2D] hover:bg-[#822626]"
                            >
                                Clear Filters
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
} 