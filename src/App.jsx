/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import Navigation from './components/Navigation';
// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  useEffect(() => {
    // Ping every 5 minutes (300000 ms)
    const interval = setInterval(() => {
      fetch('https://rshardware-backend.onrender.com/users')
        .then(() => console.log('Backend pinged ✅'))
        .catch((err) => console.error('Ping failed', err));
    }, 300000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Navigation />
    </>
  );
}

export default App;
