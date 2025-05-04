
import { useState } from 'react';

export default function AccordionItem({ title, children }: { title: string; children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-[#9F262A] rounded-md mb-2 my-3">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left px-4 py-2 bg-[#9F262A] text-white rounded-t-md flex justify-between items-center"
      >
        <span>{title}</span>
        <span>{isOpen ? '−' : '+'}</span>
      </button>

      {isOpen && (
        <div className="px-4 py-2 bg-white text-black border-t border-[#9F262A]">
          {children}
        </div>
      )}
    </div>
  );
}
