
import React, { useState } from 'react';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

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
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-future-dark text-center mb-2">
          Explore <span className="text-future-primary">Universities</span> in Albania
        </h1>
        <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
          Discover the best educational institutions and find the perfect match for your future studies
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input 
              className="pl-10" 
              placeholder="Search universities..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {selectedSpecialty && (
              <Badge 
                variant="secondary"
                className="cursor-pointer hover:bg-secondary/70"
                onClick={() => setSelectedSpecialty(null)}
              >
                {selectedSpecialty} ×
              </Badge>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {filteredUniversities.map((university) => (
            <Card key={university.id} className="overflow-hidden card-hover">
              <div className="h-48 overflow-hidden">
                <img 
                  src={university.imageUrl} 
                  alt={university.name} 
                  className="w-full h-full object-cover transform transition duration-500 hover:scale-110"
                />
              </div>
              <CardHeader>
                <CardTitle>{university.name}</CardTitle>
                <CardDescription>{university.location} • Est. {university.established}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{university.description}</p>
                <div className="flex flex-wrap gap-2 mb-2">
                  {university.specialties.map(specialty => (
                    <Badge 
                      key={specialty} 
                      variant="outline" 
                      className="bg-future-light text-future-tertiary border-0 cursor-pointer hover:bg-future-light/70"
                      onClick={() => setSelectedSpecialty(specialty)}
                    >
                      {specialty}
                    </Badge>
                  ))}
                </div>
                <p className="text-sm mt-4">
                  <span className="font-semibold">Fees:</span> {university.fees}
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" className="text-future-primary border-future-primary hover:bg-future-light">
                  Learn More
                </Button>
                <Button className="bg-future-primary hover:bg-future-tertiary">
                  Visit Website
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="bg-muted rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Programs by Field</h2>
          <div className="flex flex-wrap gap-2">
            {allSpecialties.map(specialty => (
              <Badge 
                key={specialty}
                variant={selectedSpecialty === specialty ? "default" : "outline"}
                className={`cursor-pointer ${
                  selectedSpecialty === specialty 
                    ? "bg-future-primary hover:bg-future-tertiary" 
                    : "hover:bg-future-light"
                }`}
                onClick={() => setSelectedSpecialty(specialty === selectedSpecialty ? null : specialty)}
              >
                {specialty}
              </Badge>
            ))}
          </div>
        </div>
      </main>
      
      <footer className="bg-future-dark text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="font-bold text-xl">
                Match<span className="text-future-primary">Future</span>
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
