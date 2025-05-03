import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
// import { Link } from 'react-router-dom';
// import SignIn from './SignIn';
// import QuizStart from './QuizStart';

import logo from '../pages/assets/navbar/umatch-logo.png';

type HeaderProps = {
  className?: string;
};

const Header: React.FC<HeaderProps> = ({ className }:HeaderProps) => {
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isQuizStartOpen, setIsQuizStartOpen] = useState(false);



  return (
    <header className={cn("border-b border-[#D86D70] py-4", className)}>
      <div className="container flex items-center justify-between">

        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <a href="/">
            <img
              src={logo}
              alt="UMatch Logo"
              className="h-10 w-auto"
            />
          </a>
        </div>

        {/* Navigation */}
        {/* <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-[#2F2F2F] hover:text-[#4C5A72] transition">Home</Link>
          <Link to="/universities" className="text-[#2F2F2F] hover:text-[#4C5A72] transition">Universities</Link>
          <Link to="/careers" className="text-[#2F2F2F] hover:text-[#4C5A72] transition">Careers</Link>
          <a href="#" className="text-[#2F2F2F] hover:text-[#4C5A72] transition">About</a>
        </nav> */}

        {/* Buttons */}
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            className="hidden sm:inline-flex border-[#9F262A] text-[#9F262A] hover:bg-[#D86D70] hover:text-white"
            onClick={() => setIsSignInOpen(true)}
          >
            <a href="/login">Sign In</a>
          </Button>
          <Button
            className="bg-[#9F262A] hover:bg-[#D86D70] text-white"
            onClick={() => setIsQuizStartOpen(true)}
          >
            Get Started
          </Button>
        </div>
      </div>




    </header>
  );
};

export default Header;
