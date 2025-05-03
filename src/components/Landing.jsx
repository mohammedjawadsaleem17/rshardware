import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronRight,
  Heart,
  Truck,
  DollarSign,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';
import ImageCarousel from './ImageCarousel';
import EnhancedImageCarousel from './ImageCarousel';

// Animation component for fade-in effect when scrolling
const FadeInSection = ({ children, direction = 'up' }) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = React.useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => setVisible(entry.isIntersecting));
      },
      { threshold: 0.1 }
    );

    const { current } = domRef;
    observer.observe(current);

    return () => observer.unobserve(current);
  }, []);

  const getTransform = () => {
    switch (direction) {
      case 'up':
        return 'translateY(40px)';
      case 'down':
        return 'translateY(-40px)';
      case 'left':
        return 'translateX(40px)';
      case 'right':
        return 'translateX(-40px)';
      default:
        return 'translateY(40px)';
    }
  };

  return (
    <div
      ref={domRef}
      className={`transition-all duration-700 ease-in-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0'}`}
      style={{ transform: isVisible ? 'none' : getTransform() }}
    >
      {children}
    </div>
  );
};

// Main component
export default function Landing() {
  // Reference for canvas
  const canvasRef = useRef(null);

  // Initialize the animated background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Ensure canvas covers the entire parent
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
    };

    // Set initial size
    resizeCanvas();

    // Add resize listener
    window.addEventListener('resize', resizeCanvas);

    // Particle system configuration
    const particles = [];
    const particleCount = window.innerWidth < 768 ? 30 : 80;
    const connectionDistance = window.innerWidth < 768 ? 100 : 150;
    const particleSize = window.innerWidth < 768 ? 1.5 : 2;

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * particleSize + 0.5,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        color: `rgba(255, 215, 0, ${Math.random() * 0.4 + 0.1})`, // Gold color with variable opacity
      });
    }

    // Animation function
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move particles
        p.x += p.speedX;
        p.y += p.speedY;

        // Bounce off edges
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        // Connect particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            // Calculate opacity based on distance
            const opacity = 1 - distance / connectionDistance;

            // Draw connection line
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(255, 215, 0, ${opacity * 0.2})`; // Gold color for lines
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Request next frame
      animationFrameId = requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    // Cleanup function
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="font-sans overflow-x-hidden w-full">
      {/* Hero Section with Animated Background */}
      <section className="relative bg-gray-900 text-white overflow-hidden">
        {/* Animated Canvas Background */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-0"
          style={{
            background:
              'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
          }}
        />

        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black opacity-40 z-10"></div>

        {/* Content Container */}
        <div className="container mx-auto px-4 py-24 relative z-20">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <img
              src="https://lh3.googleusercontent.com/p/AF1QipPwq1gXy2YNyyUnwsu_j5IfB708HK0cX1LgeIb4=s1360-w1360-h1020-rw"
              alt="RS Hardware Logo"
              className="h-20 mb-8"
              style={{
                animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
              }}
            />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Your Trusted{' '}
              <span
                className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-400"
                style={{
                  backgroundSize: '400% 100%',
                  animation: 'shine 3s linear infinite',
                }}
              >
                Hardware
              </span>{' '}
              &{' '}
              <span
                className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-400"
                style={{
                  backgroundSize: '400% 100%',
                  animation: 'shine 3s linear infinite',
                  animationDelay: '0.5s',
                }}
              >
                Electrical
              </span>{' '}
              Supplier
            </h1>
            <p className="text-lg md:text-2xl mb-8">
              Premium quality products at competitive prices since 2024
            </p>
            <a href="tel:+918147465517">
              <button
                className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-md transition-all"
                style={{
                  transform: 'translateY(0)',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 14px 0 rgba(0, 118, 255, 0.39)',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow =
                    '0 6px 20px rgba(0, 118, 255, 0.23)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow =
                    '0 4px 14px 0 rgba(0, 118, 255, 0.39)';
                }}
              >
                Contact Now
              </button>
            </a>
          </div>
        </div>

        {/* Add floating hardware icons */}
        <div
          className="hidden md:block absolute bottom-10 left-10 z-20 opacity-30"
          style={{
            animation: 'float 6s ease-in-out infinite',
          }}
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
            <path d="M11 1L1 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-10-4z"></path>
          </svg>
        </div>
        <div
          className="hidden md:block absolute top-20 right-20 z-20 opacity-20"
          style={{
            animation: 'float 7s ease-in-out infinite',
            animationDelay: '1s',
          }}
        >
          <svg width="30" height="30" viewBox="0 0 24 24" fill="white">
            <path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"></path>
          </svg>
        </div>
        <div
          className="hidden md:block absolute bottom-32 right-32 z-20 opacity-25"
          style={{
            animation: 'float 8s ease-in-out infinite',
            animationDelay: '0.5s',
          }}
        >
          <svg width="35" height="35" viewBox="0 0 24 24" fill="white">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path>
            <path d="M13 7h-2v5.414l3.293 3.293 1.414-1.414L13 11.586z"></path>
          </svg>
        </div>
      </section>

      {/* Features */}
      <section className="bg-indigo-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center">
              <Heart size={32} className="mb-4" />
              <p className="text-sm">
                Loved & trusted by over 10,000 customers
              </p>
            </div>
            <div className="flex flex-col items-center">
              <ChevronRight size={32} className="mb-4" />
              <p className="text-sm">
                Top quality materials & branded products
              </p>
            </div>
            <div className="flex flex-col items-center">
              <Truck size={32} className="mb-4" />
              <p className="text-sm">Free shipping on orders over ₹1000</p>
            </div>
            <div className="flex flex-col items-center">
              <DollarSign size={32} className="mb-4" />
              <p className="text-sm">Best price guarantee on all products</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <FadeInSection>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Featured Products
            </h2>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FadeInSection direction="left">
              <div className="bg-gray-100 rounded-lg overflow-hidden shadow-lg">
                <img
                  src="https://lh3.googleusercontent.com/p/AF1QipOOfBz481YVVbH2Ruk-UA_snpIdWgaTe8Xm747A=s1360-w1360-h1020-rw"
                  alt="Hardware products"
                  className="w-full h-64 object-cover"
                />
                <div className="p-4 md:p-6">
                  <h3 className="text-xl md:text-2xl font-bold mb-2">
                    Premium Hardware
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Our extensive collection of high-quality hardware products
                    caters to both professional contractors and DIY enthusiasts.
                  </p>
                </div>
              </div>
            </FadeInSection>

            <FadeInSection>
              <div className="bg-gray-100 rounded-lg overflow-hidden shadow-lg">
                <img
                  src="https://lh3.googleusercontent.com/p/AF1QipNZMNqNY7Jy3gqbgtmkom6C8wZKq1wQ4UiG1bUO=s1360-w1360-h1020-rw"
                  alt="Electrical supplies"
                  className="w-full h-64 object-cover"
                />
                <div className="p-4 md:p-6">
                  <h3 className="text-xl md:text-2xl font-bold mb-2">
                    Electrical Supplies
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Find everything from wiring and lighting to advanced
                    electrical components from trusted brands.
                  </p>
                </div>
              </div>
            </FadeInSection>

            <FadeInSection direction="right">
              <div className="bg-gray-100 rounded-lg overflow-hidden shadow-lg">
                <img
                  src="https://lh3.googleusercontent.com/p/AF1QipM8OSjGhBK0OH9CZmdqgnbUSjQG9GxgGUb7W1O0=s1360-w1360-h1020-rw"
                  alt="Tools collection"
                  className="w-full h-64 object-cover"
                />
                <div className="p-4 md:p-6">
                  <h3 className="text-xl md:text-2xl font-bold mb-2">
                    Professional Tools
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Our selection of professional-grade tools ensures durability
                    and precision for any project.
                  </p>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-full md:w-1/2">
              <FadeInSection direction="left">
                <img
                  src="https://lh3.googleusercontent.com/p/AF1QipPkpYbIIjAIjpTS83-ECSHDFpVnpL5I5GOTA2mv=s1360-w1360-h1020-rw"
                  alt="RS Hardware Store"
                  className="rounded-lg shadow-xl w-full"
                />
              </FadeInSection>
            </div>
            <div className="w-full md:w-1/2">
              <FadeInSection direction="right">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  About RS Hardware
                </h2>
                <p className="text-gray-700 mb-6">
                  Founded in 2024 by Fahad Pasha, RS Hardware has been a
                  cornerstone of the community for more than 1+ years. What
                  started as a small vision has now grown into the region's most
                  trusted supplier of hardware and electrical products.
                </p>
                <p className="text-gray-700 mb-6">
                  Our mission is to provide contractors, builders, and
                  homeowners with the highest quality products at competitive
                  prices, backed by unmatched customer service and technical
                  expertise.
                </p>
                <p className="text-gray-700">
                  With a team of experienced professionals and a commitment to
                  excellence, we continue to evolve while maintaining the
                  personal touch that has defined our business since day one.
                </p>
              </FadeInSection>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <FadeInSection>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              What Our Customers Say
            </h2>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FadeInSection>
              <div className="bg-gray-50 p-6 rounded-lg shadow">
                <div className="flex items-center text-yellow-400 mb-4">
                  {'★'.repeat(5)}
                </div>
                <p className="text-gray-700 mb-6">
                  "RS Hardware has been my go-to supplier for all my
                  construction projects. Their selection is unmatched and the
                  staff is always helpful and knowledgeable."
                </p>
                <p className="font-bold">- Arfath Pasha</p>
              </div>
            </FadeInSection>

            <FadeInSection>
              <div className="bg-gray-50 p-6 rounded-lg shadow">
                <div className="flex items-center text-yellow-400 mb-4">
                  {'★'.repeat(5)}
                </div>
                <p className="text-gray-700 mb-6">
                  "I appreciate the quality and reliability of the products at
                  RS Hardware. Their technical support is exceptional & Their
                  quality is Amazing Highly Recommended to Try it out."
                </p>
                <p className="font-bold">- Rizwana Banu</p>
              </div>
            </FadeInSection>

            <FadeInSection>
              <div className="bg-gray-50 p-6 rounded-lg shadow">
                <div className="flex items-center text-yellow-400 mb-4">
                  {'★'.repeat(5)}
                </div>
                <p className="text-gray-700 mb-6">
                  "The team at RS Hardware helped me find exactly what I needed
                  for my home renovation project. Their prices are competitive
                  and the quality is outstanding."
                </p>
                <p className="font-bold">- Abdul Arfath</p>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      <EnhancedImageCarousel />

      {/* CTA Section */}
      <section className="py-16 bg-indigo-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <FadeInSection>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your Construction?
            </h2>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
              Visit our store for the best selection of hardware and electrical
              supplies in the region.
            </p>
            <a href="tel:+918147465517">
              <button className="bg-white text-indigo-800 hover:bg-gray-100 font-bold py-3 px-8 rounded-md transition-all">
                Contact Now
              </button>
            </a>
          </FadeInSection>
        </div>
      </section>

      {/* Contact & Footer */}
      <section className="py-12 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">RS Hardware</h3>
              <p className="text-gray-400 mb-2">
                Quality hardware and electrical supplies since 2024
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Products
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Contact Us</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center">
                  <Phone size={16} className="mr-2 flex-shrink-0" />
                  <span className="break-words">(+91) 8147465517</span>
                </li>
                <li className="flex items-center">
                  <Mail size={16} className="mr-2 flex-shrink-0" />
                  <span className="break-words">rshardware2210@gmail.com</span>
                </li>
                <li className="flex items-start">
                  <MapPin size={16} className="mr-2 mt-1 flex-shrink-0" />
                  <span className="break-words">
                    Building No - 3/7, Shop No-6, Ground Floor Arekere Main Road
                    Benagaluru, Karnataka, India 560076
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Store Hours</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Monday - Friday: 8AM - 11PM</li>
                <li>Saturday: 8AM - 10PM</li>
                <li>Sunday: 8AM - 9PM</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} RS Hardware. All rights
              reserved.
            </p>
            <p>
              This Application is Developed & Maintained by{' '}
              <a
                target="_blank"
                href="https://mohammedjawadsaleem11.github.io/portfolio"
              >
                2x+1
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes shine {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }

        @keyframes float {
          0% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(5deg);
          }
          100% {
            transform: translateY(0px) rotate(0deg);
          }
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }
      `}</style>
    </div>
  );
}
