import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './Auth/AuthProvider';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

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

  const healingVerses = [
    {
      text: 'أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ',
      translation:
        'Unquestionably, by the remembrance of Allah hearts are assured',
      reference: "Surah Ar-Ra'd 13:28",
    },
    {
      text: 'وَنُنَزِّلُ مِنَ الْقُرْآنِ مَا هُوَ شِفَاءٌ وَرَحْمَةٌ لِّلْمُؤْمِنِينَ',
      translation:
        'And We send down of the Quran that which is healing and mercy for the believers',
      reference: 'Surah Al-Isra 17:82',
    },
    {
      text: 'وَإِذَا مَرِضْتُ فَهُوَ يَشْفِينِ',
      translation: 'And when I am ill, it is He who cures me',
      reference: "Surah Ash-Shu'ara 26:80",
    },
    {
      text: 'قُلْ هُوَ لِلَّذِينَ آمَنُوا هُدًى وَشِفَاءٌ',
      translation: "Say, 'It is for those who believe, a guidance and cure'",
      reference: 'Surah Fussilat 41:44',
    },
    {
      text: 'وَنَزَعْنَا مَا فِي صُدُورِهِم مِّنْ غِلٍّ',
      translation:
        'And We will remove whatever is in their breasts of resentment',
      reference: 'Surah Al-Hijr 15:47',
    },
    {
      text: 'يَا أَيُّهَا النَّاسُ قَدْ جَاءَتْكُم مَّوْعِظَةٌ مِّن رَّبِّكُمْ وَشِفَاءٌ لِّمَا فِي الصُّدُورِ',
      translation:
        'O mankind, there has come to you instruction from your Lord and healing for what is in the breasts',
      reference: 'Surah Yunus 10:57',
    },
    {
      text: 'وَشِفَاءٌ لِّمَا فِي الصُّدُورِ وَهُدًى وَرَحْمَةٌ لِّلْمُؤْمِنِينَ',
      translation:
        'And healing for what is in the breasts and guidance and mercy for the believers',
      reference: 'Surah Al-Isra 17:82',
    },
    {
      text: 'وَإِذَا قُرِئَ الْقُرْآنُ فَاسْتَمِعُوا لَهُ وَأَنصِتُوا لَعَلَّكُمْ تُرْحَمُونَ',
      translation:
        'And when the Quran is recited, listen to it and be silent that you may receive mercy',
      reference: "Surah Al-A'raf 7:204",
    },
    {
      text: 'رَبَّنَا وَسِعْتَ كُلَّ شَيْءٍ رَّحْمَةً وَعِلْمًا',
      translation:
        'Our Lord, You have encompassed all things in mercy and knowledge',
      reference: 'Surah Ghafir 40:7',
    },
    {
      text: 'وَرَحْمَتِي وَسِعَتْ كُلَّ شَيْءٍ',
      translation: 'And My mercy encompasses all things',
      reference: "Surah Al-A'raf 7:156",
    },
    {
      text: 'وَهُوَ الَّذِي يُنَزِّلُ الْغَيْثَ مِن بَعْدِ مَا قَنَطُوا وَيَنشُرُ رَحْمَتَهُ',
      translation:
        'And it is He who sends down the rain after they had despaired and spreads His mercy',
      reference: 'Surah Ash-Shura 42:28',
    },
    {
      text: 'إِنَّ رَحْمَتَ اللَّهِ قَرِيبٌ مِّنَ الْمُحْسِنِينَ',
      translation: 'Indeed, the mercy of Allah is near to the doers of good',
      reference: "Surah Al-A'raf 7:56",
    },
    {
      text: 'وَلَا تَيْأَسُوا مِن رَّوْحِ اللَّهِ إِنَّهُ لَا يَيْأَسُ مِن رَّوْحِ اللَّهِ إِلَّا الْقَوْمُ الْكَافِرُونَ',
      translation:
        'And despair not of relief from Allah. Indeed, no one despairs of relief from Allah except the disbelieving people',
      reference: 'Surah Yusuf 12:87',
    },
    {
      text: 'فَإِنَّ مَعَ الْعُسْرِ يُسْرًا * إِنَّ مَعَ الْعُسْرِ يُسْرًا',
      translation:
        'For indeed, with hardship will be ease. Indeed, with hardship will be ease',
      reference: 'Surah Ash-Sharh 94:5-6',
    },
    {
      text: 'وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا * وَيَرْزُقْهُ مِنْ حَيْثُ لَا يَحْتَسِبُ',
      translation:
        'And whoever fears Allah - He will make for him a way out. And will provide for him from where he does not expect',
      reference: 'Surah At-Talaq 65:2-3',
    },
    {
      text: 'وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ',
      translation:
        'And whoever relies upon Allah - then He is sufficient for him',
      reference: 'Surah At-Talaq 65:3',
    },
    {
      text: 'لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا',
      translation: 'Allah does not burden a soul beyond that it can bear',
      reference: 'Surah Al-Baqarah 2:286',
    },
    {
      text: 'وَلَنَبْلُوَنَّكُمْ بِشَيْءٍ مِّنَ الْخَوْفِ وَالْجُوعِ وَنَقْصٍ مِّنَ الْأَمْوَالِ وَالْأَنفُسِ وَالثَّمَرَاتِ وَبَشِّرِ الصَّابِرِينَ',
      translation:
        'And We will surely test you with something of fear and hunger and a loss of wealth and lives and fruits, but give good tidings to the patient',
      reference: 'Surah Al-Baqarah 2:155',
    },
    {
      text: 'إِنَّ اللَّهَ مَعَ الصَّابِرِينَ',
      translation: 'Indeed, Allah is with the patient',
      reference: 'Surah Al-Baqarah 2:153',
    },
    {
      text: 'وَاصْبِرْ فَإِنَّ اللَّهَ لَا يُضِيعُ أَجْرَ الْمُحْسِنِينَ',
      translation:
        'And be patient, for indeed, Allah does not allow to be lost the reward of those who do good',
      reference: 'Surah Hud 11:115',
    },
    {
      text: 'وَلَمَن صَبَرَ وَغَفَرَ إِنَّ ذَٰلِكَ لَمِنْ عَزْمِ الْأُمُورِ',
      translation:
        'And whoever is patient and forgives - indeed, that is of the matters requiring determination',
      reference: 'Surah Ash-Shura 42:43',
    },
    {
      text: 'وَبَشِّرِ الْمُخْبِتِينَ * الَّذِينَ إِذَا ذُكِرَ اللَّهُ وَجِلَتْ قُلُوبُهُمْ',
      translation:
        'And give good tidings to the humble [before their Lord]. Who, when Allah is mentioned, their hearts tremble',
      reference: 'Surah Al-Hajj 22:34-35',
    },
    {
      text: 'الَّذِينَ آمَنُوا وَتَطْمَئِنُّ قُلُوبُهُم بِذِكْرِ اللَّهِ أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ',
      translation:
        'Those who have believed and whose hearts are assured by the remembrance of Allah. Unquestionably, by the remembrance of Allah hearts are assured',
      reference: "Surah Ar-Ra'd 13:28",
    },
    {
      text: 'وَمَن يَعْمَلْ مِنَ الصَّالِحَاتِ مِن ذَكَرٍ أَوْ أُنثَىٰ وَهُوَ مُؤْمِنٌ فَأُولَٰئِكَ يَدْخُلُونَ الْجَنَّةَ وَلَا يُظْلَمُونَ نَقِيرًا',
      translation:
        'And whoever does righteous deeds, whether male or female, while being a believer - those will enter Paradise and will not be wronged a speck',
      reference: 'Surah An-Nisa 4:124',
    },
    {
      text: 'وَمَا تَوْفِيقِي إِلَّا بِاللَّهِ عَلَيْهِ تَوَكَّلْتُ وَإِلَيْهِ أُنِيبُ',
      translation:
        'And my success is not but through Allah. Upon Him I have relied, and to Him I return',
      reference: 'Surah Hud 11:88',
    },
    {
      text: 'حَسْبِيَ اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ',
      translation:
        'Sufficient for me is Allah; there is no deity except Him. On Him I have relied, and He is the Lord of the Great Throne',
      reference: 'Surah At-Tawbah 9:129',
    },
    {
      text: 'وَتَوَكَّلْ عَلَى الْحَيِّ الَّذِي لَا يَمُوتُ',
      translation: 'And rely upon the Ever-Living who does not die',
      reference: 'Surah Al-Furqan 25:58',
    },
    {
      text: 'وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَإِنَّ اللَّهَ عَزِيزٌ حَكِيمٌ',
      translation:
        'And whoever relies upon Allah - then indeed, Allah is Exalted in Might and Wise',
      reference: 'Surah Al-Anfal 8:49',
    },
    {
      text: 'إِنَّ اللَّهَ يُدَافِعُ عَنِ الَّذِينَ آمَنُوا',
      translation: 'Indeed, Allah defends those who have believed',
      reference: 'Surah Al-Hajj 22:38',
    },
    {
      text: 'وَكَانَ حَقًّا عَلَيْنَا نَصْرُ الْمُؤْمِنِينَ',
      translation: 'And it was incumbent upon Us to help the believers',
      reference: 'Surah Ar-Rum 30:47',
    },
    {
      text: 'وَلَيَنصُرَنَّ اللَّهُ مَن يَنصُرُهُ إِنَّ اللَّهَ لَقَوِيٌّ عَزِيزٌ',
      translation:
        'And Allah will surely support those who support Him. Indeed, Allah is Powerful and Exalted in Might',
      reference: 'Surah Al-Hajj 22:40',
    },
    {
      text: 'وَلَا تَهِنُوا وَلَا تَحْزَنُوا وَأَنتُمُ الْأَعْلَوْنَ إِن كُنتُم مُّؤْمِنِينَ',
      translation:
        'And do not weaken and do not grieve, and you will be superior if you are believers',
      reference: 'Surah Al-Imran 3:139',
    },
    {
      text: 'وَلَا تَقُولُوا لِمَن يُقْتَلُ فِي سَبِيلِ اللَّهِ أَمْوَاتٌ بَلْ أَحْيَاءٌ وَلَٰكِن لَّا تَشْعُرُونَ',
      translation:
        "And do not say about those who are killed in the way of Allah, 'They are dead.' Rather, they are alive, but you perceive it not",
      reference: 'Surah Al-Baqarah 2:154',
    },
    {
      text: 'كُلُّ نَفْسٍ ذَائِقَةُ الْمَوْتِ وَإِنَّمَا تُوَفَّوْنَ أُجُورَكُمْ يَوْمَ الْقِيَامَةِ',
      translation:
        'Every soul will taste death, and you will only be given your compensation on the Day of Resurrection',
      reference: 'Surah Al-Imran 3:185',
    },
    {
      text: 'الَّذِينَ إِذَا أَصَابَتْهُم مُّصِيبَةٌ قَالُوا إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ',
      translation:
        "Who, when disaster strikes them, say, 'Indeed we belong to Allah, and indeed to Him we will return'",
      reference: 'Surah Al-Baqarah 2:156',
    },
    {
      text: 'أُولَٰئِكَ عَلَيْهِمْ صَلَوَاتٌ مِّن رَّبِّهِمْ وَرَحْمَةٌ وَأُولَٰئِكَ هُمُ الْمُهْتَدُونَ',
      translation:
        'Those are the ones upon whom are blessings from their Lord and mercy. And it is those who are the rightly guided',
      reference: 'Surah Al-Baqarah 2:157',
    },
    {
      text: 'وَلَنَبْلُوَنَّكُمْ حَتَّىٰ نَعْلَمَ الْمُجَاهِدِينَ مِنكُمْ وَالصَّابِرِينَ',
      translation:
        'And We will surely test you until We make evident those who strive among you and the patient',
      reference: 'Surah Muhammad 47:31',
    },
    {
      text: 'إِن تَنصُرُوا اللَّهَ يَنصُرْكُمْ وَيُثَبِّتْ أَقْدَامَكُمْ',
      translation:
        'If you support Allah, He will support you and plant firmly your feet',
      reference: 'Surah Muhammad 47:7',
    },
    {
      text: 'وَمَا النَّصْرُ إِلَّا مِنْ عِندِ اللَّهِ الْعَزِيزِ الْحَكِيمِ',
      translation:
        'And victory is not except from Allah, the Exalted in Might, the Wise',
      reference: 'Surah Al-Imran 3:126',
    },
    {
      text: 'وَمَا كَانَ اللَّهُ لِيُعَذِّبَهُمْ وَأَنتَ فِيهِمْ وَمَا كَانَ اللَّهُ مُعَذِّبَهُمْ وَهُمْ يَسْتَغْفِرُونَ',
      translation:
        'And Allah would not punish them while you are among them, and Allah would not punish them while they seek forgiveness',
      reference: 'Surah Al-Anfal 8:33',
    },
    {
      text: 'وَاسْتَغْفِرُوا رَبَّكُمْ ثُمَّ تُوبُوا إِلَيْهِ إِنَّ رَبِّي رَحِيمٌ وَدُودٌ',
      translation:
        'And seek forgiveness of your Lord and repent to Him. Indeed, my Lord is Merciful and Loving',
      reference: 'Surah Hud 11:90',
    },
    {
      text: 'وَأَنِ اسْتَغْفِرُوا رَبَّكُمْ ثُمَّ تُوبُوا إِلَيْهِ يُمَتِّعْكُم مَّتَاعًا حَسَنًا إِلَىٰ أَجَلٍ مُّسَمًّى',
      translation:
        'And seek forgiveness of your Lord and repent to Him. He will let you enjoy a good provision for a specified term',
      reference: 'Surah Hud 11:3',
    },
    {
      text: 'وَمَن يَعْمَلْ سُوءًا أَوْ يَظْلِمْ نَفْسَهُ ثُمَّ يَسْتَغْفِرِ اللَّهَ يَجِدِ اللَّهَ غَفُورًا رَّحِيمًا',
      translation:
        'And whoever does evil or wrongs himself then seeks forgiveness of Allah will find Allah Forgiving and Merciful',
      reference: 'Surah An-Nisa 4:110',
    },
  ];

  useEffect(() => {
    const rotateVerses = () => {
      const randomIndex = Math.floor(Math.random() * healingVerses.length);
      setHealingVerse(healingVerses[randomIndex]);
    };
    rotateVerses(); // Show first verse immediately
    const interval = setInterval(rotateVerses, 27000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col overflow-hidden relative">
      {/* Cosmic Video Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=2071&auto=format&fit=crop"
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-night-sky-with-stars-1380-large.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-indigo-900/40"></div>
      </div>

      {/* Arabic Calligraphy Header (Top Position) */}
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

      {/* Elevated Welcome Box */}
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
          transition={{
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1],
          }}
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

          {/* Healing Verse */}
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

          {/* Enhanced Create Invoice Button */}
          <motion.button
            onClick={() => navigate('/invoice')}
            className="w-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-medium py-3 px-6 rounded-lg shadow-md relative overflow-hidden group"
            whileHover={{
              scale: 1.03,
              boxShadow: '0 10px 25px -5px rgba(79, 70, 229, 0.4)',
            }}
            whileTap={{
              scale: 0.98,
              boxShadow: '0 5px 15px -3px rgba(79, 70, 229, 0.3)',
            }}
            initial={{ opacity: 0, y: 15 }}
            animate={
              inView
                ? {
                    opacity: 1,
                    y: 0,
                    transition: {
                      delay: 0.8,
                      type: 'spring',
                      stiffness: 300,
                      damping: 10,
                    },
                  }
                : {}
            }
          >
            <span className="relative z-10 flex items-center justify-center">
              <motion.span
                initial={{ x: -10, opacity: 0 }}
                animate={
                  inView
                    ? {
                        x: 0,
                        opacity: 1,
                        transition: { delay: 0.9 },
                      }
                    : {}
                }
              >
                Create Invoice
              </motion.span>
              <motion.span
                className="ml-2"
                initial={{ x: 10, opacity: 0 }}
                animate={
                  inView
                    ? {
                        x: 0,
                        opacity: 1,
                        transition: { delay: 1 },
                      }
                    : {}
                }
                whileHover={{ rotate: [0, 20, -20, 0] }}
                transition={{ duration: 0.5 }}
              >
                📄
              </motion.span>
            </span>
            <motion.span
              className="absolute inset-0 bg-white/20"
              initial={{
                x: '-100%',
                skewX: '-15deg',
              }}
              whileHover={{
                x: '100%',
                transition: {
                  duration: 0.8,
                  ease: 'easeInOut',
                },
              }}
            />
          </motion.button>
        </motion.div>
      </div>

      {/* Subtle Bottom Verse */}
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
