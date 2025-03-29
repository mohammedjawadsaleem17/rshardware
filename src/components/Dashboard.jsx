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
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 to-purple-700 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-2xl p-10 max-w-lg text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4 overflow-hidden text-ellipsis whitespace-nowrap">
          Welcome {id.split(' ')[0].toUpperCase()}!👋
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
  );
}
