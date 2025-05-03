import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthProvider';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import Footer from '../Footer';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [stars, setStars] = useState([]);

  // Create starfield effect
  useEffect(() => {
    const starsArray = [];
    const starCount = 150;

    for (let i = 0; i < starCount; i++) {
      starsArray.push({
        id: i,
        size: Math.random() * 3 + 1,
        x: Math.random() * 100,
        y: Math.random() * 100,
        opacity: Math.random(),
        duration: Math.random() * 10 + 10,
      });
    }

    setStars(starsArray);
  }, []);

  // Create shooting stars
  useEffect(() => {
    if (stars.length === 0) return;

    const shootingStarInterval = setInterval(() => {
      const newStar = {
        id: Date.now(),
        size: Math.random() * 2 + 1,
        x: Math.random() * 100,
        y: 0,
        opacity: 1,
        duration: 1,
        isShooting: true,
      };

      setStars((prev) => [...prev.slice(-200), newStar]);
    }, 2000);

    return () => clearInterval(shootingStarInterval);
  }, [stars]);

  const notifySuccess = () => toast.success('Login Success!');
  const notifyFailed = () => toast.error('Wrong Credentials!');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (username === '' || password === '') {
      toast.error('Please fill in all fields!');
      setIsLoading(false);
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (login(username, password)) {
      notifySuccess();
      navigate('/');
    } else {
      notifyFailed();
    }

    setIsLoading(false);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0a0e23',
        backgroundImage: 'radial-gradient(circle at 50% 50%, #1a2a6c, #0a0e23)',
        overflow: 'hidden',
        position: 'relative',
        padding: '20px',
      }}
    >
      {/* Starfield Background */}
      {stars.map((star) => (
        <div
          key={star.id}
          style={{
            position: 'absolute',
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: 'white',
            borderRadius: '50%',
            left: `${star.x}%`,
            top: `${star.y}%`,
            opacity: star.opacity,
            animation: star.isShooting
              ? `shootingStar ${star.duration}s linear forwards`
              : `twinkle ${star.duration}s ease-in-out infinite`,
            zIndex: 0,
          }}
        />
      ))}

      {/* Nebula Effect */}
      <div
        style={{
          position: 'absolute',
          width: '300px',
          height: '300px',
          background:
            'radial-gradient(circle, rgba(138,43,226,0.15) 0%, rgba(0,0,0,0) 70%)',
          borderRadius: '50%',
          top: '20%',
          right: '10%',
          filter: 'blur(20px)',
          zIndex: 1,
        }}
      />

      <div
        style={{
          position: 'absolute',
          width: '400px',
          height: '400px',
          background:
            'radial-gradient(circle, rgba(100,149,237,0.1) 0%, rgba(0,0,0,0) 70%)',
          borderRadius: '50%',
          bottom: '10%',
          left: '15%',
          filter: 'blur(20px)',
          zIndex: 1,
        }}
      />

      {/* Main Login Form */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          maxWidth: '450px',
          background: 'rgba(15, 23, 42, 0.8)',
          backdropFilter: 'blur(10px)',
          borderRadius: '16px',
          padding: '40px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          animation: 'fadeIn 0.8s ease-out',
          transform: 'scale(1)',
          transition: 'transform 0.3s ease',
          ':hover': {
            transform: 'scale(1.02)',
          },
        }}
      >
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          toastStyle={{ backgroundColor: '#1e293b', color: 'white' }}
        />

        <h2
          style={{
            color: 'white',
            fontSize: '1.5rem',
            fontWeight: '600',
            textAlign: 'center',
            marginBottom: '30px',
            letterSpacing: '1px',
            background: 'linear-gradient(90deg, #8b5cf6, #3b82f6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Welcome to SmartSettle Login
        </h2>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '25px' }}>
            <label
              style={{
                display: 'block',
                color: '#94a3b8',
                marginBottom: '8px',
                fontSize: '0.9rem',
                letterSpacing: '0.5px',
              }}
            >
              Username
            </label>
            <div
              style={{
                position: 'relative',
                marginBottom: '5px',
              }}
            >
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 20px',
                  background: 'rgba(30, 41, 59, 0.5)',
                  border: '1px solid rgba(100, 116, 139, 0.3)',
                  borderRadius: '8px',
                  color: 'white',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  ':focus': {
                    borderColor: '#6366f1',
                    boxShadow: '0 0 0 3px rgba(99, 102, 241, 0.3)',
                  },
                  '::placeholder': {
                    color: '#64748b',
                  },
                }}
                placeholder="Enter your username"
              />
            </div>
          </div>

          <div style={{ marginBottom: '30px' }}>
            <label
              style={{
                display: 'block',
                color: '#94a3b8',
                marginBottom: '8px',
                fontSize: '0.9rem',
                letterSpacing: '0.5px',
              }}
            >
              Password
            </label>
            <div
              style={{
                position: 'relative',
                marginBottom: '5px',
              }}
            >
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 20px',
                  background: 'rgba(30, 41, 59, 0.5)',
                  border: '1px solid rgba(100, 116, 139, 0.3)',
                  borderRadius: '8px',
                  color: 'white',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  ':focus': {
                    borderColor: '#6366f1',
                    boxShadow: '0 0 0 3px rgba(99, 102, 241, 0.3)',
                  },
                  '::placeholder': {
                    color: '#64748b',
                  },
                }}
                placeholder="Enter your password"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '14px',
              background: 'linear-gradient(45deg, #6366f1, #8b5cf6)',
              border: 'none',
              borderRadius: '8px',
              color: 'white',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 4px 15px rgba(99, 102, 241, 0.4)',
              ':hover': !isLoading
                ? {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 20px rgba(99, 102, 241, 0.6)',
                  }
                : {},
              ':active': {
                transform: 'translateY(0)',
              },
            }}
          >
            {isLoading ? (
              <>
                <span
                  style={{
                    position: 'relative',
                    zIndex: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <svg
                    style={{
                      animation: 'spin 1s linear infinite',
                      marginRight: '10px',
                      width: '20px',
                      height: '20px',
                    }}
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
                      opacity=".25"
                    />
                    <path
                      fill="currentColor"
                      d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"
                    />
                  </svg>
                  Authenticating...
                </span>
                <span
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'rgba(255,255,255,0.1)',
                    zIndex: 1,
                  }}
                />
              </>
            ) : (
              'Login'
            )}
          </button>
        </form>
      </div>

      {/* Footer */}
      <div
        style={{
          marginTop: '40px',
          width: '100%',
          zIndex: 2,
        }}
      >
        <Footer />
      </div>

      {/* Global styles for animations */}
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }
        
        @keyframes shootingStar {
          0% {
            transform: translate(0, 0);
            opacity: 1;
          }
          70% {
            opacity: 1;
          }
          100% {
            transform: translate(100px, 100px);
            opacity: 0;
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
