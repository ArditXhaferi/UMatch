import React, { useState } from 'react';
// Comment out components that don't exist yet
// import Header from '@/components/Header';
// import Photos from '@/components/Photos';
// import Avatar from '@/components/Avatar';
// import PersonalityQuiz, { PersonalityResult } from '@/components/PersonalityQuiz';
// import UniversityMatch from '@/components/UniversityMatch';
// import CareerPathway from '@/components/CareerPathway';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { Card, CardContent } from '@/components/ui/card';
import logowhite from '../../assets/navbar/UMatch-white.png';

// PersonalityResult interface will be uncommented when we implement the full functionality
// interface PersonalityResult {
//   type: string;
//   description: string;
//   strengths: string[];
//   suggestedFields: string[];
// }

enum Step {
  WELCOME,
  QUIZ,
  RESULTS,
}

const Index = () => {
  // We're using currentStep state but keeping the other state variables 
  // for when we implement the full functionality
  const [currentStep, setCurrentStep] = useState<Step>(Step.WELCOME);
  
  // These state variables will be used in the future implementation
  // const [personalityResult, setPersonalityResult] = useState<PersonalityResult | null>(null);
  // const [activeTab, setActiveTab] = useState<'universities' | 'careers'>('universities');

  return (
    <div className="min-h-screen flex flex-col">
      {/* <Header /> */}
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-center text-4xl font-bold mb-6">
            Match With Your <span className="text-red-800">Future</span>
          </h1>
          <p className="text-center text-xl max-w-2xl mx-auto mb-12">
            Discover your perfect university and career path with our
            AI-powered guidance platform for Albanian high school students.
          </p>
          
          {/* Simple placeholder content */}
          <div className="flex justify-center">
            <button 
              onClick={() => setCurrentStep(Step.QUIZ)} 
              className="px-6 py-3 bg-red-800 text-white rounded-lg hover:bg-red-700"
            >
              Start Quiz
            </button>
          </div>
          
          {/* Display a message based on current step */}
          {currentStep === Step.QUIZ && (
            <div className="mt-10 text-center">
              <p>Quiz content will be implemented soon.</p>
              <button 
                onClick={() => setCurrentStep(Step.WELCOME)}
                className="mt-4 px-4 py-2 bg-gray-200 rounded-lg"
              >
                Back to Welcome
              </button>
            </div>
          )}
        </div>
      </main>
      
      <footer className="bg-red-800 text-white py-12 mt-16">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* 1. Brand Overview */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img src={logowhite} alt="UMatch Logo" className="h-8 w-auto" />
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              Empowering Albanian students to explore university and career opportunities through AI-driven insights and quizzes.
            </p>
          </div>

          {/* 2. Main Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Explore</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#" className="hover:text-white transition">Home</a></li>
              <li><a href="#" className="hover:text-white transition">Universities</a></li>
              <li><a href="#" className="hover:text-white transition">Careers</a></li>
              <li><a href="#" className="hover:text-white transition">About</a></li>
            </ul>
          </div>

          {/* Footer content */}
        </div>
        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-xs text-white">
          © {new Date().getFullYear()} UMatch. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Index;