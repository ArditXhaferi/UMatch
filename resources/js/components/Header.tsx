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

const Header: React.FC<HeaderProps> = ({ className }: HeaderProps) => {
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
      </div>
    </header>
  );
};

export default Header;
