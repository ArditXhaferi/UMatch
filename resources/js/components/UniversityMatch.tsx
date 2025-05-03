
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PersonalityResult } from './PersonalityQuiz';
import { cn } from '@/lib/utils';

type University = {
  id: number;
  name: string;
  description: string;
  matchScore: number;
  programs: string[];
  location: string;
  imageUrl: string;
};

type UniversityMatchProps = {
  personalityResult: PersonalityResult;
  className?: string;
};

const universities: University[] = [
  {
    id: 1,
    name: "University of Tirana",
    description: "Albania's largest and most prestigious public university with a wide range of programs.",
    matchScore: 92,
    programs: ["Computer Science", "Medicine", "Law", "Economics"],
    location: "Tirana",
    imageUrl: "https://images.pexels.com/photos/159490/yale-university-landscape-universities-schools-159490.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 2,
    name: "Epoka University",
    description: "Private university known for its modern approach to education and strong international connections.",
    matchScore: 88,
    programs: ["Architecture", "Civil Engineering", "Business Administration"],
    location: "Tirana",
    imageUrl: "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 3,
    name: "Canadian Institute of Technology",
    description: "Modern university with Canadian educational standards and technology-focused programs.",
    matchScore: 85,
    programs: ["Information Technology", "Business Informatics", "Digital Marketing"],
    location: "Tirana",
    imageUrl: "https://images.pexels.com/photos/159494/book-education-knowledge-campus-159494.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
];

const UniversityMatch: React.FC<UniversityMatchProps> = ({ personalityResult, className }) => {
  // Simple algorithm to match universities based on personality
  // In a real app, this would be much more sophisticated
  const matched = universities.map(uni => {
    // Adjust match score based on personality
    let adjustedScore = uni.matchScore;

    // For this demo, we'll make some simple adjustments based on personality type
    if (personalityResult.type.includes("The Protagonist") && uni.programs.includes("Psychology")) {
      adjustedScore += 5;
    }

    if (personalityResult.type.includes("The Architect") && uni.programs.includes("Computer Science")) {
      adjustedScore += 7;
    }

    if (personalityResult.type.includes("The Adventurer") && uni.programs.includes("Architecture")) {
      adjustedScore += 6;
    }

    return {
      ...uni,
      matchScore: Math.min(adjustedScore, 100)  // Cap at 100%
    };
  }).sort((a, b) => b.matchScore - a.matchScore);

  return (
    <div className={cn("max-w-4xl mx-auto p-4", className)}>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-future-dark mb-2">Your University Matches</h2>
        <p className="text-muted-foreground">
          Based on your {personalityResult.type} personality type, we've found these universities that might be perfect for you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {matched.map((university) => (
          <Card key={university.id} className="overflow-hidden card-hover">
            <div className="h-48 overflow-hidden">
              <img
                src={university.imageUrl}
                alt={university.name}
                className="w-full h-full object-cover transform transition duration-500 hover:scale-110"
              />
            </div>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl">{university.name}</CardTitle>
                <Badge className="badge-match">
                  {university.matchScore}% Match
                </Badge>
              </div>
              <CardDescription>{university.location}</CardDescription>
            </CardHeader>
            <CardContent className="pb-4">
              <p className="text-sm text-gray-700 mb-4">{university.description}</p>
              <div className="flex flex-wrap gap-2">
                {university.programs.slice(0, 3).map((program) => (
                  <Badge key={program} variant="outline" className="bg-future-light text-future-tertiary border-0">
                    {program}
                  </Badge>
                ))}
                {university.programs.length > 3 && (
                  <Badge variant="outline" className="bg-transparent">
                    +{university.programs.length - 3} more
                  </Badge>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full border-future-primary text-future-primary hover:bg-future-light">
                Explore University
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UniversityMatch;
