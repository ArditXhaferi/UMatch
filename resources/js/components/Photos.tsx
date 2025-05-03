import { useState } from 'react';

import anen from '../pages/assets/home/AN-EN.png';
import ards from '../pages/assets/home/AR-DS.png';
import dicd from '../pages/assets/home/DI-CD.png';
import exbu from '../pages/assets/home/EX-BU.png';
import glbm from '../pages/assets/home/GL-DM.png';
import gltr from '../pages/assets/home/GL-TR.png';
import hebt from '../pages/assets/home/HE-BT.png';
import hemd from '../pages/assets/home/HE-MD.png';
import soed from '../pages/assets/home/SO-ED.png';
import some from '../pages/assets/home/SO-ME.png';
import spat from '../pages/assets/home/SP-AT.png';
import spec from '../pages/assets/home/SP-EC.png';

const careerImages = [
  {
    src: anen,
    label: 'AN-EN',
    university: 'Faculty of Engineering & Technology',
    description: 'Innovative problem-solvers drawn to designing, building, and optimizing systems across mechanical, civil, electrical, or mechatronic engineering.',
  },
  {
    src: ards,
    label: 'AR-DS',
    university: 'School of Architecture & Industrial Design',
    description: 'Creative visionaries passionate about shaping spaces and products through architecture, interior, industrial, or urban design.',
  },
  {
    src: dicd,
    label: 'DI-CD',
    university: 'School of Data & Decision Sciences',
    description: 'Analytical thinkers who love uncovering insights from data using statistics, AI/ML, and business analytics.',
  },
  {
    src: exbu,
    label: 'EX-BU',
    university: 'School of Business & Entrepreneurship',
    description: 'Strategic leaders ready to innovate, launch ventures, and manage businesses in marketing, finance, or entrepreneurship.',
  },
  {
    src: glbm,
    label: 'GL-DM',
    university: 'Faculty of International Relations & Law',
    description: 'Diplomatically minded students focused on global affairs, law, peace studies, and European governance.',
  },
  {
    src: gltr,
    label: 'GL-TR',
    university: 'School of Tourism, Hospitality & Culture',
    description: 'World explorers interested in hospitality, tourism, event planning, and cross-cultural engagement.',
  },
  {
    src: hebt,
    label: 'HE-BT',
    university: 'Faculty of Biotechnology & Biomedical Eng.',
    description: 'Science-driven innovators exploring biotechnology, biomedical engineering, genetics, or bioinformatics to shape tomorrow’s health solutions.',
  },
  {
    src: hemd,
    label: 'HE-MD',
    university: 'Medical & Health Sciences Faculty',
    description: 'Compassionate healers preparing for careers in medicine, dentistry, pharmacy, or nursing.',
  },
  {
    src: soed,
    label: 'SO-ED',
    university: 'Faculty of Education & Learning Sciences',
    description: 'Inspiring educators dedicated to pedagogy, linguistics, psychology, and instructional design for future generations.',
  },
  {
    src: some,
    label: 'SO-ME',
    university: 'College of Media, Film & Communication',
    description: 'Storytellers and content creators passionate about journalism, film, media production, and digital communication.',
  },
  {
    src: spat,
    label: 'SP-AT',
    university: 'Faculty of Sport & Human Performance',
    description: 'Performance-focused individuals aiming to excel in sports science, kinesiology, therapy, or athletic management.',
  },
  {
    src: spec,
    label: 'SP-EC',
    university: 'Faculty of Environmental & Sustainability Sciences',
    description: 'Eco-conscious changemakers passionate about sustainability, environmental science, and renewable energy innovation.',
  },
];

const Photos: React.FC = () => {
  const [selected, setSelected] = useState<typeof careerImages[0] | null>(null);

  return (
    <section className="w-full py-12">
      <h2 className="text-3xl md:text-4xl font-bold text-[#2F2F2F] mb-10 text-center">
        Get Your <span className="text-[#9F262A]">Career Insights</span>
      </h2>

      {/* Centered Grid Container */}
      <div className="flex justify-center">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-[120px] gap-y-[60px] mt-6 mb-10">
          {careerImages.map(({ src, label, university,description }, index) => (
            <div
              key={index}
              onClick={() => setSelected({ src, label,university, description })}
              className="cursor-pointer relative group bg-white rounded-xl overflow-hidden shadow hover:shadow-md transition-shadow w-full max-w-[130px] aspect-square"
            >
              <img src={src} alt={label} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white text-sm font-medium">{label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
          onClick={() => setSelected(null)}
        >
        <div
className="bg-white rounded-xl p-8 shadow-lg max-w-2xl w-full relative"
onClick={(e) => e.stopPropagation()}
>
  <button
    onClick={() => setSelected(null)}
    className="absolute top-2 right-3 text-red-700 text-lg"
  >
    ×
  </button>

  {/* Flex row layout */}
  <div className="flex items-center gap-6">
    <img
      src={selected.src}
      alt={selected.label}
      className="w-32 h-32 object-cover rounded-md"
    />

    <div className="text-left">
      <h3 className="text-xl font-bold text-[#9F262A] mb-1">{selected.label}</h3>
      <p className="text-sm text-[#374151] font-semibold mb-1">{selected.university}</p>
      <p className="text-sm text-gray-600">{selected.description}</p>
    </div>
  </div>
</div>


        </div>
      )}
    </section>
  );
};

export default Photos;
