// import React from 'react';
import { FC } from 'react';
import bekimImage from '../pages/assets/home/largebekim.png'; // Adjust path as needed

const BekimFeatures = () => {
  return (
    <section className="w-screen h-[350px] bg-[#9F262A] text-white flex items-center justify-center m-0 p-0">
      <div className="w-full max-w-6xl px-4 flex flex-col md:flex-row items-center justify-around gap-10 md:gap-10">
        {/* Left: Bekim Image */}
        <div className="flex-shrink-0">
          <img
            src={bekimImage}
            alt="Bekim the Bear"
            className="w-48 h-[400px] md:w-48 lg:w-52 bg-transparent -mt-24"
          />
        </div>

        {/* Right: Text Content */}
        <div className="text-center md:text-left">
          <h2 className="text-3xl md:text-3xl font-extrabold mb-4 leading-snug">
            What you can do with
            <span className="text-white"> Bekim the Bear!</span>
          </h2>
          <div className="space-y-2 text-lg md:text-xl font-small">
            <p>• Find the best uni match</p>
            <p>• Take virtual tours</p>
            <p>• AI Practice Interviews</p>
            <p>• Parent Portal</p>
            <p>• Calendar</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BekimFeatures;
