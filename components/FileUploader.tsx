
import React, { useState, useCallback, useRef } from 'react';

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
}

export const FileUploader: React.FC<FileUploaderProps> = ({ onFileSelect }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (files: FileList | null) => {
    if (files && files.length > 0) {
      if (files[0].type.startsWith("image/")) {
        onFileSelect(files[0]);
      } else {
        alert("Please select an image file.");
      }
    }
  };

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    handleFile(e.dataTransfer.files);
  }, [onFileSelect]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFile(e.target.files);
  };
  
  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={handleClick}
      className={`w-full h-full flex flex-col items-center justify-center p-4 text-center border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-300 
      ${isDragging ? 'border-blue-500 bg-slate-700/50' : 'border-slate-600 hover:border-slate-500 hover:bg-slate-800/50'}`}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleInputChange}
        className="hidden"
        accept="image/*"
      />
      <svg className="w-12 h-12 mb-3 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
      <p className="text-slate-400"><span className="font-semibold text-sky-400">Click to upload</span> or drag and drop</p>
      <p className="text-xs text-slate-500">PNG, JPG, or WEBP</p>
    </div>
  );
};
