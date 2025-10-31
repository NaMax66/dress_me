
import React from 'react';

interface ImageCardProps {
  title: string;
  imageUrl: string | null;
  isLoading?: boolean;
  children?: React.ReactNode;
}

const Shimmer: React.FC = () => (
    <div className="absolute inset-0 bg-slate-800 animate-pulse"></div>
);

export const ImageCard: React.FC<ImageCardProps> = ({ title, imageUrl, isLoading = false, children }) => {
  return (
    <div className="bg-slate-800/50 rounded-xl shadow-lg overflow-hidden border border-slate-700">
      <h2 className="text-center text-xl font-semibold py-3 bg-slate-900/70 border-b border-slate-700 text-slate-300">{title}</h2>
      <div className="aspect-square w-full p-2">
        <div className="relative w-full h-full bg-slate-800 rounded-lg overflow-hidden flex items-center justify-center">
          {isLoading && <Shimmer />}
          {imageUrl && (
            <img src={imageUrl} alt={title} className="object-contain w-full h-full z-10" />
          )}
          {!imageUrl && !isLoading && children}
          {!imageUrl && !isLoading && !children && (
            <div className="text-slate-500 flex flex-col items-center">
              <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
              <p className="mt-2">Image will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
