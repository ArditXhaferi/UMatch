
import  { useEffect, useRef, useState } from "react";
import logo from '../pages/assets/navbar/umatch-logo.png';
import intro from '../pages/assets/home/intro.mp4';
const IntroScreen: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
  const [showTyping, setShowTyping] = useState(false);
  const [showExtras, setShowExtras] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [typedText, setTypedText] = useState("");

  const typingString = "Let's match your future!";

  useEffect(() => {
    const video = videoRef.current;
    if (video) video.currentTime = 0.5;

    const typingTimer = setTimeout(() => setShowTyping(true), 800);
    const extrasTimer = setTimeout(() => setShowExtras(true), 1800);
    const fadeOutTimer = setTimeout(() => setIsFadingOut(true), 5200);
    const endTimer = setTimeout(() => onFinish(), 6000);

    return () => {
      clearTimeout(typingTimer);
      clearTimeout(extrasTimer);
      clearTimeout(fadeOutTimer);
      clearTimeout(endTimer);
    };
  }, [onFinish]);

  useEffect(() => {
    if (showTyping && typedText.length < typingString.length) {
      const timeout = setTimeout(() => {
        setTypedText(typingString.slice(0, typedText.length + 1));
      }, 55);
      return () => clearTimeout(timeout);
    }
  }, [showTyping, typedText]);

  return (
    <div
      className={`fixed inset-0 z-[9999] transition-opacity duration-700 bg-[#FAF8F6] ${
        isFadingOut ? "opacity-0 pointer-events-none" : ""
      }`}
    >
      {/* Bear Video */}
      <video
        ref={videoRef}
        src={intro}
        autoPlay
        muted
        playsInline
        className="absolute top-[10%] left-1/2 transform -translate-x-1/2 w-[85%] h-auto max-h-[90%] object-contain opacity-40"
      />

      {/* Blurry Dark Overlay */}
      <div className="absolute inset-0 bg-[#2F2F2F]/70 backdrop-blur-sm transition-opacity duration-500" />

      {/* Typing Title */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <h1 className="text-white text-4xl md:text-6xl font-bold tracking-tight text-center">
          <span className="animate-fade-up">{typedText}</span>
          <span className="animate-blink ml-1">|</span>
        </h1>
      </div>

      {/* Logo + Names aligned bottom */}
      <div className="absolute bottom-6 w-full px-6 flex justify-between items-center z-30">
        <img src={logo} alt="UMatch Logo" className="h-5 w-auto" />
        <p className="text-xs text-white text-right">
          Ardit Xhaferi · Vesa Susuri · Dren Llazani · Rrita Canolli
        </p>
      </div>
    </div>
  );
};

export default IntroScreen;
