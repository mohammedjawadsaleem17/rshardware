import React, { useRef, useEffect, useState } from 'react';

const SpaceSection = () => {
  const canvasRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const stars = Array.from({ length: 150 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 0.5,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.8 + 0.2,
      twinkleSpeed: Math.random() * 0.03 + 0.01,
      twinklePhase: Math.random() * Math.PI * 2,
    }));

    const nebulae = Array.from({ length: 5 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 150 + 100,
      color: [
        `rgba(74, 20, 140, ${Math.random() * 0.2 + 0.05})`,
        `rgba(179, 136, 255, ${Math.random() * 0.2 + 0.05})`,
        `rgba(25, 29, 100, ${Math.random() * 0.2 + 0.05})`,
        `rgba(0, 106, 255, ${Math.random() * 0.2 + 0.05})`,
      ][Math.floor(Math.random() * 4)],
    }));

    const shootingStars = [];
    const addShootingStarRandomly = () => {
      if (Math.random() < 0.01 && shootingStars.length < 3) {
        shootingStars.push({
          x: Math.random() * canvas.width,
          y: 0,
          length: Math.random() * 150 + 50,
          speed: Math.random() * 15 + 10,
          angle: Math.PI / 4 + (Math.random() * Math.PI) / 8,
          alpha: 1,
          thickness: Math.random() * 2 + 1,
        });
      }
    };

    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      nebulae.forEach((nebula) => {
        const offsetX = (mousePosition.x - 0.5) * 20;
        const offsetY = (mousePosition.y - 0.5) * 20;

        const grd = ctx.createRadialGradient(
          nebula.x + offsetX * 0.5,
          nebula.y + offsetY * 0.5,
          0,
          nebula.x + offsetX * 0.5,
          nebula.y + offsetY * 0.5,
          nebula.radius
        );
        grd.addColorStop(0, nebula.color);
        grd.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(nebula.x, nebula.y, nebula.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      stars.forEach((star) => {
        star.twinklePhase += star.twinkleSpeed;
        const twinkle = Math.sin(star.twinklePhase) * 0.5 + 0.5;
        const parallaxFactor = star.radius / 2;
        const offsetX = (mousePosition.x - 0.5) * parallaxFactor * 10;
        const offsetY = (mousePosition.y - 0.5) * parallaxFactor * 10;

        const gradient = ctx.createRadialGradient(
          star.x + offsetX,
          star.y + offsetY,
          0,
          star.x + offsetX,
          star.y + offsetY,
          star.radius * 4
        );
        gradient.addColorStop(
          0,
          `rgba(255, 255, 255, ${star.alpha * twinkle})`
        );
        gradient.addColorStop(
          0.1,
          `rgba(200, 220, 255, ${star.alpha * twinkle * 0.8})`
        );
        gradient.addColorStop(
          0.4,
          `rgba(150, 200, 255, ${star.alpha * twinkle * 0.2})`
        );
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(
          star.x + offsetX,
          star.y + offsetY,
          star.radius * (0.8 + twinkle * 0.2),
          0,
          Math.PI * 2
        );
        ctx.fill();

        star.x += star.dx;
        star.y += star.dy;

        if (star.x < -50) star.x = canvas.width + 50;
        if (star.x > canvas.width + 50) star.x = -50;
        if (star.y < -50) star.y = canvas.height + 50;
        if (star.y > canvas.height + 50) star.y = -50;
      });

      addShootingStarRandomly();

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const star = shootingStars[i];
        const tailX = star.x + Math.cos(star.angle) * star.length;
        const tailY = star.y + Math.sin(star.angle) * star.length;

        const gradient = ctx.createLinearGradient(star.x, star.y, tailX, tailY);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${star.alpha})`);
        gradient.addColorStop(0.6, `rgba(200, 230, 255, ${star.alpha * 0.6})`);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.strokeStyle = gradient;
        ctx.lineWidth = star.thickness;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();

        star.x += Math.cos(star.angle) * star.speed;
        star.y += Math.sin(star.angle) * star.speed;

        if (star.y > canvas.height || star.x < 0 || star.x > canvas.width) {
          shootingStars.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mousePosition]);

  return (
    <section
      className="space-section"
      style={{
        position: 'relative',
        minHeight: '75vh',
        margin: 0,
        padding: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        overflow: 'hidden',
        backgroundColor: 'black',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 1,
        }}
      ></div>

      <div
        style={{
          zIndex: 2,
          maxWidth: 800,
          position: 'relative',
          textAlign: 'center',
        }}
      >
        <img
          className="logo-img"
          src="https://lh3.googleusercontent.com/p/AF1QipPwq1gXy2YNyyUnwsu_j5IfB708HK0cX1LgeIb4=s1360-w1360-h1020-rw"
          alt="RS Hardware Logo"
          style={{
            height: 175,
            marginBottom: 37,
            animation: 'pulse 5s ease-in-out infinite',
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        />

        <h1
          style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            marginTop: '1rem',
            marginBottom: '1rem',
            background: 'linear-gradient(to right, #facc15, #fde68a, #facc15)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundSize: '400% 100%',
            animation: 'shine 7s linear infinite',
          }}
        >
          Your Trusted <span className="">Hardware</span> &{' '}
          <span className=" ">Electrical</span> Supplier !
        </h1>
        <p
          style={{ fontSize: '0.8rem', marginBottom: '2rem', fontWeight: 300 }}
          className="text-indigo-50"
        >
          Premium quality products at competitive
          <br /> prices since 2024
        </p>
        <a href="tel:+918147465517">
          <button
            style={{
              backgroundColor: 'white',
              color: '#1e40af',
              fontWeight: 'bold',
              padding: '0.75rem 2rem',
              borderRadius: '0.5rem',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 14px 0 rgba(0, 118, 255, 0.39)',
              cursor: 'pointer',
            }}
          >
            Contact Now
          </button>
        </a>
      </div>

      {/* Animations & Mobile Styling */}
      <style>
        {`
          @keyframes shine {
            0% { background-position: 0% 50%; }
            100% { background-position: 100% 50%; }
          }

          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }

          @media (max-width: 768px) {
            .space-section {
              margin-top: 0 !important;
              padding-top: 0 !important;
            }

            .logo-img {
              margin-top: 1rem !important;
            }
          }
        `}
      </style>
    </section>
  );
};

export default SpaceSection;
