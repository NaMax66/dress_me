
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { FileUploader } from './components/FileUploader';
import { ImageCard } from './components/ImageCard';
import { LoadingOverlay } from './components/LoadingOverlay';
import { dressInWinterOutfit } from './services/geminiService';
import { fileToGenerativePart } from './utils/fileUtils';
import type { Part } from '@google/genai';

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (file: File) => {
    setOriginalImage(file);
    setGeneratedImageUrl(null);
    setError(null);
    const reader = new FileReader();
    reader.onloadend = () => {
      setOriginalImageUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleGenerateClick = useCallback(async () => {
    if (!originalImage) {
      setError("Please upload an image first.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImageUrl(null);

    try {
      const imagePart: Part = await fileToGenerativePart(originalImage);
      const generatedImageBase64 = await dressInWinterOutfit(imagePart);
      if (generatedImageBase64) {
        setGeneratedImageUrl(`data:image/jpeg;base64,${generatedImageBase64}`);
      } else {
          throw new Error("The AI model did not return an image. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  }, [originalImage]);

  const handleClear = useCallback(() => {
    setOriginalImage(null);
    setOriginalImageUrl(null);
    setGeneratedImageUrl(null);
    setError(null);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-gray-200 font-sans flex flex-col">
      {isLoading && <LoadingOverlay />}
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8 flex flex-col items-center">
        <div className="w-full max-w-5xl">
          <p className="text-center text-lg text-slate-400 mb-8">
            Upload a photo of a person and our AI will dress them in a cozy winter outfit.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ImageCard title="Original Image" imageUrl={originalImageUrl}>
              <FileUploader onFileSelect={handleImageUpload} />
            </ImageCard>
            <ImageCard title="Winter Outfit" imageUrl={generatedImageUrl} isLoading={isLoading} />
          </div>

          {error && (
            <div className="mt-6 text-center bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg" role="alert">
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <div className="mt-8 flex justify-center items-center gap-4">
            <button
              onClick={handleGenerateClick}
              disabled={!originalImage || isLoading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:cursor-not-allowed disabled:text-slate-400 text-white font-bold py-3 px-10 rounded-full text-xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-600/30"
            >
              {isLoading ? "Generating..." : "✨ Dress Me in Winter Clothes"}
            </button>

            {originalImage && !isLoading && (
              <button
                onClick={handleClear}
                title="Clear form"
                aria-label="Clear form"
                className="bg-red-700 hover:bg-red-800 text-white p-3.5 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-red-700/30 flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            )}
          </div>

          {generatedImageUrl && !isLoading && (
             <div className="mt-8 text-center">
                <a
                    href={generatedImageUrl}
                    download="winter-outfit.jpg"
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-green-600/30"
                >
                    Download Image
                </a>
            </div>
          )}
        </div>
      </main>
      <footer className="text-center p-4 text-slate-500 text-sm">
        Powered by Google Gemini API
      </footer>
    </div>
  );
};

export default App;
