import React from 'react';

export default function Spinner() {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50">
      {/* Dark overlay */}
      <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40"></div>
      
      {/* Spinner */}
      <div className="relative z-50">
        <div className="w-20 h-20 rounded-full bg-custom-color shadow-transparent animate-spin flex justify-center items-center text-white font-bold text-4xl">
          69
        </div>
        <div className="text-white mt-4 text-center">Loading...</div>
      </div>
    </div>
  );
}
