
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

type Emotion = 'excited' | 'hopeful' | 'confused' | 'anxious' | 'neutral';

type EmotionResponse = {
  message: string;
  recommendation: string;
  resourceType: 'video' | 'article' | 'exercise';
  resourceTitle: string;
  resourceDescription: string;
};

const emotionResponses: Record<Emotion, EmotionResponse> = {
  excited: {
    message: "It's wonderful to hear you're excited about your future! Your enthusiasm will be a great asset on your journey.",
    recommendation: "Channel your excitement into focused exploration of your interests.",
    resourceType: 'article',
    resourceTitle: "Turning Passion into Purpose: Finding Your Dream Career Path",
    resourceDescription: "Learn how to translate your excitement into targeted academic and career goals."
  },
  hopeful: {
    message: "Hope is a powerful motivator. It's great that you're feeling optimistic about what lies ahead.",
    recommendation: "Build on your hopefulness with concrete planning steps.",
    resourceType: 'video',
    resourceTitle: "From Hope to Action: Alumni Success Stories",
    resourceDescription: "Watch inspiring stories from graduates who turned their hopes into reality through strategic steps."
  },
  confused: {
    message: "Feeling confused about your future is completely normal. Many successful professionals started without a clear path.",
    recommendation: "Break down your exploration into smaller steps to reduce overwhelm.",
    resourceType: 'exercise',
    resourceTitle: "Clarity Through Exploration: Decision-Making Framework",
    resourceDescription: "A step-by-step exercise to help sort through options and gain clarity on your next steps."
  },
  anxious: {
    message: "It's very common to feel anxious about big decisions and future uncertainties. You're not alone in this feeling.",
    recommendation: "Practice self-compassion and break down your concerns into manageable pieces.",
    resourceType: 'video',
    resourceTitle: "Overcoming Educational Anxiety: Tips from University Counselors",
    resourceDescription: "Learn practical techniques to manage anxiety about your educational and career choices."
  },
  neutral: {
    message: "Sometimes not having strong feelings either way can be a good place for objective decision-making.",
    recommendation: "This could be a good time to explore new interests without pressure.",
    resourceType: 'article',
    resourceTitle: "Finding Your Spark: Discovering Genuine Academic Interests",
    resourceDescription: "Techniques for exploring different fields until you find what truly engages you."
  }
};

const EmotionalCheckIn: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion | null>(null);
  const [showResponse, setShowResponse] = useState(false);

  const handleEmotionSelect = (emotion: Emotion) => {
    setSelectedEmotion(emotion);
    setShowResponse(true);
  };

  const handleReset = () => {
    setSelectedEmotion(null);
    setShowResponse(false);
  };

  const getEmotionEmoji = (emotion: Emotion) => {
    switch (emotion) {
      case 'excited': return '😃';
      case 'hopeful': return '🙂';
      case 'confused': return '😕';
      case 'anxious': return '😟';
      case 'neutral': return '😐';
    }
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'video': return '🎥';
      case 'article': return '📄';
      case 'exercise': return '✏️';
      default: return '📌';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-future-primary" />
          Emotional Check-In
        </CardTitle>
        <CardDescription>
          Share how you're feeling about your future and get personalized support
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
          <CollapsibleTrigger asChild>
            <Button 
              variant="outline" 
              className="w-full justify-between"
            >
              {isOpen ? "Hide Emotional Check-In" : "Check In With Your Feelings"}
              <span className="text-xs text-muted-foreground">
                {isOpen ? "↑" : "↓"}
              </span>
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4">
            {!showResponse ? (
              <div className="space-y-4">
                <p className="text-center text-lg">How are you feeling about your future right now?</p>
                
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {(['excited', 'hopeful', 'neutral', 'confused', 'anxious'] as Emotion[]).map((emotion) => (
                    <Button
                      key={emotion}
                      variant="outline"
                      className="flex flex-col items-center py-6 h-auto gap-2 hover:bg-future-light hover:text-future-primary"
                      onClick={() => handleEmotionSelect(emotion)}
                    >
                      <span className="text-3xl">{getEmotionEmoji(emotion)}</span>
                      <span className="capitalize">{emotion}</span>
                    </Button>
                  ))}
                </div>
              </div>
            ) : selectedEmotion && (
              <div className="space-y-6 animate-fade-in">
                <div className="bg-future-light rounded-lg p-6 text-center">
                  <div className="text-5xl mb-4">{getEmotionEmoji(selectedEmotion)}</div>
                  <h3 className="text-xl font-medium mb-2">You're feeling <span className="capitalize">{selectedEmotion}</span></h3>
                  <p className="text-muted-foreground">{emotionResponses[selectedEmotion].message}</p>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-medium">Professional Suggestion:</h4>
                  <p>{emotionResponses[selectedEmotion].recommendation}</p>
                  
                  <div className="mt-6 border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl">{getResourceIcon(emotionResponses[selectedEmotion].resourceType)}</span>
                      <span className="font-medium">{emotionResponses[selectedEmotion].resourceTitle}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{emotionResponses[selectedEmotion].resourceDescription}</p>
                    <Button className="w-full mt-3 bg-future-primary hover:bg-future-tertiary">
                      Access {emotionResponses[selectedEmotion].resourceType === 'video' ? 'Video' : 
                             emotionResponses[selectedEmotion].resourceType === 'article' ? 'Article' : 'Exercise'}
                    </Button>
                  </div>
                  
                  <div className="flex justify-center mt-4">
                    <Button variant="outline" onClick={handleReset}>
                      Check In Again
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
};

export default EmotionalCheckIn;
