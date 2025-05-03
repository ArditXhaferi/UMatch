
import React from 'react';
import Header from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import DayInLifeSimulation from '@/components/DayInLifeSimulation';
import AlumniCareerPredictor from '@/components/AlumniCareerPredictor';
import AIInterviewPractice from '@/components/AIInterviewPractice';
import EmotionalCheckIn from '@/components/EmotionalCheckIn';

const Careers = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-future-dark">Career Exploration</h1>
          <p className="text-muted-foreground mb-8">Discover and prepare for your ideal career path with AI-powered tools</p>
          
          <div className="space-y-8">
            <DayInLifeSimulation />
            <AlumniCareerPredictor />
            <AIInterviewPractice />
            <EmotionalCheckIn />
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
              <a href="#" className="text-sm text-gray-400 hover:text-white">About Us</a>
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

export default Careers;
