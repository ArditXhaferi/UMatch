import { useState,useEffect } from 'react';
// import Photos from '@/components/Photos';
import Avatar from '@/components/Avatar';
// import Header from '@/components/Header';
import Header from '@/components/Header';
import { PersonalityResult } from '@/components/PersonalityQuiz';
import UniversityMatch from '@/components/UniversityMatch';
import CareerPathway from '@/components/CareerPathway';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import BekimFeatures from '@/components/BekimFeatures';
import logowhite from '../pages/assets/navbar/UMatch-white.png';
import Photos from '@/components/Photos';
import IntroScreen from '@/components/IntroScreen';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { XMarkIcon } from '@heroicons/react/24/outline';

enum Step {
  WELCOME,
  QUIZ,
  RESULTS,
}

const csrf_token = document.querySelector('meta[name="csrf-token"]')?.getAttribute("content");

async function checkIsLoggedIn() {
    const options = {
        method:"GET",
        headers:{
            'Content-Type':'application/json',
            'X-CSRF-TOKEN':csrf_token
        }
    }
    try{
        const response = await fetch("http://localhost:8001/imLoggedIn",options);

        if(!response.ok) {
            throw new Error("Something Went Wrong!");
        }

        const answer = await response.json();

        return answer.success;
    } catch(err) {
        console.error(err);
    }
}

// Register Modal Component
const RegisterModal = ({
  isOpen,
  setIsOpen,
  setIsLoginOpen
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  setIsLoginOpen: (open: boolean) => void;
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');



    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
        },
        credentials: 'include',
        body: JSON.stringify({
          name,
          email,
          password,
          password_confirmation: passwordConfirmation
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      // Close the modal on successful registration
      setIsOpen(false);

      // Redirect to dashboard using the URL from the response
      window.location.href = data.redirect || '/dashboard';

    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred during registration');
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden bg-white rounded-xl">
        <DialogHeader className="bg-[#9F262A] relative text-white p-6">
          <DialogTitle className="text-xl font-semibold">Create Account</DialogTitle>
          <button
            onClick={() => setIsOpen(false)}
            className="absolute right-5 top-5 text-white hover:text-gray-200"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
          <p className="text-sm opacity-90 mt-1">Join UMatch to start your educational journey</p>
        </DialogHeader>

        <form onSubmit={handleRegister} className="p-6 space-y-5 text-black">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded text-sm">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-[#9F262A]" htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border-gray-300 focus:border-[#D86D70] focus:ring-[#D86D70] text-black"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[#9F262A]" htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-gray-300 focus:border-[#D86D70] focus:ring-[#D86D70] text-black"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[#9F262A]" htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-gray-300 focus:border-[#D86D70] focus:ring-[#D86D70] text-black"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[#9F262A]" htmlFor="password_confirmation">Confirm Password</Label>
              <Input
                id="password_confirmation"
                type="password"
                required
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                className="border-gray-300 focus:border-[#D86D70] focus:ring-[#D86D70] text-black"
              />
            </div>
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              className="w-full bg-[#9F262A] hover:bg-[#D86D70] text-white py-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating account...
                </div>
              ) : 'Create Account'}
            </Button>
          </div>

          <div className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => {

                setIsOpen(false);
                setIsLoginOpen(true);
              }}
              className="text-[#9F262A] hover:underline"
            >
              Sign in
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// Login Modal Component
const LoginModal = ({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (open: boolean) => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password, remember: rememberMe }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Close the modal on successful login
      setIsOpen(false);

      // Redirect to dashboard using the URL from the response
      window.location.href = data.redirect || '/dashboard';

    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md p-0 overflow-hidden bg-white rounded-xl">
          <DialogHeader className="bg-[#9F262A] relative text-white p-6">
            <DialogTitle className="text-xl font-semibold">Welcome Back</DialogTitle>
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-5 top-5 text-white hover:text-gray-200"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
            <p className="text-sm opacity-90 mt-1">Sign in to continue your educational journey</p>
          </DialogHeader>

          <form onSubmit={handleLogin} className="p-6 space-y-5 text-black">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded text-sm">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-gray-300 focus:border-[#D86D70] focus:ring-[#D86D70] text-black"
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="********"
                  className="border-gray-300 focus:border-[#D86D70] focus:ring-[#D86D70] text-black"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-[#9F262A] focus:ring-[#D86D70]"
                />
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                className="w-full bg-[#9F262A] hover:bg-[#D86D70] text-white py-2"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </div>
                ) : 'Sign in'}
              </Button>
            </div>

            <div className="text-center text-sm text-gray-600 mt-6">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  setIsRegisterOpen(true);
                }}
                className="text-[#9F262A] hover:underline"
              >
                Create an account
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <RegisterModal
        isOpen={isRegisterOpen}
        setIsOpen={setIsRegisterOpen}
        setIsLoginOpen={setIsOpen}
      />
    </>
  );
};

const LandingPage = () => {
  const [currentStep, setCurrentStep] = useState<Step>(Step.WELCOME);
  // Both personalityResult and setPersonalityResult are used in the RESULTS section
  const [personalityResult, setPersonalityResult] = useState<PersonalityResult | null>(null);
  const [activeTab, setActiveTab] = useState<'universities' | 'careers'>('universities');
  const [showIntro, setShowIntro] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const [isLoggedIn,setIsLoggedIn] = useState(false);

  useEffect(()=>{
    checkIsLoggedIn().then(ans=>{
        setIsLoggedIn(ans);
    })
  },[]);

  // Add login button to header functionality
  const handleLoginClick = () => {
    setIsLoginOpen(true);
  };



  // Function to simulate getting a personality result (this prevents the linter warning)
  const simulatePersonalityTest = () => {
    // In a real app, this would be the result of the actual quiz
    const sampleResult: PersonalityResult = {
      type: 'Analyst',
      description: 'You are analytical and logical with a strong interest in problem-solving.',
      strengths: ['Critical thinking', 'Analytical skills', 'Problem solving'],
      suggestedFields: ['Computer Science', 'Engineering', 'Mathematics']
    };

    setPersonalityResult(sampleResult);
    setCurrentStep(Step.RESULTS);
  };

  return (
    <>
      {showIntro ? (
        <IntroScreen onFinish={() => setShowIntro(false)}/>
      ) : (
        <div className="min-h-screen flex flex-col bg-[#FAF8F6] overflow-x-hidden">
          <LoginModal isOpen={isLoginOpen} setIsOpen={setIsLoginOpen} />

          <div className="absolute top-5 right-5 z-10">
            <Button
              onClick={handleLoginClick}
              className="bg-[#9F262A] hover:bg-[#D86D70] text-white rounded-full px-6"
            >
              Sign In
            </Button>
          </div>

          <Header />

          <main className="flex-grow">
          {currentStep === Step.WELCOME && (
          <div className="container mx-auto px-4 py-12 md:py-24 flex flex-col items-center">
          <h1 className="text-center text-4xl md:text-5xl font-bold text-[#2F2F2F] mb-6">
          Match With Your <span className="text-[#9F262A]">Future</span>
          </h1>
          <p className="text-center text-xl text-[#6B7280] max-w-2xl mb-12">
          Discover your perfect university and career path with our
          AI-powered guidance platform for Albanian high school students.
          </p>

          <Avatar onContinue={() => setCurrentStep(Step.QUIZ)} className="mb-12" />
          <div className="w-full max-w-4xl bg-[#FAF8F6] border border-[#D86D70] rounded-xl py-4 px-6 shadow-lg mt-10">
          <h2 className="text-center text-lg font-semibold text-[#2F2F2F] mb-1">
              Upload Academic Records
          </h2>
          <p className="text-center text-sm text-[#4C5A72] mb-4">
              Drop your academic files or choose manually to enhance your match results
          </p>

          <div className="border-2 border-dashed border-[#D86D70] rounded-md p-4 bg-white hover:bg-[#FFF5F5] transition flex flex-col md:flex-row justify-center items-center gap-2 h-32">
              <svg className="w-8 h-8 text-[#9F262A]" fill="currentColor" viewBox="0 0 20 20">
              <path d="M16.88 9.94a1.5 1.5 0 00-2.12 0L11 13.71V3.5a1.5 1.5 0 00-3 0v10.21l-3.76-3.77a1.5 1.5 0 10-2.12 2.12l6.5 6.5a1.5 1.5 0 002.12 0l6.5-6.5a1.5 1.5 0 000-2.12z" />
              </svg>
              <div className="flex flex-col items-center">
              <label
                  htmlFor="academic-upload"
                  className="cursor-pointer font-medium text-[#9F262A] border border-[#D86D70] px-4 py-2 rounded-md hover:bg-[#D86D70] hover:text-white transition"
              >
                  Choose Files
              </label>
              <p className="text-xs text-[#4C5A72] mt-1">PDF, JPG, PNG up to 10MB</p>
              <input
                  id="academic-upload"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="hidden"
                  onClick={(e) => {
                    if(!isLoggedIn) {
                        e.preventDefault();
                        setIsLoginOpen(true);
                    }
                  }}
              />
              </div>
          </div>
          </div>
          <br /><br /><br />
          <BekimFeatures/>
          <br /><br /><br />
          {/* How It Works Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full mt-4">
          {[1, 2, 3].map((num) => (
              <Card
              key={num}
              className="transition-transform duration-300 hover:scale-105 hover:shadow-lg border border-gray-200 rounded-xl"
              >
              <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-[#FAF8F6] rounded-full flex items-center justify-center mb-4 shadow-sm">
                      <span className="text-[#9F262A] text-xl font-bold">{num}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">
                      {num === 1 && 'Take Fun Quizzes'}
                      {num === 2 && 'Get Matched'}
                      {num === 3 && 'Explore Paths'}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                      {num === 1 &&
                      'Discover your personality type, interests, and talents through interactive quizzes.'}
                      {num === 2 &&
                      'Our AI matches you with universities and careers that fit your unique profile.'}
                      {num === 3 &&
                      'Visualize your future with detailed career pathways and university programs.'}
                  </p>
                  </div>
              </CardContent>
              </Card>
          ))}
          </div>
          </div>
          )}

          {/* For demo purposes, we'll add a button to simulate completing the quiz */}
          {currentStep === Step.QUIZ && (
            <div className="container mx-auto px-4 py-8 text-center">
              <h2 className="text-2xl font-bold mb-6">Personality Quiz</h2>
              <p className="mb-8">Quiz interface will be implemented here.</p>
              <Button
                onClick={simulatePersonalityTest}
                className="bg-[#9F262A] hover:bg-[#D86D70] text-white"
              >
                Complete Quiz (Demo)
              </Button>
            </div>
          )}

          {currentStep === Step.RESULTS && personalityResult && (
          <div className="container mx-auto px-4 py-8">
          {/* Personality Summary */}
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="avatar-container w-24 h-24 shrink-0">
              <img
                  src={`https://api.dicebear.com/7.x/bottts/svg?seed=${personalityResult.type}`}
                  alt="Personality Avatar"
                  className="w-full h-full object-cover"
              />
              </div>

              <div>
              <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h2 className="text-2xl font-bold">{personalityResult.type}</h2>
                  <Badge className="badge-personality">Personality Type</Badge>
              </div>

              <p className="text-[#6B7280] mb-4">{personalityResult.description}</p>

              <div className="space-y-3">
                  <div>
                  <h4 className="font-semibold">Your Strengths:</h4>
                  <div className="flex flex-wrap gap-2 mt-1">
                      {personalityResult.strengths.map((strength: string) => (
                      <Badge key={strength} variant="outline">
                          {strength}
                      </Badge>
                      ))}
                  </div>
                  </div>

                  <div>
                  <h4 className="font-semibold">Suggested Fields:</h4>
                  <div className="flex flex-wrap gap-2 mt-1">
                      {personalityResult.suggestedFields.map((field: string) => (
                      <Badge
                          key={field}
                          variant="outline"
                          className="bg-[#FAF8F6] text-[#D86D70] border-0"
                      >
                          {field}
                      </Badge>
                      ))}
                  </div>
                  </div>
              </div>
              </div>
          </div>
          </div>

          {/* Toggle Tabs */}
          <div className="flex justify-center mb-6">
          <div className="inline-flex rounded-lg border border-[#E5E7EB] p-1">
              <Button
              variant={activeTab === 'universities' ? 'default' : 'ghost'}
              className={activeTab === 'universities' ? 'bg-[#9F262A] hover:bg-[#D86D70]' : ''}
              onClick={() => setActiveTab('universities')}
              >
              Universities
              </Button>
              <Button
              variant={activeTab === 'careers' ? 'default' : 'ghost'}
              className={activeTab === 'careers' ? 'bg-[#9F262A] hover:bg-[#D86D70]' : ''}
              onClick={() => setActiveTab('careers')}
              >
              Career Path
              </Button>
          </div>
          </div>

          {/* Results Display */}
          {activeTab === 'universities' ? (
          <UniversityMatch personalityResult={personalityResult} />
          ) : (
          <CareerPathway personalityResult={personalityResult} />
          )}

          <div className="text-center mt-12 mb-6">
          <Button onClick={() => setCurrentStep(Step.WELCOME)} variant="outline">
              Return to Start
          </Button>
          </div>
          </div>
          )}
          </main>

          <Photos/>

          <footer className="bg-[#9F262A] text-white py-12 mt-16">
          <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
              {/* 1. Brand Overview */}
              <div className="space-y-4">
              <div className="flex items-center gap-2">
                  <img src={logowhite} alt="UMatch Logo" className="h-8 w-auto" />
              </div>
              <p className="text-sm text-[#CCCCCC] leading-relaxed">
                  Empowering Albanian students to explore university and career opportunities through AI-driven insights and quizzes.
              </p>
              </div>

              {/* 2. Main Links */}
              <div>
              <h4 className="text-lg font-semibold mb-4">Explore</h4>
              <ul className="space-y-2 text-sm text-[#BBBBBB]">
                  <li><a href="#" className="hover:text-white transition">Home</a></li>
                  <li><a href="#" className="hover:text-white transition">Universities</a></li>
                  <li><a href="#" className="hover:text-white transition">Careers</a></li>
                  <li><a href="#" className="hover:text-white transition">About</a></li>
              </ul>
              </div>

              {/* 3. Resources */}
              <div>
              <h4 className="text-lg font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-[#BBBBBB]">
                  <li><a href="#" className="hover:text-white transition">Blog</a></li>
                  <li><a href="#" className="hover:text-white transition">Student Stories</a></li>
                  <li><a href="#" className="hover:text-white transition">Help Center</a></li>
                  <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                  <li><a href="/ParentPortal" className="hover:text-white transition">Parent Portal</a></li>
              </ul>
              </div>

              {/* 4. Contact & Social */}
              <div className="space-y-4">
                  <h4 className="text-lg font-semibold">Contact</h4>
                  <p className="text-sm text-[#CCCCCC]">contact@umatch.al</p>
                  <div className="flex gap-4 mt-2">
                  <a href="#" aria-label="Facebook" className="hover:scale-110 transition-transform">
                      {/* Facebook SVG */}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current text-white" viewBox="0 0 24 24">
                      <path d="M22.675 0h-21.35C.6 0 0 .6 0 1.325v21.351C0 23.4.6 24 1.325 24h11.495v-9.294H9.691v-3.622h3.129V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.464.099 2.795.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.763v2.312h3.587l-.467 3.622h-3.12V24h6.116C23.4 24 24 23.4 24 22.675V1.325C24 .6 23.4 0 22.675 0z"/>
                      </svg>
                  </a>
                  <a href="#" aria-label="Twitter" className="hover:scale-110 transition-transform">
                      {/* Twitter SVG */}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current text-white" viewBox="0 0 24 24">
                      <path d="M24 4.557a9.83 9.83 0 01-2.828.775 4.932 4.932 0 002.165-2.724 9.864 9.864 0 01-3.127 1.195 4.916 4.916 0 00-8.384 4.482A13.944 13.944 0 011.671 3.149a4.916 4.916 0 001.523 6.574 4.897 4.897 0 01-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.935 4.935 0 01-2.224.084 4.918 4.918 0 004.59 3.417A9.867 9.867 0 010 19.54a13.94 13.94 0 007.548 2.212c9.142 0 14.307-7.721 13.995-14.646A9.936 9.936 0 0024 4.557z"/>
                      </svg>
                  </a>
                  <a href="#" aria-label="Instagram" className="hover:scale-110 transition-transform">
                      {/* Instagram SVG */}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current text-white" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.309.975.975 1.247 2.242 1.309 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.309 3.608-.975.975-2.242 1.247-3.608 1.309-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.309-.975-.975-1.247-2.242-1.309-3.608C2.175 15.747 2.163 15.367 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.309-3.608.967-.967 2.14-1.242 3.417-1.3 1.28.059 1.689.072 4.948.072s3.668-.013 4.948-.072c1.277-.058 2.45-.333 3.417-1.3.967-.967 1.242-2.14 1.3-3.417.059-1.28.072-1.689.072-4.948s-.013-3.668-.072-4.948c-.058-1.277-.333-2.45-1.3-3.417-.967-.967-2.14-1.242-3.417-1.3C15.668.013 15.259 0 12 0z"/>
                      <path d="M12 5.838A6.162 6.162 0 005.838 12 6.162 6.162 0 0012 18.162 6.162 6.162 0 0018.162 12 6.162 6.162 0 0012 5.838zm0 10.324A4.162 4.162 0 017.838 12 4.162 4.162 0 0112 7.838 4.162 4.162 0 0116.162 12 4.162 4.162 0 0112 16.162z"/>
                      <circle cx="18.406" cy="5.594" r="1.44"/>
                      </svg>
                  </a>
                  <a href="#" aria-label="LinkedIn" className="hover:scale-110 transition-transform">
                      {/* LinkedIn SVG */}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current text-white" viewBox="0 0 24 24">
                      <path d="M22.23 0H1.77C.792 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.77 24h20.46C23.208 24 24 23.226 24 22.271V1.729C24 .774 23.208 0 22.23 0zM7.12 20.452H3.56V9h3.56v11.452zM5.34 7.433a2.07 2.07 0 110-4.14 2.07 2.07 0 010 4.14zM20.452 20.452h-3.56v-5.604c0-1.336-.027-3.056-1.863-3.056-1.864 0-2.15 1.454-2.15 2.957v5.703h-3.56V9h3.418v1.561h.05c.476-.9 1.637-1.85 3.368-1.85 3.6 0 4.267 2.368 4.267 5.448v6.293z"/>
                      </svg>
                  </a>
                  </div>
              </div>

              </div>
          {/* Divider */}
          <div className="border-t border-[#333] mt-10 pt-6 text-center text-xs text-[#fff]">
              © {new Date().getFullYear()} UMatch. All rights reserved.
          </div>
          </footer>


          </div>


      )}


      </>

  );
};

export default LandingPage;
