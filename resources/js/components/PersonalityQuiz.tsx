
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

type Question = {
  id: number;
  text: string;
  options: {
    id: string;
    text: string;
    type: string;
  }[];
};

type PersonalityQuizProps = {
  onComplete: (result: PersonalityResult) => void;
  className?: string;
};

export type PersonalityResult = {
  type: string;
  description: string;
  strengths: string[];
  suggestedFields: string[];
};

const questions: Question[] = [
  {
    id: 1,
    text: "When making decisions, you typically:",
    options: [
      { id: "1a", text: "Consider how it affects everyone involved", type: "F" },
      { id: "1b", text: "Analyze the logical pros and cons", type: "T" },
    ],
  },
  {
    id: 2,
    text: "In your free time, you prefer to:",
    options: [
      { id: "2a", text: "Attend social events with many people", type: "E" },
      { id: "2b", text: "Spend time with a few close friends or alone", type: "I" },
    ],
  },
  {
    id: 3,
    text: "When learning something new, you'd rather:",
    options: [
      { id: "3a", text: "Understand the big picture concepts first", type: "N" },
      { id: "3b", text: "Learn specific details and practical applications", type: "S" },
    ],
  },
  {
    id: 4,
    text: "Your approach to projects is usually to:",
    options: [
      { id: "4a", text: "Plan thoroughly before starting", type: "J" },
      { id: "4b", text: "Adapt as you go and keep options open", type: "P" },
    ],
  },
  {
    id: 5,
    text: "When facing a challenge, you tend to:",
    options: [
      { id: "5a", text: "Trust your instincts and feelings", type: "F" },
      { id: "5b", text: "Rely on facts and evidence", type: "T" },
    ],
  },
];

const personalityTypes: Record<string, PersonalityResult> = {
  ENFJ: {
    type: "The Protagonist",
    description: "Charismatic and inspiring leaders who motivate others to achieve common goals.",
    strengths: ["Communication", "Empathy", "Leadership"],
    suggestedFields: ["Education", "Psychology", "Human Resources"]
  },
  ENTJ: {
    type: "The Commander",
    description: "Strategic thinkers with leadership abilities and drive to implement visions.",
    strengths: ["Leadership", "Strategy", "Decisiveness"],
    suggestedFields: ["Business", "Law", "Engineering Management"]
  },
  INFJ: {
    type: "The Advocate",
    description: "Creative and idealistic with a deep sense of purpose and conviction.",
    strengths: ["Insight", "Creativity", "Determination"],
    suggestedFields: ["Counseling", "Writing", "Healthcare"]
  },
  INTJ: {
    type: "The Architect",
    description: "Analytical and strategic thinkers focused on turning theories into plans.",
    strengths: ["Strategic Thinking", "Independence", "Rationality"],
    suggestedFields: ["Sciences", "Computer Science", "Architecture"]
  },
  ISFP: {
    type: "The Adventurer",
    description: "Flexible and artistic, you live in the moment and value personal freedom.",
    strengths: ["Aesthetics", "Adaptability", "Curiosity"],
    suggestedFields: ["Arts", "Design", "Environmental Sciences"]
  },
};

const getDefaultType = (): PersonalityResult => ({
  type: "The Explorer",
  description: "Curious and adaptable, you enjoy discovering new possibilities.",
  strengths: ["Adaptability", "Curiosity", "Quick Learning"],
  suggestedFields: ["Interdisciplinary Studies", "Research", "Tourism"]
});

const PersonalityQuiz: React.FC<PersonalityQuizProps> = ({ onComplete, className }) => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleAnswer = (type: string) => {
    const newAnswers = { ...answers, [currentQuestion]: type };
    setAnswers(newAnswers);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate result
      const types = Object.values(newAnswers);
      let personalityCode = "";
      
      // This is a simplified version - a real implementation would have more questions
      // and better type calculation
      const e = types.filter(t => t === "E").length;
      const i = types.filter(t => t === "I").length;
      personalityCode += e > i ? "E" : "I";
      
      const n = types.filter(t => t === "N").length;
      const s = types.filter(t => t === "S").length;
      personalityCode += n > s ? "N" : "S";
      
      const f = types.filter(t => t === "F").length;
      const t = types.filter(t => t === "T").length;
      personalityCode += f > t ? "F" : "T";
      
      const j = types.filter(t => t === "J").length;
      const p = types.filter(t => t === "P").length;
      personalityCode += j > p ? "J" : "P";
      
      const result = personalityTypes[personalityCode] || getDefaultType();
      onComplete(result);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const question = questions[currentQuestion];

  return (
    <div className={cn("max-w-2xl mx-auto p-4", className)}>
      <h2 className="text-2xl font-bold mb-6 text-future-dark text-center">Discover Your Personality Type</h2>
      
      <div className="mb-6">
        <Progress value={progress} className="h-2" />
        <p className="text-sm text-right mt-1 text-muted-foreground">
          Question {currentQuestion + 1} of {questions.length}
        </p>
      </div>
      
      <Card className="p-6 shadow-md">
        <h3 className="text-xl font-semibold mb-6">{question.text}</h3>
        
        <div className="space-y-4">
          {question.options.map((option) => (
            <Button
              key={option.id}
              onClick={() => handleAnswer(option.type)}
              variant="outline"
              className="w-full justify-start text-left p-4 hover:bg-future-light hover:text-future-primary"
            >
              {option.text}
            </Button>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default PersonalityQuiz;
