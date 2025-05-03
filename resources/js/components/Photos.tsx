import { useState, useEffect } from 'react';

// Updated career images with full details
const careerImages = [
  {
    src: '/images/AN-VS.png',
    label: 'AN-VS',
    university: 'Faculty of Natural & Mathematical Sciences',
    description: 'Visionary Scientists who connect theoretical concepts with practical applications, drawn to research and scientific discovery.',
    majors: ['Physics', 'Astrophysics', 'Applied Mathematics', 'Materials Science']
  },
  {
    src: '/images/AN-EN.png',
    label: 'AN-EN',
    university: 'Faculty of Engineering & Technology',
    description: 'Innovative problem-solvers drawn to designing, building, and optimizing systems across engineering fields.',
    majors: ['Mechanical Eng.', 'Civil Eng.', 'Electrical / Electronic Eng.', 'Mechatronics']
  },
  {
    src: '/images/DI-CD.png',
    label: 'DI-CD',
    university: 'School of Data & Decision Sciences',
    description: 'Analytical thinkers who love uncovering insights from data using statistics, AI/ML, and business analytics.',
    majors: ['Data Science', 'Statistics', 'AI & ML', 'Business Analytics']
  },
  {
    src: '/images/DI-CS.png',
    label: 'DI-CS',
    university: 'Faculty of Computer Science & Cyber Ops',
    description: 'Code Sorcerers who thrive on solving complex problems through programming, software development, and algorithmic thinking.',
    majors: ['Computer Science', 'Software Eng.', 'Cybersecurity', 'Information Systems']
  },
  {
    src: '/images/EX-BU.png',
    label: 'EX-BU',
    university: 'School of Business & Entrepreneurship',
    description: 'Strategic leaders ready to innovate, launch ventures, and manage businesses.',
    majors: ['Business Administration', 'Entrepreneurship', 'Marketing', 'Finance']
  },
  {
    src: '/images/EX-PL.png',
    label: 'EX-PL',
    university: 'School of Economics, Law & Governance',
    description: 'Policy Leaders who analyze, develop, and implement solutions to societal challenges through governance and public service.',
    majors: ['Economics', 'Public Policy', 'International Law', 'Political Economy']
  },
  {
    src: '/images/SO-ME.png',
    label: 'SO-ME',
    university: 'College of Media, Film & Communication',
    description: 'Storytellers and content creators passionate about journalism, film, media production, and digital communication.',
    majors: ['Journalism', 'Digital Media Production', 'Film Studies', 'Content Design']
  },
  {
    src: '/images/SO-ED.png',
    label: 'SO-ED',
    university: 'Faculty of Education & Learning Sciences',
    description: 'Inspiring educators dedicated to pedagogy, linguistics, psychology, and instructional design for future generations.',
    majors: ['Pedagogy', 'Educational Psychology', 'Linguistics', 'Instructional Design']
  },
  {
    src: '/images/HE-MD.png',
    label: 'HE-MD',
    university: 'Medical & Health Sciences Faculty',
    description: 'Compassionate healers preparing for careers in medicine, dentistry, pharmacy, or nursing.',
    majors: ['Medicine (MD)', 'Nursing', 'Dentistry', 'Pharmacy']
  },
  {
    src: '/images/HE-BT.png',
    label: 'HE-BT',
    university: 'Faculty of Biotechnology & Biomedical Eng.',
    description: 'Science-driven innovators exploring biotechnology, biomedical engineering, genetics, or bioinformatics.',
    majors: ['Biotechnology', 'Biomedical Eng.', 'Genetics', 'Bioinformatics']
  },
  {
    src: '/images/AR-DS.png',
    label: 'AR-DS',
    university: 'School of Architecture & Industrial Design',
    description: 'Creative visionaries passionate about shaping spaces and products through architecture and design.',
    majors: ['Architecture', 'Industrial Design', 'Interior Design', 'Urban Planning']
  },
  {
    src: '/images/AR-FM.png',
    label: 'AR-FM',
    university: 'College of Fine Arts & Visual Communication',
    description: 'Fine-Arts Maestros who express ideas through various artistic mediums.',
    majors: ['Fine Arts', 'Graphic Design', 'Animation', 'Illustration']
  },
  {
    src: '/images/GL-DM.png',
    label: 'GL-DM',
    university: 'Faculty of International Relations & Law',
    description: 'Diplomatically minded students focused on global affairs, law, peace studies, and European governance.',
    majors: ['International Relations', 'Diplomatic Studies', 'European Law', 'Peace & Conflict Studies']
  },
  {
    src: '/images/GL-TR.png',
    label: 'GL-TR',
    university: 'School of Tourism, Hospitality & Culture',
    description: 'World explorers interested in hospitality, tourism, event planning, and cross-cultural engagement.',
    majors: ['Tourism Management', 'Hospitality Business', 'Event & Festival Management', 'Cultural Studies']
  },
  {
    src: '/images/SP-AT.png',
    label: 'SP-AT',
    university: 'Faculty of Sport & Human Performance',
    description: 'Performance-focused individuals aiming to excel in sports science, kinesiology, therapy, or athletic management.',
    majors: ['Sports Science', 'Kinesiology', 'Physiotherapy', 'Sports Management']
  },
  {
    src: '/images/SP-EC.png',
    label: 'SP-EC',
    university: 'Faculty of Environmental & Sustainability Sciences',
    description: 'Eco-conscious changemakers passionate about sustainability, environmental science, and renewable energy innovation.',
    majors: ['Environmental Eng.', 'Environmental Science', 'Renewable Energy Eng.', 'Sustainability Studies']
  },
];

const Photos: React.FC = () => {
  const [selected, setSelected] = useState<typeof careerImages[0] | null>(null);
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());
  
  // Debounce timer for smoother hover experience
  let hoverTimer: NodeJS.Timeout | null = null;

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      // Check both window width and touch capability
      const hasTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth < 768;
      setIsMobile(hasTouchScreen || isSmallScreen);
    };
    
    // Initial check
    checkMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseEnter = (index: number) => {
    if (hoverTimer) clearTimeout(hoverTimer);
    if (!isMobile) {
      setHoveredCardIndex(index);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      // Add a small delay before flipping back to prevent rapid flipping when moving mouse
      hoverTimer = setTimeout(() => {
        setHoveredCardIndex(null);
      }, 100);
    }
  };

  const handleCardClick = (index: number, archetype: typeof careerImages[0]) => {
    if (isMobile) {
      // Toggle the flipped state for the clicked card
      setFlippedCards(prev => {
        const newSet = new Set(prev);
        if (newSet.has(index)) {
          newSet.delete(index);
        } else {
          newSet.add(index);
        }
        return newSet;
      });
    } else {
      setSelected(archetype);
    }
  };

  return (
    <section className="w-full py-12 px-4 md:px-0">
      <h2 className="text-3xl md:text-4xl font-bold text-[#2F2F2F] mb-10 text-center">
        Get Your <span className="text-[#9F262A]">Career Insights</span>
      </h2>

      {/* Title section for all archetypes */}
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-[#9F262A]">Learning Archetypes</h3>
        <p className="text-gray-600 mt-2 max-w-3xl mx-auto">
          Discover your unique learning and career path through our 16 archetypes. Each archetype represents a different set of strengths, interests, and potential career directions.
        </p>
      </div>

      {/* Centered Grid Container */}
      <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6 mb-10 max-w-6xl">
          {careerImages.map((archetype, index) => (
            <div key={index} className="perspective">
              <div 
                className={`relative h-60 w-60 transition-all duration-500 preserve-3d cursor-pointer ${
                  isMobile 
                    ? flippedCards.has(index) ? 'rotate-y-180' : ''
                    : hoveredCardIndex === index ? 'rotate-y-180' : ''
                }`}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleCardClick(index, archetype)}
              >
                {/* Front of card */}
                <div 
                  className="absolute w-full h-full backface-hidden bg-white rounded-xl shadow-md overflow-hidden"
                >
                  <img 
                    src={archetype.src} 
                    alt={archetype.label} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/bearmascot-shirt.png';
                    }}
                  />
                </div>
 
                {/* Back of card */}
                <div 
                  className="absolute w-full h-full backface-hidden rotate-y-180 bg-white rounded-xl shadow-md p-4 flex flex-col"
                >
                  <h4 className="text-sm font-medium text-gray-800 mb-2 text-center"></h4>
                  <p className="text-xs text-gray-700 mb-2 font-semibold">{archetype.university}</p>
                  <div className="mt-auto">
                    <p className="text-xs text-gray-900 font-semibold mb-1">Best-fit Majors:</p>
                    <div className="flex flex-wrap gap-1">
                      {archetype.majors.map((major, idx) => (
                        <span key={idx} className="px-2 py-1 bg-gray-100 text-xs rounded text-[#9F262A]">
                          {major}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-2 text-center">
                <div className="font-bold text-[#9F262A]">{getArchetypeName(archetype.label)}</div>
                <div className="text-sm text-[#9F262A]">{archetype.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal - Only show on desktop */}
      {selected && !isMobile && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-xl p-8 shadow-lg max-w-3xl w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-2 right-3 text-[#9F262A] text-xl font-bold"
            >
              ×
            </button>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3">
                <img
                  src={selected.src}
                  alt={selected.label}
                  className="w-full h-auto object-cover rounded-md shadow-md"
                />
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <h3 className="text-xl font-bold text-[#9F262A] mb-1">{selected.label}</h3>
                  <p className="text-lg font-medium text-gray-800">{getArchetypeName(selected.label)}</p>
                </div>
              </div>

              <div className="md:w-2/3 space-y-4">
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-1">College/Faculty Direction</h4>
                  <p className="text-[#9F262A] font-medium">{selected.university}</p>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-1">Description</h4>
                  <p className="text-gray-700">{selected.description}</p>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">Recommended Majors</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {selected.majors.map((major, idx) => (
                      <div key={idx} className="flex items-center">
                        <span className="w-2 h-2 bg-[#9F262A] rounded-full mr-2"></span>
                        <span className="text-gray-800">{major}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

// Helper function to get archetype names
const getArchetypeName = (code: string): string => {
  const names: Record<string, string> = {
    'AN-VS': 'Visionary Scientist',
    'AN-EN': 'Engineer-Builder',
    'DI-CD': 'Data Crafter',
    'DI-CS': 'Code Sorcerer',
    'EX-BU': 'Business Maverick',
    'EX-PL': 'Policy Leader',
    'SO-ME': 'Media Storyteller',
    'SO-ED': 'Educator',
    'HE-MD': 'Future Medic',
    'HE-BT': 'Biotech Innovator',
    'AR-DS': 'Design Architect',
    'AR-FM': 'Fine-Arts Maestro',
    'GL-DM': 'Diplomat',
    'GL-TR': 'Globe-Trotter',
    'SP-AT': 'Athlete-Strategist',
    'SP-EC': 'Eco-Guardian'
  };
  return names[code] || 'Unknown Archetype';
};

export default Photos;
