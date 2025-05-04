// components/Internships.tsx
import React from "react";

type Internship = {
  id: number;
  title: string;
  company: string;
  location: string;
  duration: string;
  description: string;
};

const internships: Internship[] = [
  {
    id: 1,
    title: "Frontend Developer Intern",
    company: "CodeCraft Inc.",
    location: "Remote",
    duration: "3 months",
    description: "Help build UI components in React and improve user experience.",
  },
  {
    id: 2,
    title: "Data Analyst Intern",
    company: "DataMinds",
    location: "New York, NY",
    duration: "6 months",
    description: "Work with large data sets, create dashboards, and support business decisions.",
  },
  {
    id: 3,
    title: "Marketing Intern",
    company: "BrightLaunch",
    location: "Los Angeles, CA",
    duration: "Summer 2025",
    description: "Assist in campaign planning, social media content, and outreach strategies.",
  },
];

const Internships: React.FC = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto mb-15">
      <div className="grid gap-6">
        {internships.map((internship) => (
          <div
            key={internship.id}
            className="bg-rose-50 border border-gray-200 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              <h2 className="text-xl font-semibold">{internship.title}</h2>
              <p className="text-gray-600">
                {internship.company} — {internship.location}
              </p>
              <p className="text-sm text-gray-500 mb-2">{internship.duration}</p>
              <p className="mb-4">{internship.description}</p>
            </div>
            <button className="self-start bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition">
              Apply Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Internships;
