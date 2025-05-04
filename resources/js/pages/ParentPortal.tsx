import React,{useState} from 'react';
import Header from '@/components/Header';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import logowhite from '../pages/assets/navbar/UMatch-white.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import AccordionItem from '@/components/AccordionItem';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const csrf_token = document.querySelector("meta[name='csrf-token']")?.getAttribute("content") || '';

const faqs = [
    {
      question: "How does UMatch help my child choose a university?",
      answer: "UMatch uses AI-powered quizzes and personalized matching to suggest universities based on interests, personality, and academic goals."
    },
    {
      question: "Is UMatch only for students in Albania?",
      answer: "UMatch is designed for Albanian students, but international students exploring Albanian universities may also benefit."
    },
    {
      question: "Are the quizzes scientifically based?",
      answer: "Our personality and interest quizzes are developed with guidance from education professionals and psychological frameworks like MBTI and Holland Codes."
    },
    {
      question: "Is there a cost to use UMatch?",
      answer: "UMatch is currently free to use for students and parents. Additional premium features may be added later."
    },
    {
      question: "How can I support my child in using UMatch effectively?",
      answer: "Encourage your child to answer quizzes honestly, explore all suggested results, and attend university info sessions linked on the platform."
    },
    {
      question: "Does UMatch offer any scholarship information?",
      answer: "Yes, UMatch includes details on scholarships offered by partner universities where available."
    },
    {
      question: "Can I speak to someone for personalized help?",
      answer: "Parents can reach out via our contact form and request a one-on-one meeting with university advisors or career counselors."
    },
    {
      question: "How secure is my child's information on UMatch?",
      answer: "We take privacy seriously. UMatch complies with GDPR and uses encryption to protect all personal data."
    },
    {
      question: "Are application deadlines listed on UMatch?",
      answer: "Yes, for most universities, UMatch provides key application deadlines and reminders in the matched results."
    },
    {
      question: "Can I help my child submit an application?",
      answer: "While UMatch does not submit applications directly, we provide checklists and guidance on each university's process."
    }
  ];




const ParentPortal = () => {
    const [parent_message,setParentMessage] = useState<string>("");

    const sendTheMessage = async () => {
        const options = {
            method:"POST",
            headers:{
                'Content-Type':'application/json',
                'X-CSRF-TOKEN': csrf_token
            },
            body:JSON.stringify({
                parent_message
            })
        }
        try{
            const response = await fetch("http://localhost:8001/add_message",options);

            if(!response.ok) {
                throw new Error("Something Went Wrong");
            }

            const answer = await response.json();

            // console.log(answer);

            if(answer.success) {
                toast.success("Message Received");
                return;
            }

            toast.error("Message Failed");
        } catch(err) {
            console.error(err);
        }
    }
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F6]">
      <Header />

    <ToastContainer/>
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold text-[#2F2F2F] mb-4">Welcome, Parents!</h1>
        <p className="text-lg text-[#6B7280] max-w-2xl mx-auto">
          UMatch is your partner in guiding your child toward the right academic and career path. Below are common questions you may have — and a way to reach out directly to universities.
        </p>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 py-12 max-w-3xl">
        <h2 className="text-2xl font-bold text-[#2F2F2F] mb-6 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} title={faq.question}>
                {faq.answer}
            </AccordionItem>
          ))}
        </div>
      </section>

      {/* Contact Form */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-[#2F2F2F] mb-6 text-center">Send a Message to Us!</h2>
        <div className="space-y-4 max-w-3xl mx-auto">
          <Input placeholder="Message..." className="my-5" required onChange={(e) => {setParentMessage(e.target.value)}} />
          <Button onClick={() => {sendTheMessage()}} type="submit" className="bg-[#9F262A] hover:bg-[#D86D70] text-white w-full">
            Send Message
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#9F262A] text-white py-12 mt-16">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-5 gap-10">
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
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Parent Portal</h4>
            <ul className="space-y-2 text-sm text-[#BBBBBB]">
              <li><a href="#" className="hover:text-white transition">Parent Portal</a></li>
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
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.309.975.975 1.247 2.242 1.309 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.309 3.608-.975.975-2.242 1.247-3.608 1.309-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.309-.975-.975-1.247-2.242-1.309-3.608C2.175 15.747 2.163 15.367 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.309-3.608.975-.975 2.242-1.247 3.608-1.309C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.775.13 4.602.405 3.635 1.372 2.668 2.339 2.393 3.512 2.335 4.789.013 8.332 0 8.741 0 12s.013 3.668.072 4.948c.058 1.277.333 2.45 1.3 3.417.967.967 2.14 1.242 3.417 1.3 1.28.059 1.689.072 4.948.072s3.668-.013 4.948-.072c1.277-.058 2.45-.333 3.417-1.3.967-.967 1.242-2.14 1.3-3.417.059-1.28.072-1.689.072-4.948s-.013-3.668-.072-4.948c-.058-1.277-.333-2.45-1.3-3.417-.967-.967-2.14-1.242-3.417-1.3C15.668.013 15.259 0 12 0z"/>
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
        <div className="border-t border-[#333] mt-10 pt-6 text-center text-xs text-[#888]">
          © {new Date().getFullYear()} UMatch. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default ParentPortal;
