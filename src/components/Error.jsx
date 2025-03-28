import  { useState } from 'react';
import { Layers, RefreshCcw, Home, Smile, Frown } from 'lucide-react';

const Error = () => {
  const [mood, setMood] = useState('neutral');

  const handleRetry = () => {
    // Simulate a page reload or retry mechanism
    window.location.reload();
  };

  const handleMoodChange = (newMood) => {
    setMood(newMood);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br  flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-xl max-w-2xl w-full text-center transform transition-all duration-300 hover:scale-105">
        <div className="relative">

          <div className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-indigo-600 animate-pulse">
            404
          </div>


          <div className="absolute top-0 right-0 animate-bounce">
            <Layers className="text-purple-300 w-16 h-16 opacity-50" />
          </div>

          <div className="absolute bottom-0 left-0 animate-spin-slow">
            <Layers className="text-pink-300 w-12 h-12 opacity-50" />
          </div>
        </div>

        <h2 className="text-3xl font-bold text-gray-800 mt-4">
          Oops! Page Not Found
        </h2>

        <p className="text-gray-600 mt-4 mb-6">
          The page you're looking for seems to have taken an unexpected
          vacation. Don't worry, we've got your back!
        </p>

        {/* Mood Selector */}
        <div className="flex justify-center space-x-4 mb-6">
          <button
            onClick={() => handleMoodChange('happy')}
            className={`p-2 rounded-full transition-all ${
              mood === 'happy' ? 'bg-green-200 scale-110' : 'hover:bg-green-100'
            }`}
          >
            <Smile
              className={`w-8 h-8 ${mood === 'happy' ? 'text-green-600' : 'text-gray-400'}`}
            />
          </button>
          <button
            onClick={() => handleMoodChange('sad')}
            className={`p-2 rounded-full transition-all ${
              mood === 'sad' ? 'bg-red-200 scale-110' : 'hover:bg-red-100'
            }`}
          >
            <Frown
              className={`w-8 h-8 ${mood === 'sad' ? 'text-red-600' : 'text-gray-400'}`}
            />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleRetry}
            className="bg-purple-500 text-white px-6 py-3 rounded-xl hover:bg-purple-600 transition-all flex items-center gap-2 group"
          >
            <RefreshCcw className="w-5 h-5 group-hover:animate-spin" />
            Retry
          </button>

          <button
            onClick={() => (window.location.href = '/')}
            className="bg-pink-500 text-white px-6 py-3 rounded-xl hover:bg-pink-600 transition-all flex items-center gap-2 group"
          >
            <Home className="w-5 h-5 group-hover:animate-bounce" />
            Go Home
          </button>
        </div>

        {/* Mood-based Message */}
        {mood === 'happy' && (
          <div className="mt-6 text-green-600 font-semibold animate-fade-in">
            Great attitude! Let's find that page together.
          </div>
        )}
        {mood === 'sad' && (
          <div className="mt-6 text-red-600 font-semibold animate-fade-in">
            It's okay, we'll help you get back on track!
          </div>
        )}
      </div>
    </div>
  );
};

export default Error;
