import React, { useState, useEffect, useRef } from 'react';
import { Head, Link } from '@inertiajs/react';
import { 
    UserCircleIcon, 
    BriefcaseIcon,
    MagnifyingGlassIcon,
    AdjustmentsHorizontalIcon,
    StarIcon,
    AcademicCapIcon,
    ChevronRightIcon,
    XMarkIcon,
    CurrencyDollarIcon,
    ArrowTrendingUpIcon,
    PlusIcon,
    MinusIcon
} from '@heroicons/react/24/outline';
import * as d3 from 'd3';

interface FuturePath {
    title: string;
    years: number;
    salary: string;
}

interface Career {
    id: number;
    title: string;
    description: string;
    salary_range: string;
    growth_rate: string;
    education: string;
    skills: string[];
    future_paths: FuturePath[];
    match_archetypes: string[];
    match_percentage?: number;
}

interface SkillNode {
    id: string;
    name: string;
    level: number;
    x: number;
    y: number;
    color: string;
}

interface SkillLink {
    source: string;
    target: string;
}

interface SkillTree {
    nodes: SkillNode[];
    links: SkillLink[];
}

interface StudentProfile {
    id: number;
    hexad_type: string;
    archetype_code: string;
    xp?: number;
    credits?: number;
    school?: string;
    analysis?: string | {
        learning_style?: string;
        archetype_scores?: Record<string, number>;
        study_techniques?: string[];
        type_description?: string;
        recommended_majors?: string[];
    };
}

interface CareersProps {
    auth: {
        user: {
            name: string;
            email: string;
        };
    };
    studentProfile?: StudentProfile;
    careers: Career[];
    skillTree: SkillTree;
}

// New interfaces for D3 
interface D3ZoomEvent extends d3.D3ZoomEvent<SVGSVGElement, unknown> {
    transform: d3.ZoomTransform;
}

export default function Careers({ auth, studentProfile, careers, skillTree }: CareersProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredCareers, setFilteredCareers] = useState<Career[]>(careers);
    const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
    const [selectedCareer, setSelectedCareer] = useState<Career | null>(null);
    const [showFilters, setShowFilters] = useState(false);
    const [zoomLevel, setZoomLevel] = useState(1);
    
    const skillTreeRef = useRef<SVGSVGElement>(null);
    const zoomRef = useRef<d3.ZoomBehavior<SVGSVGElement, unknown> | null>(null);
    
    // Initialize filtered careers with the server-provided data
    useEffect(() => {
        setFilteredCareers(careers);
        
        // Debug output
        if (process.env.NODE_ENV === 'development') {
            console.log('Student Profile:', studentProfile);
            console.log('First few careers:', careers.slice(0, 3));
            
            // Specifically check for match_percentage
            const percentages = careers.slice(0, 10).map(career => ({
                title: career.title,
                match_percentage: career.match_percentage
            }));
            console.log('Match percentages:', percentages);
        }
    }, [careers]);
    
    // Filter careers based on search term and selected skills
    useEffect(() => {
        let results = [...careers];
        
        // Apply search term filter
        if (searchTerm) {
            const lowercasedTerm = searchTerm.toLowerCase();
            results = results.filter(career => 
                career.title.toLowerCase().includes(lowercasedTerm) ||
                career.description.toLowerCase().includes(lowercasedTerm) ||
                career.skills.some(skill => skill.toLowerCase().includes(lowercasedTerm))
            );
        }
        
        // Apply skills filter
        if (selectedSkills.length > 0) {
            results = results.filter(career => 
                selectedSkills.some(skill => 
                    career.skills.some(careerSkill => 
                        careerSkill.toLowerCase().includes(skill.toLowerCase())
                    )
                )
            );
        }
        
        // If student profile exists, maintain sort by match percentage
        if (studentProfile) {
            results.sort((a, b) => (b.match_percentage || 0) - (a.match_percentage || 0));
        }
        
        setFilteredCareers(results);
    }, [careers, searchTerm, selectedSkills]);
    
    // Initialize skill tree visualization
    useEffect(() => {
        if (skillTreeRef.current && skillTree.nodes.length > 0) {
            initializeSkillTree();
        }
    }, [skillTree]);
    
    // Initialize the D3 skill tree visualization
    const initializeSkillTree = () => {
        if (!skillTreeRef.current) return;
        
        const svg = d3.select(skillTreeRef.current);
        
        // Clear previous content
        svg.selectAll("*").remove();
        
        // Create a container group that will be transformed by zoom
        const g = svg.append("g")
            .attr("class", "skill-tree-container");
        
        // Initialize zoom behavior
        const zoom = d3.zoom<SVGSVGElement, unknown>()
            .scaleExtent([0.3, 3]) // Allow zoom from 0.3x to 3x
            .on("zoom", (event: D3ZoomEvent) => {
                g.attr("transform", event.transform.toString());
                setZoomLevel(event.transform.k);
            });
        
        // Store zoom reference for external controls
        zoomRef.current = zoom;
        
        // Apply zoom behavior to svg
        svg.call(zoom);
        
        // Create links
        g.selectAll('line')
            .data(skillTree.links)
            .enter()
            .append('line')
            .attr('x1', (d: SkillLink) => {
                const sourceNode = skillTree.nodes.find(node => node.id === d.source);
                return sourceNode ? sourceNode.x : 0;
            })
            .attr('y1', (d: SkillLink) => {
                const sourceNode = skillTree.nodes.find(node => node.id === d.source);
                return sourceNode ? sourceNode.y : 0;
            })
            .attr('x2', (d: SkillLink) => {
                const targetNode = skillTree.nodes.find(node => node.id === d.target);
                return targetNode ? targetNode.x : 0;
            })
            .attr('y2', (d: SkillLink) => {
                const targetNode = skillTree.nodes.find(node => node.id === d.target);
                return targetNode ? targetNode.y : 0;
            })
            .attr('stroke', '#cccccc')
            .attr('stroke-width', 1);
        
        // Create nodes
        const nodes = g.selectAll('g.node')
            .data(skillTree.nodes)
            .enter()
            .append('g')
            .attr('class', 'skill-node')
            .attr('transform', (d: SkillNode) => `translate(${d.x}, ${d.y})`)
            .on('click', (event: MouseEvent, d: SkillNode) => {
                // Toggle selection of skills
                if (selectedSkills.includes(d.name)) {
                    setSelectedSkills(selectedSkills.filter(skill => skill !== d.name));
                } else {
                    setSelectedSkills([...selectedSkills, d.name]);
                }
                
                // Stop propagation to prevent zoom when clicking nodes
                event.stopPropagation();
            });
        
        // Add circles for nodes
        nodes.append('circle')
            .attr('r', (d: SkillNode) => d.level === 0 ? 30 : d.level === 1 ? 25 : 20)
            .attr('fill', (d: SkillNode) => d.color)
            .attr('stroke', '#333')
            .attr('stroke-width', 1)
            .attr('class', (d: SkillNode) => selectedSkills.includes(d.name) ? 'selected' : '')
            .style('cursor', 'pointer');
        
        // Add text labels
        nodes.append('text')
            .text((d: SkillNode) => d.name)
            .attr('text-anchor', 'middle')
            .attr('dy', '.3em')
            .attr('font-size', '10px')
            .attr('fill', '#fff')
            .style('pointer-events', 'none'); // Prevent text from interfering with clicks
        
        // Add initial zoom to fit content
        svg.call(zoom.transform, d3.zoomIdentity.translate(-1200, -1200).scale(3.5));
    };
    
    // Zoom control handlers
    const handleZoomIn = () => {
        if (skillTreeRef.current && zoomRef.current) {
            d3.select(skillTreeRef.current)
                .transition()
                .duration(300)
                .call(zoomRef.current.scaleBy, 1.2);
        }
    };
    
    const handleZoomOut = () => {
        if (skillTreeRef.current && zoomRef.current) {
            d3.select(skillTreeRef.current)
                .transition()
                .duration(300)
                .call(zoomRef.current.scaleBy, 0.8);
        }
    };
    
    const handleResetZoom = () => {
        if (skillTreeRef.current && zoomRef.current) {
            d3.select(skillTreeRef.current)
                .transition()
                .duration(500)
                .call(
                    zoomRef.current.transform, 
                    d3.zoomIdentity.translate(500, 400).scale(0.8)
                );
        }
    };
    
    const clearFilters = () => {
        setSearchTerm('');
        setSelectedSkills([]);
    };
    
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation Bar */}
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
                                <Link href="/dashboard" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                                    Home
                                </Link>
                                <Link href="/universities" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                                    Universities
                                </Link>
                                <Link href="/careers" className="border-[#9A2D2D] text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                                    Careers
                                </Link>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="ml-3 relative">
                                <div className="flex items-center">
                                    <span className="text-sm text-gray-700 mr-2">{auth.user.name}</span>
                                    <Link href="/dashboard">
                                        <UserCircleIcon className="h-8 w-8 text-gray-500" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <Head title="Careers" />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row justify-between items-start mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Explore Careers</h1>
                        <p className="mt-1 text-sm text-gray-600">
                            Discover career paths that match your learning profile and skills
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

                {/* Search and Filters Section */}
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
                                placeholder="Search careers, skills, roles..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        
                        {/* Filter Buttons */}
                        <div className="flex gap-2">
                            {/* Filter Button */}
                            <button
                                type="button"
                                onClick={() => setShowFilters(!showFilters)}
                                className={`inline-flex items-center px-4 py-2 border rounded-md shadow-sm text-sm font-medium ${
                                    showFilters || selectedSkills.length > 0
                                        ? 'bg-[#9A2D2D] text-white border-[#9A2D2D]'
                                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                }`}
                            >
                                <AdjustmentsHorizontalIcon className="h-5 w-5 mr-2" />
                                Filter by Skills
                                {selectedSkills.length > 0 && (
                                    <span className="ml-2 inline-flex items-center justify-center w-5 h-5 text-xs font-semibold rounded-full bg-white text-[#9A2D2D]">
                                        {selectedSkills.length}
                                    </span>
                                )}
                            </button>
                            
                            {/* Clear Filters Button (only when filters are applied) */}
                            {(searchTerm || selectedSkills.length > 0) && (
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
                    
                    {/* Filter explanation - only when filters are applied */}
                    {selectedSkills.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2 items-center">
                            <span className="text-sm text-gray-500">Filtered by skills:</span>
                            {selectedSkills.map(skill => (
                                <span 
                                    key={skill}
                                    className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-[#9A2D2D] bg-opacity-10 text-[#9A2D2D]"
                                >
                                    {skill}
                                    <button 
                                        type="button"
                                        onClick={() => setSelectedSkills(selectedSkills.filter(s => s !== skill))}
                                        className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full text-[#9A2D2D] hover:bg-[#9A2D2D] hover:text-white focus:outline-none"
                                    >
                                        <XMarkIcon className="h-3 w-3" />
                                    </button>
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                {/* Combined Skills Tree and Career Results */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Skill Tree Visualization */}
                    <div className="lg:col-span-1 bg-white rounded-xl shadow-md p-6 order-2 lg:order-1">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Skills Network</h2>
                        <p className="text-sm text-gray-600 mb-4">
                            Click on skills to filter career paths. Use controls to zoom and pan the network.
                        </p>
                        <div className="bg-gray-900 rounded-lg overflow-hidden relative" style={{ height: '500px' }}>
                            {/* Zoom Controls */}
                            <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
                                <button 
                                    onClick={handleZoomIn}
                                    className="bg-white/20 hover:bg-white/30 rounded-full p-1 text-white"
                                    title="Zoom In"
                                >
                                    <PlusIcon className="h-5 w-5" />
                                </button>
                                <button 
                                    onClick={handleZoomOut}
                                    className="bg-white/20 hover:bg-white/30 rounded-full p-1 text-white"
                                    title="Zoom Out"
                                >
                                    <MinusIcon className="h-5 w-5" />
                                </button>
                                <button 
                                    onClick={handleResetZoom}
                                    className="bg-white/20 hover:bg-white/30 rounded-full p-1 text-white text-xs"
                                    title="Reset View"
                                >
                                    <span>R</span>
                                </button>
                            </div>
                            
                            <svg 
                                ref={skillTreeRef} 
                                width="100%" 
                                height="100%" 
                                viewBox="0 0 1000 800"
                                style={{ display: 'block' }}
                            ></svg>
                        </div>
                        <div className="mt-4">
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="text-sm font-medium text-gray-700">Legend</h3>
                                <span className="text-xs text-gray-500">Zoom: {Math.round(zoomLevel * 100)}%</span>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center">
                                    <div className="w-3 h-3 rounded-full bg-[#4ECDC4] mr-1"></div>
                                    <span className="text-xs text-gray-600">Main Skill Category</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-3 h-3 rounded-full bg-[#eeeeee] mr-1"></div>
                                    <span className="text-xs text-gray-600">Specialized Skill</span>
                                </div>
                            </div>
                            <div className="mt-2 text-xs text-gray-500">
                                <p>Tip: Drag to pan, scroll to zoom, or use controls</p>
                            </div>
                        </div>
                    </div>
                    
                    {/* Career Results */}
                    <div className="lg:col-span-2 space-y-6 order-1 lg:order-2">
                        {/* Results Summary */}
                        <div className="bg-white rounded-xl shadow-md p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-2">Career Paths</h2>
                            <p className="text-sm text-gray-600">
                                Showing {filteredCareers.length} of {careers.length} career paths
                                {studentProfile && " matching your profile"}
                            </p>
                        </div>
                        
                        {/* Career List */}
                        {filteredCareers.length > 0 ? (
                            <div className="space-y-6">
                                {filteredCareers.map((career) => (
                                    <div 
                                        key={career.id} 
                                        className={`bg-white rounded-xl shadow-md overflow-hidden transition-all duration-200 ${selectedCareer?.id === career.id ? 'ring-2 ring-[#9A2D2D]' : ''}`}
                                    >
                                        <div className="p-6">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="text-xl font-bold text-gray-900">{career.title}</h3>
                                                    <div className="mt-1 flex items-center space-x-4">
                                                        <div className="flex items-center text-sm text-gray-500">
                                                            <CurrencyDollarIcon className="flex-shrink-0 mr-1 h-5 w-5 text-gray-400" />
                                                            {career.salary_range}
                                                        </div>
                                                        <div className="flex items-center text-sm text-gray-500">
                                                            <ArrowTrendingUpIcon className="flex-shrink-0 mr-1 h-5 w-5 text-gray-400" />
                                                            Growth: {career.growth_rate}
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                {/* Match Percentage Badge */}
                                                {(
                                                    <div className="ml-4 flex-shrink-0">
                                                        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                                            (career.match_percentage || 0) >= 80 ? 'bg-green-100 text-green-800' :
                                                            (career.match_percentage || 0) >= 60 ? 'bg-yellow-100 text-yellow-800' :
                                                            'bg-gray-100 text-gray-800'
                                                        }`}>
                                                            <StarIcon className="h-4 w-4 mr-1" />
                                                            {career.match_percentage || 0}% Match
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                            
                                            {/* Description */}
                                            <p className="mt-3 text-sm text-gray-600">
                                                {career.description}
                                            </p>
                                            
                                            {/* Education */}
                                            <div className="mt-3 flex items-center">
                                                <AcademicCapIcon className="h-5 w-5 text-gray-400 mr-1.5" />
                                                <span className="text-sm text-gray-600">{career.education}</span>
                                            </div>
                                            
                                            {/* Skills */}
                                            <div className="mt-4">
                                                <h4 className="text-sm font-medium text-gray-900">Key Skills:</h4>
                                                <div className="mt-2 flex flex-wrap gap-2">
                                                    {career.skills.map((skill, index) => (
                                                        <span 
                                                            key={index}
                                                            className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium 
                                                                ${selectedSkills.includes(skill) 
                                                                    ? 'bg-[#9A2D2D] text-white' 
                                                                    : 'bg-blue-100 text-blue-800'
                                                                }`}
                                                        >
                                                            {skill}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            
                                            {/* Toggle Button for Future Path */}
                                            <div className="mt-4 flex justify-end">
                                                <button
                                                    type="button"
                                                    onClick={() => setSelectedCareer(selectedCareer?.id === career.id ? null : career)}
                                                    className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150"
                                                >
                                                    {selectedCareer?.id === career.id ? 'Hide' : 'Show'} Career Path
                                                    <ChevronRightIcon className={`ml-1 h-5 w-5 transition-transform ${selectedCareer?.id === career.id ? 'transform rotate-90' : ''}`} />
                                                </button>
                                            </div>
                                        </div>
                                        
                                        {/* Future Career Path - Expanded View */}
                                        {selectedCareer?.id === career.id && (
                                            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                                                <h4 className="text-lg font-medium text-gray-900 mb-4">Future Career Path</h4>
                                                <div className="relative">
                                                    {/* Timeline Line */}
                                                    <div className="absolute h-full w-0.5 bg-[#9A2D2D] opacity-30 left-7 top-0"></div>
                                                    
                                                    {/* Timeline Items */}
                                                    <div className="space-y-8 relative">
                                                        {/* Starting Position */}
                                                        <div className="flex">
                                                            <div className="flex-shrink-0 flex items-center justify-center w-14">
                                                                <div className="h-8 w-8 rounded-full bg-[#9A2D2D] flex items-center justify-center text-white text-sm font-medium">
                                                                    0
                                                                </div>
                                                            </div>
                                                            <div className="ml-4">
                                                                <h5 className="text-base font-medium text-gray-900">{career.title}</h5>
                                                                <p className="text-sm text-gray-500">{career.salary_range}</p>
                                                            </div>
                                                        </div>
                                                        
                                                        {/* Future Steps */}
                                                        {career.future_paths.map((path, index) => (
                                                            <div key={index} className="flex">
                                                                <div className="flex-shrink-0 flex items-center justify-center w-14">
                                                                    <div className="h-8 w-8 rounded-full bg-[#9A2D2D] flex items-center justify-center text-white text-sm font-medium">
                                                                        {path.years}
                                                                    </div>
                                                                </div>
                                                                <div className="ml-4">
                                                                    <h5 className="text-base font-medium text-gray-900">{path.title}</h5>
                                                                    <p className="text-sm text-gray-500">{path.salary}</p>
                                                                    <p className="text-xs text-gray-500">{path.years} years experience</p>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white rounded-xl shadow-md p-12 text-center">
                                <BriefcaseIcon className="mx-auto h-16 w-16 text-gray-400" />
                                <h3 className="mt-4 text-lg font-medium text-gray-900">No careers found</h3>
                                <p className="mt-2 text-sm text-gray-500">
                                    Try adjusting your filters or search term to find career paths that match your criteria.
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
        </div>
    );
} 