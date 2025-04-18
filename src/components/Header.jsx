import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';
import { useAuth } from './Auth/AuthProvider';

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <header className="bg-white shadow-md">
        <nav className=" mx-auto px-4 sm:px-6 ">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center">
                <Logo className="h-10 w-auto" />
                <h1 className="ml-3 text-xl sm:text-2xl font-semibold text-gray-900 unifrakturmaguntia-regular hidden sm:block">
                  Hardware Glass & Electricals
                </h1>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden sm:flex sm:items-center sm:space-x-8">
              {isAuthenticated && (
                <>
                  <Link
                    to="/"
                    className="relative text-gray-700 hover:text-indigo-600 text-sm font-medium transition-colors group"
                  >
                    Dashboard
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                  <Link
                    to="/invoice"
                    className="relative text-gray-700 hover:text-indigo-600 text-sm font-medium transition-colors group"
                  >
                    Invoice
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                  <button
                    onClick={logout}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-indigo-700 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-sm"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center sm:hidden">
              <button
                type="button"
                className="relative inline-flex items-center justify-center p-2 rounded-full text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
                aria-controls="mobile-menu"
                aria-expanded={mobileMenuOpen}
                onClick={toggleMobileMenu}
              >
                <span className="sr-only">Open main menu</span>
                <Menu
                  className={`h-6 w-6 transition-all duration-300 ${
                    mobileMenuOpen ? 'opacity-0 rotate-90' : 'opacity-100'
                  } absolute`}
                  aria-hidden="true"
                />
                <X
                  className={`h-6 w-6 transition-all duration-300 ${
                    mobileMenuOpen
                      ? 'opacity-100 rotate-0'
                      : 'opacity-0 -rotate-90'
                  } absolute`}
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile menu */}
        <div
          className={`sm:hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen
              ? 'max-h-96 opacity-100'
              : 'max-h-0 opacity-0 overflow-hidden'
          }`}
          id="mobile-menu"
        >
          <div className="px-4 pt-3 pb-4 space-y-2 bg-gray-50 border-t border-gray-200">
            {isAuthenticated && (
              <>
                <Link
                  to="/"
                  className="text-gray-700 hover:bg-indigo-100 hover:text-indigo-600 block px-4 py-3 rounded-lg text-base font-medium transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/invoice"
                  className="text-gray-700 hover:bg-indigo-100 hover:text-indigo-600 block px-4 py-3 rounded-lg text-base font-medium transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Invoice
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left text-gray-700 hover:bg-indigo-100 hover:text-indigo-600 block px-4 py-3 rounded-lg text-base font-medium transition-colors"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>

        {/* Brand name for mobile when not authenticated */}
        {!isAuthenticated && (
          <div className="sm:hidden px-4 py-3 bg-gray-50 border-t border-gray-200">
            <p className="text-center text-lg font-semibold text-gray-900 unifrakturmaguntia-regular">
              Hardware Glass & Electricals
            </p>
          </div>
        )}
      </header>

      {/* Custom CSS for animations */}
      <style jsx>{`
        .group:hover .w-0 {
          width: 100%;
        }
      `}</style>
    </>
  );
};

export default Header;
