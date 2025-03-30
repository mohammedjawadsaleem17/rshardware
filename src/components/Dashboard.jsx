import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './Auth/AuthProvider';

export default function Dashboard() {
  const [quote, setQuote] = useState('');
  const navigate = useNavigate();
  const { id } = useContext(AuthContext);
  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await fetch('https://zenquotes.io/api/quotes/');
        const data = await response.json();
        setQuote(data);
        console.log(data);
      } catch (error) {
        console.error('Failed to fetch quote', error);
      }
    };

    fetchQuote();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 to-purple-500 flex flex-col">
      {/* Arabic Calligraphy Text at the Top */}
      <h2 className="text-4xl font-extrabold text-white shadow-lg self-center shadow-2xl mt-7">
        هَٰذَا مِن فَضْلِ رَبِّي
      </h2>
      <p className="self-center shadow-2xl mt-1 ml-2 text-white">
        This is from the Grace of my Lord-
        <small className="text-xs">Qur'an 27:40</small>
      </p>

      <div className="flex-1 flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-4xl p-10 max-w-lg text-center mb-36 mx-4 sm:mx-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-4 overflow-hidden text-ellipsis whitespace-nowrap">
            Welcome {id.split(' ')[0].toUpperCase()}! 👋
          </h1>
          {/* <p className="text-gray-600 italic mb-8">"{quote}"</p> */}
          <button
            onClick={() => navigate('/invoice')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-transform transform hover:scale-105 shadow-md"
          >
            Generate Invoices/Sales
          </button>
        </div>
      </div>
    </div>
  );
}
