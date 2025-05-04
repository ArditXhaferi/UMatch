import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import myVideo from "../pages/assets/home/waving.mp4";

type AvatarProps = {
  onContinue: () => void;
  className?: string;
};

const Avatar: React.FC<AvatarProps> = ({ onContinue, className }) => {
  const [message, setMessage] = useState<string>(
    "👋 Hi there! I'm Bekim the Bear, your future guide. Ready to discover your perfect university and career path?"
  );

  const [messageIndex, setMessageIndex] = useState<number>(0);
  const messages = [
    "👋 Hi there! I'm Bekim the Bear, your future guide. Ready to discover your perfect university and career path?",
    "Great! Let's start by getting to know you better through some fun quizzes.",
    "Your answers will help me match you with the perfect university programs and career paths!"
  ];

  const handleNextMessage = () => {
    if (messageIndex < messages.length - 1) {
      setMessageIndex(messageIndex + 1);
      setMessage(messages[messageIndex + 1]);
    } else {
      onContinue();
    }
  };

  return (
    <div className={cn("flex md:flex-row md:items-end items-center flex-col", className)}>

      {/* Left: SVG video (clipped bottom) */}
      <div className="w-48 md:w-60 h-60 md:mb-10 mb-6 relative animate-float">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 240 240"
          preserveAspectRatio="xMidYMid meet"
          className="absolute top-0 left-0 z-10"
        >
          <defs>
            <clipPath id="bottomClip" clipPathUnits="userSpaceOnUse">
              <rect x="0" y="0" width="240" height="120" />
              <circle cx="120" cy="120" r="120" />
            </clipPath>
          </defs>
          <foreignObject width="240" height="340" clipPath="url(#bottomClip)">
            <div
              className="w-full h-full"
              style={{ transform: 'translateZ(0)' }}
            >
              <video
                src={myVideo}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
          </foreignObject>
        </svg>
      </div>


      {/* Right: Text + Button slightly above bottom */}
      <div className="flex flex-col justify-end h-60 ml-6 -translate-y-2">
        <div className="bg-white p-4 rounded-2xl shadow-md max-w-md mb-4 animate-slide-up text-gray-900">
          <p className="text-lg">
            {message}
          </p>
        </div>
        <Button
          onClick={handleNextMessage}
          className="bg-[#9F262A] hover:bg-[#7c1d20] text-white px-6 py-2 rounded-full animate-pulse-light max-w-[100px]"
        >
          {messageIndex < messages.length - 1 ? "Continue" : "Start Now"}
        </Button>
      </div>
    </div>
  );
};

export default Avatar;
