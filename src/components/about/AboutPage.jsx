import { useState, useEffect } from 'react';

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animations after component mounts
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-white shadow-md py-4"></header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          {/* Left side - Photo with animation */}
          <div
            className={`w-full md:w-1/2 transition-all duration-1000 transform ${
              isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-12'
            }`}
          >
            <div className="relative overflow-hidden rounded-lg shadow-2xl">
              <div className="absolute inset-0 bg-blue-500 opacity-20 hover:opacity-0 transition-opacity duration-500"></div>
              <img
                src="src/assets/profile.jpg"
                alt="RS Hardware Store"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          {/* Right side - About content with animation */}
          <div
            className={`w-full md:w-1/2 transition-all duration-1000 delay-300 transform ${
              isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-12'
            }`}
          >
            <div className="bg-white rounded-lg shadow-lg p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-teal-400"></div>

              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                About Us
              </h2>

              <p className="text-gray-600 mb-4">
                Founded in 2024 by Fahad Pasha,{' '}
                <span className="font-semibold text-blue-600">RS Hardware</span>{' '}
                has been a cornerstone of the community for more than 1+ years.
                What started as a small vision has now grown into the region's
                most trusted supplier of hardware and electrical products.
              </p>

              <p className="text-gray-600 mb-4">
                Our mission is to provide contractors, builders, and homeowners
                with the highest quality products at competitive prices, backed
                by unmatched customer service and technical expertise.
              </p>

              <p className="text-gray-600 mb-4">
                With a team of experienced professionals and a commitment to
                excellence, we continue to evolve while maintaining the personal
                touch that has defined our business since day one.
              </p>

              <div
                className={`mt-8 transition-all duration-1000 delay-700 transform ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
              >
                <a href="tel:+918147465517">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 flex items-center gap-2">
                    Contact Us
                    <span className="inline-block animate-bounce">→</span>
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

 <a href="tel:+918147465517">
   <button className="bg-white text-indigo-800 hover:bg-gray-100 font-bold py-3 px-8 rounded-md transition-all">
     Contact Now
   </button>
 </a>;