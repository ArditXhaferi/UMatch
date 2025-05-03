
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

type Message = {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
};

const careerOptions = [
  { name: "Medicine", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Doctor&eyes=variant15" },
  { name: "Architecture", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Architect&eyes=variant12" },
  { name: "Computer Science", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Developer&eyes=variant07" },
  { name: "Business", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Business&eyes=variant09" },
];

const generateDayInLife = (career: string): string[] => {
  switch (career) {
    case 'Medicine':
      return [
        "6:00 AM - Early morning. Your alarm goes off and you prepare for a long day.",
        "7:30 AM - Arrive at the hospital for morning rounds with your attending physician.",
        "9:00 AM - Attend a lecture on the latest research in your specialty.",
        "11:00 AM - Clinical rotations begin. You see patients alongside residents.",
        "1:30 PM - Quick lunch while reviewing patient charts.",
        "2:00 PM - Back to clinical work. Practice suturing techniques in a skills lab.",
        "5:00 PM - Study session with classmates for upcoming exams.",
        "8:00 PM - Finally heading home. Review notes from today's patients.",
        "10:00 PM - Prepare for tomorrow before getting some rest."
      ];
    case 'Architecture':
      return [
        "7:00 AM - Wake up and sketch some ideas that came to you overnight.",
        "8:30 AM - Studio time. Work on your latest design project.",
        "10:00 AM - Critique session with professors who review your work.",
        "12:00 PM - Lunch with classmates discussing sustainable design approaches.",
        "1:30 PM - Design history lecture about modernist architecture.",
        "3:00 PM - Workshop time learning new 3D modeling software.",
        "5:30 PM - Visit a construction site to see building techniques in person.",
        "7:00 PM - Back to the studio to refine your project based on feedback.",
        "11:00 PM - Finally head home after a creative but exhausting day."
      ];
    case 'Computer Science':
      return [
        "8:00 AM - Check emails and review code you wrote yesterday.",
        "9:30 AM - Algorithms class covering advanced graph theory.",
        "11:00 AM - Work on your group project in the computer lab.",
        "1:00 PM - Lunch while attending a tech talk by an industry guest.",
        "2:30 PM - Artificial Intelligence lecture and practical exercises.",
        "4:00 PM - Office hours with your professor to discuss your research.",
        "5:30 PM - Coding club meeting where you practice for competitions.",
        "7:00 PM - Dinner and then more work on personal coding projects.",
        "10:00 PM - Review tomorrow's materials before bed."
      ];
    case 'Business':
      return [
        "7:30 AM - Check financial news while getting ready.",
        "9:00 AM - Marketing strategy class with case study presentations.",
        "11:00 AM - Work on financial models for your business simulation project.",
        "12:30 PM - Networking lunch with a guest speaker from a consulting firm.",
        "2:00 PM - Team meeting to prepare for your entrepreneurship pitch.",
        "3:30 PM - Economics lecture focusing on global markets.",
        "5:00 PM - Business club meeting discussing internship opportunities.",
        "6:30 PM - Work on resume and applications for summer internships.",
        "9:00 PM - Read case studies for tomorrow's classes."
      ];
    default:
      return ["Select a career to see what a typical day might look like."];
  }
};

const DayInLifeSimulation: React.FC = () => {
  const [selectedCareer, setSelectedCareer] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi there! I can show you what a typical day is like for students in different programs. Which career path are you interested in exploring?",
      sender: 'ai',
      timestamp: new Date(),
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleCareerSelect = (career: string) => {
    setSelectedCareer(career);
    setIsTyping(true);
    
    // Add user message
    setMessages(prev => [
      ...prev,
      {
        id: prev.length + 1,
        text: `I'd like to learn about a day in the life of a ${career} student.`,
        sender: 'user',
        timestamp: new Date(),
      }
    ]);
    
    // Simulate AI typing
    setTimeout(() => {
      const daySchedule = generateDayInLife(career);
      setMessages(prev => [
        ...prev,
        {
          id: prev.length + 1,
          text: `Here's what a typical day looks like for a ${career} student:`,
          sender: 'ai',
          timestamp: new Date(),
        }
      ]);
      
      // Send schedule items with delay to simulate typing
      daySchedule.forEach((item, index) => {
        setTimeout(() => {
          setMessages(prev => [
            ...prev,
            {
              id: prev.length + 1,
              text: item,
              sender: 'ai',
              timestamp: new Date(),
            }
          ]);
          
          // When last message is sent
          if (index === daySchedule.length - 1) {
            setTimeout(() => {
              setMessages(prev => [
                ...prev,
                {
                  id: prev.length + 1,
                  text: "Would you like to explore another career path?",
                  sender: 'ai',
                  timestamp: new Date(),
                }
              ]);
              setIsTyping(false);
            }, 1000);
          }
        }, index * 1000); // Send each message with a delay
      });
    }, 1500);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-future-primary" />
          Day in the Life Simulation
        </CardTitle>
        <CardDescription>
          Chat with an AI to experience a typical day as a student in various programs
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
          <CollapsibleTrigger asChild>
            <Button 
              variant="outline" 
              className="w-full justify-between"
            >
              {isOpen ? "Hide Simulation" : "Try the Day in Life Simulation"}
              <span className="text-xs text-muted-foreground">
                {isOpen ? "↑" : "↓"}
              </span>
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4">
            <div className="flex flex-col h-[400px] border rounded-md">
              <div className="flex-grow overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.sender === 'user'
                          ? 'bg-future-primary text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 text-gray-800 rounded-lg p-3">
                      <span className="animate-pulse">Typing...</span>
                    </div>
                  </div>
                )}
              </div>
              
              {!selectedCareer && (
                <div className="p-4 border-t">
                  <p className="text-sm mb-2 text-muted-foreground">Choose a career path:</p>
                  <div className="flex flex-wrap gap-2">
                    {careerOptions.map((career) => (
                      <Button
                        key={career.name}
                        variant="outline"
                        className="flex items-center gap-2"
                        onClick={() => handleCareerSelect(career.name)}
                      >
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={career.avatar} alt={career.name} />
                          <AvatarFallback>{career.name[0]}</AvatarFallback>
                        </Avatar>
                        {career.name}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
              
              {selectedCareer && (
                <div className="p-4 border-t">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedCareer(null);
                      setMessages([
                        {
                          id: 1,
                          text: "Hi there! I can show you what a typical day is like for students in different programs. Which career path are you interested in exploring?",
                          sender: 'ai',
                          timestamp: new Date(),
                        }
                      ]);
                    }}
                    className="w-full"
                  >
                    Try Another Career
                  </Button>
                </div>
              )}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
};

export default DayInLifeSimulation;
