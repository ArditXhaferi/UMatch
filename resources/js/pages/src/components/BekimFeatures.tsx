import React from 'react';

const BekimFeatures = () => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">Key Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {['Personalized Matches', 'AI-Powered Insights', 'Future Pathways'].map((feature, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold mb-2">{feature}</h3>
            <p className="text-gray-600">Find the perfect fit for your unique talents and interests.</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BekimFeatures; 