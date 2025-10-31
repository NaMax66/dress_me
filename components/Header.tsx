
import React from 'react';

const Snowflake: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={`inline-block ${className}`}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="2" x2="12" y2="6"></line>
    <line x1="12" y1="18" x2="12" y2="22"></line>
    <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
    <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
    <line x1="2" y1="12" x2="6" y2="12"></line>
    <line x1="18" y1="12" x2="22" y2="12"></line>
    <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
    <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
  </svg>
);


export const Header: React.FC = () => {
  return (
    <header className="bg-slate-900/70 backdrop-blur-sm py-4 border-b border-slate-700 sticky top-0 z-10">
      <div className="container mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-blue-500">
          <Snowflake className="w-8 h-8 mr-2 text-sky-400" />
          AI Winter Dress-Up
          <Snowflake className="w-8 h-8 ml-2 text-sky-400" />
        </h1>
      </div>
    </header>
  );
};
