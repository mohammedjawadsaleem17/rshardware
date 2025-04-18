import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './Auth/AuthProvider';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';

export default function Dashboard() {
  const [healingVerse, setHealingVerse] = useState({
    text: 'وَلَسَوْفَ يُعْطِيكَ رَبُّكَ فَتَرْضَىٰ',
    translation:
      'And your Lord is going to give you, and you will be satisfied',
    reference: 'Surah Ad-Duha 93:5',
  });
  const navigate = useNavigate();
  const { id } = useContext(AuthContext);
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const particlesInit = async (engine) => {
    await loadSlim(engine);
  };

  const healingVerses = [
    {
      text: 'أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ',
      translation:
        'Unquestionably, by the remembrance of Allah hearts are assured',
      reference: "Surah Ar-Ra'd 13:28",
    },
    // ... (keep ALL your existing healing verses array exactly as you had it)
    // I'm showing just one here for brevity, but you should keep all 30+ verses
  ];

  useEffect(() => {
    const rotateVerses = () => {
      const randomIndex = Math.floor(Math.random() * healingVerses.length);
      setHealingVerse(healingVerses[randomIndex]);
    };
    rotateVerses();
    const interval = setInterval(rotateVerses, 27000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col overflow-hidden relative">
      {/* Enhanced Cosmic Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80"
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-stars-in-space-1610-large.mp4"
            type="video/mp4"
          />
        </video>

        <Particles
          id="tsparticles"
          init={particlesInit}
          options={{
            background: { color: 'transparent' },
            fpsLimit: 120,
            interactivity: {
              events: {
                onHover: {
                  enable: true,
                  mode: 'repulse',
                },
              },
            },
            particles: {
              color: { value: '#e2e8f0' },
              links: {
                color: '#818cf8',
                distance: 150,
                enable: true,
                opacity: 0.3,
                width: 1,
              },
              move: {
                enable: true,
                speed: 1,
              },
              number: { value: 60 },
              opacity: { value: 0.5 },
              size: { value: { min: 1, max: 3 } },
            },
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/30 via-indigo-900/40 to-purple-900/50"></div>
      </div>

      {/* Arabic Calligraphy Header */}
      <motion.div
        className="relative z-10 pt-10 px-4 text-center"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.h1
          className="text-5xl md:text-6xl font-arabic text-white mb-2"
          style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}
        >
          هَٰذَا مِن فَضْلِ رَبِّي
        </motion.h1>
        <motion.p
          className="text-lg text-blue-100"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          This is from the Grace of my Lord —{' '}
          <span className="text-white">Qur'an 27:40</span>
        </motion.p>
      </motion.div>

      {/* Main Content Box */}
      <div className="flex-1 flex items-center justify-center pb-20 pt-0 p-4">
        <motion.div
          ref={ref}
          className="relative z-20 w-full max-w-md bg-white/95 backdrop-blur-sm rounded-xl p-8 shadow-2xl border border-white/20"
          initial={{ opacity: 0, y: 20, scale: 0.97 }}
          animate={
            inView
              ? {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  boxShadow: '0 25px 50px -12px rgba(79, 70, 229, 0.25)',
                }
              : {}
          }
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Welcome Section */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            <motion.h2
              className="text-3xl font-bold text-indigo-900 mb-3"
              whileHover={{ scale: 1.02 }}
            >
              Welcome,{' '}
              <span className="text-indigo-600">
                {id.split(' ')[0].toUpperCase()}
              </span>
            </motion.h2>
            <motion.div
              className="text-4xl"
              animate={{
                rotate: [0, 15, -15, 0],
                y: [0, -5, 5, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 6,
                ease: 'easeInOut',
              }}
            >
              🌙
            </motion.div>
          </motion.div>

          {/* Quranic Verse */}
          <motion.div
            className="bg-indigo-50/80 p-5 rounded-lg mb-8 text-center border border-indigo-100"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
          >
            <motion.p
              className="text-2xl font-arabic text-indigo-800 mb-3 leading-relaxed"
              key={healingVerse.text}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {healingVerse.text}
            </motion.p>
            <motion.p
              className="text-indigo-700 italic"
              key={healingVerse.translation}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              "{healingVerse.translation}"
            </motion.p>
            <motion.p
              className="text-indigo-500 text-sm mt-2"
              key={healingVerse.reference}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {healingVerse.reference}
            </motion.p>
          </motion.div>

          {/* Create Invoice Button */}
          <motion.button
            onClick={() => navigate('/invoice')}
            className="w-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-medium py-3 px-6 rounded-lg shadow-md relative overflow-hidden group"
            whileHover={{
              scale: 1.03,
              boxShadow: '0 10px 25px -5px rgba(79, 70, 229, 0.4)',
            }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 15 }}
            animate={
              inView
                ? {
                    opacity: 1,
                    y: 0,
                    transition: { delay: 0.8, type: 'spring', stiffness: 300 },
                  }
                : {}
            }
          >
            <span className="relative z-10 flex items-center justify-center">
              <motion.span
                initial={{ x: -10, opacity: 0 }}
                animate={
                  inView ? { x: 0, opacity: 1, transition: { delay: 0.9 } } : {}
                }
              >
                Create Invoice
              </motion.span>
              <motion.span
                className="ml-2"
                initial={{ x: 10, opacity: 0 }}
                animate={
                  inView ? { x: 0, opacity: 1, transition: { delay: 1 } } : {}
                }
                whileHover={{ rotate: [0, 20, -20, 0] }}
              >
                📄
              </motion.span>
            </span>
            <motion.span
              className="absolute inset-0 bg-white/20"
              initial={{ x: '-100%', skewX: '-15deg' }}
              whileHover={{ x: '100%', transition: { duration: 0.8 } }}
            />
          </motion.button>
        </motion.div>
      </div>

      {/* Bottom Verse */}
      <motion.div
        className="fixed bottom-4 left-0 right-0 text-center text-blue-100/90 text-sm z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <p>"My mercy encompasses all things" (Qur'an 7:156)</p>
      </motion.div>

      {/* Global Styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&display=swap');
        .font-arabic {
          font-family: 'Amiri', serif;
        }
        body {
          overflow-x: hidden;
        }
      `}</style>
    </div>
  );
}