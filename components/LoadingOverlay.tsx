
import React from 'react';

const Spinner: React.FC = () => (
  <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-sky-400"></div>
);

export const LoadingOverlay: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex flex-col items-center justify-center z-50">
      <Spinner />
      <p className="text-white text-xl mt-4">AI is working its magic...</p>
      <p className="text-slate-400 mt-2">This may take a moment.</p>
    </div>
  );
};
