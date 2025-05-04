// components/Internships.tsx
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Internship = {
  id: number;
  title: string;
  university: string;
  faculty: string;
  location: string;
  duration: string;
  description: string;
  requirements: string[];
  stipend: string;
  application_deadline: string;
  is_remote: boolean;
};

const internships: Internship[] = [
  {
    id: 1,
    title: "Research Assistant Intern",
    university: "University of Technology",
    faculty: "Computer Science",
    location: "Hybrid",
    duration: "6 months",
    description: "Join our research team working on cutting-edge AI projects. Assist in data collection, analysis, and implementation of machine learning models.",
    requirements: ["Python", "Machine Learning", "Data Analysis"],
    stipend: "€800/month",
    application_deadline: "2024-06-30",
    is_remote: true,
  },
  {
    id: 2,
    title: "Software Development Intern",
    university: "Technical University",
    faculty: "Engineering",
    location: "On-site",
    duration: "3 months",
    description: "Work on university's digital transformation projects. Develop and maintain web applications using modern frameworks.",
    requirements: ["JavaScript", "React", "Node.js"],
    stipend: "€1000/month",
    application_deadline: "2024-07-15",
    is_remote: false,
  },
  {
    id: 3,
    title: "Data Science Intern",
    university: "Business University",
    faculty: "Business Analytics",
    location: "Remote",
    duration: "4 months",
    description: "Analyze university data to improve student engagement and academic performance. Create predictive models and visualizations.",
    requirements: ["Python", "SQL", "Data Visualization"],
    stipend: "€900/month",
    application_deadline: "2024-08-01",
    is_remote: true,
  },
];

const Internships: React.FC = () => {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {internships.map((internship) => (
          <Card key={internship.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-semibold text-[#2F2F2F]">{internship.title}</h2>
                  <p className="text-[#9F262A] font-medium">
                    {internship.university}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {internship.faculty}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="bg-rose-50">
                    {internship.location}
                  </Badge>
                  <Badge variant="outline" className="bg-rose-50">
                    {internship.duration}
                  </Badge>
                  {internship.is_remote && (
                    <Badge variant="outline" className="bg-rose-50">
                      Remote
                    </Badge>
                  )}
                </div>

                <p className="text-gray-700">{internship.description}</p>

                <div>
                  <h3 className="font-medium text-[#2F2F2F] mb-2">Requirements:</h3>
                  <div className="flex flex-wrap gap-2">
                    {internship.requirements.map((req, index) => (
                      <Badge key={index} variant="secondary" className="bg-gray-100">
                        {req}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span>{internship.stipend}</span>
                  <span>Deadline: {new Date(internship.application_deadline).toLocaleDateString()}</span>
                </div>

                <Button 
                  className="w-full bg-[#9F262A] hover:bg-[#D86D70] text-white"
                  onClick={() => {/* TODO: Implement application logic */}}
                >
                  Apply Now
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Internships;
