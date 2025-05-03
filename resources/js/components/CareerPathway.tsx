
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PersonalityResult } from './PersonalityQuiz';
import { cn } from '@/lib/utils';

type CareerPath = {
  id: number;
  title: string;
  description: string;
  steps: CareerStep[];
  salary: string;
  growthRate: string;
  matchScore: number;
};

type CareerStep = {
  title: string;
  description: string;
  timeframe: string;
};

type CareerPathwayProps = {
  personalityResult: PersonalityResult;
  className?: string;
};

const careerPaths: CareerPath[] = [
  {
    id: 1,
    title: "Software Developer",
    description: "Design, code, and test computer programs and applications",
    matchScore: 94,
    salary: "€25,000 - €60,000",
    growthRate: "High",
    steps: [
      {
        title: "Computer Science Degree",
        description: "Bachelor's in Computer Science or related field",
        timeframe: "3-4 years"
      },
      {
        title: "Junior Developer",
        description: "Entry-level position focusing on code implementation",
        timeframe: "1-2 years"
      },
      {
        title: "Mid-level Developer",
        description: "Independent work on significant features",
        timeframe: "2-4 years"
      },
      {
        title: "Senior Developer",
        description: "Lead development efforts and mentor juniors",
        timeframe: "3+ years"
      }
    ]
  },
  {
    id: 2,
    title: "Marketing Specialist",
    description: "Create and implement marketing strategies for products and services",
    matchScore: 88,
    salary: "€20,000 - €45,000",
    growthRate: "Moderate",
    steps: [
      {
        title: "Marketing Degree",
        description: "Bachelor's in Marketing, Business, or Communications",
        timeframe: "3-4 years"
      },
      {
        title: "Marketing Assistant",
        description: "Support role in marketing department",
        timeframe: "1-2 years"
      },
      {
        title: "Marketing Specialist",
        description: "Develop and implement marketing campaigns",
        timeframe: "2-3 years"
      },
      {
        title: "Marketing Manager",
        description: "Lead marketing strategies and team",
        timeframe: "3+ years"
      }
    ]
  },
  {
    id: 3,
    title: "Architect",
    description: "Design buildings and structures with creativity and technical knowledge",
    matchScore: 82,
    salary: "€22,000 - €50,000",
    growthRate: "Moderate",
    steps: [
      {
        title: "Architecture Degree",
        description: "Bachelor's and Master's in Architecture",
        timeframe: "5-6 years"
      },
      {
        title: "Architectural Intern",
        description: "Work under licensed architects to gain experience",
        timeframe: "1-2 years"
      },
      {
        title: "Junior Architect",
        description: "Contribute to design projects with supervision",
        timeframe: "2-3 years"
      },
      {
        title: "Licensed Architect",
        description: "Independently lead architectural projects",
        timeframe: "3+ years"
      }
    ]
  }
];

const CareerPathway: React.FC<CareerPathwayProps> = ({ personalityResult, className }) => {
  const [selectedPath, setSelectedPath] = useState<CareerPath | null>(null);

  // Filter careers based on personality - simple algorithm for demo purposes
  const matchedCareers = careerPaths.map(career => {
    // Adjust match score based on personality and suggested fields
    let adjustedScore = career.matchScore;

    personalityResult.suggestedFields.forEach(field => {
      if (
        (field === "Computer Science" && career.title === "Software Developer") ||
        (field === "Design" && career.title === "Architect") ||
        (field === "Business" && career.title === "Marketing Specialist")
      ) {
        adjustedScore += 5;
      }
    });

    return {
      ...career,
      matchScore: Math.min(adjustedScore, 100)  // Cap at 100%
    };
  }).sort((a, b) => b.matchScore - a.matchScore);

  return (
    <div className={cn("max-w-4xl mx-auto p-4", className)}>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-future-dark mb-2">Explore Career Pathways</h2>
        <p className="text-muted-foreground">
          Discover potential career paths based on your personality and interests.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {!selectedPath ? (
          // Show list of careers
          matchedCareers.map((career) => (
            <Card key={career.id} className="card-hover cursor-pointer" onClick={() => setSelectedPath(career)}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle>{career.title}</CardTitle>
                  <Badge className="badge-match">{career.matchScore}%</Badge>
                </div>
                <CardDescription>Avg. Salary: {career.salary}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">{career.description}</p>
                <div className="flex justify-between text-sm">
                  <span>Growth: {career.growthRate}</span>
                  <span className="text-future-primary font-medium">View Pathway →</span>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          // Show selected career pathway
          <>
            <div className="md:col-span-3">
              <Button
                variant="ghost"
                className="mb-4"
                onClick={() => setSelectedPath(null)}
              >
                ← Back to all careers
              </Button>

              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-2xl">{selectedPath.title}</CardTitle>
                    <Badge className="badge-match">{selectedPath.matchScore}% Match</Badge>
                  </div>
                  <CardDescription className="text-lg">
                    Salary Range: {selectedPath.salary} | Growth: {selectedPath.growthRate}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-6">{selectedPath.description}</p>

                  <div className="relative">
                    {/* Career path visualization */}
                    <div className="absolute left-4 top-0 bottom-0 w-1 bg-future-primary"></div>

                    <div className="space-y-8">
                      {selectedPath.steps.map((step, index) => (
                        <div key={index} className="relative pl-12">
                          <div className="absolute left-2.5 -translate-x-1/2 h-8 w-8 rounded-full bg-future-primary text-white flex items-center justify-center">
                            {index + 1}
                          </div>
                          <h4 className="text-lg font-semibold">{step.title}</h4>
                          <p className="text-muted-foreground text-sm mb-2">Duration: {step.timeframe}</p>
                          <p>{step.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CareerPathway;
