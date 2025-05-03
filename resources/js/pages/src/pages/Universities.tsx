import React, { useState } from 'react';
// Comment out components that don't exist yet
// import Header from '@/components/Header';
// import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { Input } from '@/components/ui/input';
// import { Search } from 'lucide-react';

interface University {
  id: number;
  name: string;
  location: string;
  description: string;
  specialties: string[];
  imageUrl: string;
  established: string;
  website: string;
  fees: string;
}

const universities: University[] = [
  {
    id: 1,
    name: "University of Tirana",
    location: "Tirana",
    description: "The largest and oldest university in Albania, offering various programs across multiple disciplines.",
    specialties: ["Medicine", "Law", "Economics", "Social Sciences", "Natural Sciences"],
    imageUrl: "https://images.pexels.com/photos/159490/yale-university-landscape-universities-schools-159490.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    established: "1957",
    website: "www.unitir.edu.al",
    fees: "€1,000 - €2,500 per year"
  },
  {
    id: 2,
    name: "Epoka University",
    location: "Tirana",
    description: "Private university with strong international connections and modern teaching methods.",
    specialties: ["Engineering", "Architecture", "Business Administration", "Computer Engineering"],
    imageUrl: "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    established: "2007",
    website: "www.epoka.edu.al",
    fees: "€2,500 - €4,000 per year"
  },
  {
    id: 3,
    name: "Canadian Institute of Technology",
    location: "Tirana",
    description: "Modern university incorporating Canadian educational standards with technology-focused programs.",
    specialties: ["Information Technology", "Business Informatics", "Digital Marketing", "Finance"],
    imageUrl: "https://images.pexels.com/photos/159494/book-education-knowledge-campus-159494.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    established: "2011",
    website: "www.cit.edu.al",
    fees: "€2,000 - €3,500 per year"
  },
  {
    id: 4,
    name: "Agricultural University of Tirana",
    location: "Tirana",
    description: "Specialized university focusing on agricultural sciences and related fields.",
    specialties: ["Agricultural Sciences", "Veterinary Medicine", "Forestry", "Economics"],
    imageUrl: "https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    established: "1971",
    website: "www.ubt.edu.al",
    fees: "€900 - €1,800 per year"
  },
  {
    id: 5,
    name: "University of New York Tirana",
    location: "Tirana",
    description: "Branch of the American university offering various undergraduate and graduate programs.",
    specialties: ["Business", "Economics", "Computer Science", "Political Science"],
    imageUrl: "https://images.pexels.com/photos/2982449/pexels-photo-2982449.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    established: "2002",
    website: "www.unyt.edu.al",
    fees: "€5,000 - €7,000 per year"
  },
  {
    id: 6,
    name: "Polis University",
    location: "Tirana",
    description: "Institution specialized in architecture, design, and urban planning studies.",
    specialties: ["Architecture", "Urban Planning", "Design", "Construction Management"],
    imageUrl: "https://images.pexels.com/photos/1320686/pexels-photo-1320686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    established: "2006",
    website: "www.universitetipolis.edu.al",
    fees: "€2,800 - €4,200 per year"
  }
];

const Universities: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null);
  
  // Extract all unique specialties
  const allSpecialties = Array.from(
    new Set(universities.flatMap(uni => uni.specialties))
  ).sort();
  
  // Filter universities based on search term and specialty
  const filteredUniversities = universities.filter(uni => {
    const matchesSearch = uni.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        uni.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty ? uni.specialties.includes(selectedSpecialty) : true;
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* <Header /> */}
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">
          Explore Universities in Albania
        </h1>
        <p className="text-center mb-8 max-w-2xl mx-auto">
          Discover the best educational institutions and find the perfect match for your future studies
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <input 
              className="w-full p-2 border rounded" 
              placeholder="Search universities..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {selectedSpecialty && (
              <button 
                className="px-3 py-1 bg-gray-200 rounded-full cursor-pointer"
                onClick={() => setSelectedSpecialty(null)}
              >
                {selectedSpecialty} ×
              </button>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {filteredUniversities.map((university) => (
            <div key={university.id} className="border rounded-lg overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img 
                  src={university.imageUrl} 
                  alt={university.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold">{university.name}</h3>
                <p className="text-sm text-gray-600">{university.location} • Est. {university.established}</p>
                <p className="text-sm my-4">{university.description}</p>
                <div className="flex flex-wrap gap-2 mb-2">
                  {university.specialties.map(specialty => (
                    <span 
                      key={specialty} 
                      className="px-2 py-1 bg-gray-100 text-sm rounded cursor-pointer"
                      onClick={() => setSelectedSpecialty(specialty)}
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
                <p className="text-sm mt-4">
                  <span className="font-semibold">Fees:</span> {university.fees}
                </p>
              </div>
              <div className="p-4 flex justify-between border-t">
                <button className="px-4 py-2 border rounded">
                  Learn More
                </button>
                <button className="px-4 py-2 bg-red-700 text-white rounded">
                  Visit Website
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-gray-100 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Programs by Field</h2>
          <div className="flex flex-wrap gap-2">
            {allSpecialties.map(specialty => (
              <span 
                key={specialty}
                className={`px-3 py-1 rounded-full cursor-pointer ${
                  selectedSpecialty === specialty 
                    ? "bg-red-700 text-white" 
                    : "bg-gray-200"
                }`}
                onClick={() => setSelectedSpecialty(specialty === selectedSpecialty ? null : specialty)}
              >
                {specialty}
              </span>
            ))}
          </div>
        </div>
      </main>
      
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="font-bold text-xl">
                UMatch
              </span>
              <p className="text-sm text-gray-400 mt-1">
                Guiding Albanian students to their perfect future
              </p>
            </div>
            
            <div className="flex flex-wrap gap-6 justify-center">
              <a href="/" className="text-sm text-gray-400 hover:text-white">Home</a>
              <a href="/universities" className="text-sm text-gray-400 hover:text-white">Universities</a>
              <a href="/careers" className="text-sm text-gray-400 hover:text-white">Careers</a>
              <a href="#" className="text-sm text-gray-400 hover:text-white">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Universities;
