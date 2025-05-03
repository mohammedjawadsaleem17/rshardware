import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from './Auth/AuthProvider';

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Enhanced Logo Component
  const Logo = () => (
    <motion.div
      className="flex items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        className="mr-2"
        whileHover={{ scale: 1.05 }}
      >
        {/* Background circle */}
        <motion.circle
          cx="20"
          cy="20"
          r="18"
          fill="#4f46e5"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, type: 'spring' }}
        />
        {/* R letter */}
        <motion.path
          d="M12 12h6v16h-6v-16zm6 8l6 8"
          stroke="white"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
        {/* S letter */}
        <motion.path
          d="M24 12c0 4-3 6-6 6s-6 2-6 6c0 4 3 6 6 6s6 2 6 6"
          stroke="white"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        />
      </motion.svg>

      <motion.h1
        className="text-xl sm:text-2xl font-semibold text-gray-900 hidden sm:block"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.7 }}
      >
        <span className="text-indigo-600">R S</span> Hardware Glass &
        Electricals
      </motion.h1>
    </motion.div>
  );

  return (
    <>
      <motion.header
        className="bg-white shadow-sm z-50"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <nav className="mx-auto px-4 sm:px-6 lg:px-8 max-w-12-xl">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex-shrink-0">
              <Logo />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden sm:flex sm:items-center sm:space-x-1">
              {
                <>
                  {isAuthenticated && (
                    <motion.div whileHover={{ scale: 1.05 }}>
                      <Link
                        to="/dashboard"
                        className="relative text-gray-600 hover:text-indigo-600 font-medium px-3 py-2 transition-colors"
                      >
                        Dashboard
                        <motion.div
                          className="absolute bottom-0 left-0 h-0.5 bg-indigo-600"
                          initial={{ width: 0 }}
                          whileHover={{ width: '100%' }}
                          transition={{ duration: 0.3 }}
                        />
                      </Link>
                    </motion.div>
                  )}

                  {isAuthenticated && (
                    <motion.div whileHover={{ scale: 1.05 }}>
                      <Link
                        to="/invoice"
                        className="relative text-gray-600 hover:text-indigo-600 font-medium px-3 py-2 transition-colors"
                      >
                        Invoice
                        <motion.div
                          className="absolute bottom-0 left-0 h-0.5 bg-indigo-600"
                          initial={{ width: 0 }}
                          whileHover={{ width: '100%' }}
                          transition={{ duration: 0.3 }}
                        />
                      </Link>
                    </motion.div>
                  )}

                  {isAuthenticated ? (
                    <motion.button
                      onClick={logout}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium shadow-sm"
                      whileHover={{
                        y: -2,
                        boxShadow: '0 4px 12px rgba(79, 70, 229, 0.2)',
                      }}
                      whileTap={{
                        y: 1,
                        boxShadow: '0 2px 4px rgba(79, 70, 229, 0.1)',
                      }}
                    >
                      Logout
                    </motion.button>
                  ) : (
                    <>
                      <motion.button
                        onClick={() => navigate('/')}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium shadow-sm"
                        whileHover={{
                          y: -2,
                          boxShadow: '0 4px 12px rgba(79, 70, 229, 0.2)',
                        }}
                        whileTap={{
                          y: 1,
                          boxShadow: '0 2px 4px rgba(79, 70, 229, 0.1)',
                        }}
                      >
                        Home
                      </motion.button>
                      <motion.button
                        onClick={() => navigate('/login')}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium shadow-sm"
                        whileHover={{
                          y: -2,
                          boxShadow: '0 4px 12px rgba(79, 70, 229, 0.2)',
                        }}
                        whileTap={{
                          y: 1,
                          boxShadow: '0 2px 4px rgba(79, 70, 229, 0.1)',
                        }}
                      >
                        Login
                      </motion.button>
                    </>
                  )}
                </>
              }
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center sm:hidden">
              <motion.button
                onClick={toggleMobileMenu}
                className="p-2 rounded-md text-gray-600 hover:bg-gray-100"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {mobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                    >
                      <X className="h-6 w-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                    >
                      <Menu className="h-6 w-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="sm:hidden overflow-hidden"
            >
              <div className="px-4 pt-2 pb-4 space-y-2 bg-gray-50 border-t">
                {
                  <>
                    {isAuthenticated && (
                      <motion.div
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                      >
                        <Link
                          to="/"
                          className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-indigo-100 font-medium"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Dashboard
                        </Link>
                      </motion.div>
                    )}
                    {isAuthenticated && (
                      <motion.div
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <Link
                          to="/invoice"
                          className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-indigo-100 font-medium"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Invoice
                        </Link>
                      </motion.div>
                    )}
                    {isAuthenticated ? (
                      <motion.div
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <button
                          onClick={() => {
                            logout();
                            setMobileMenuOpen(false);
                          }}
                          className="w-full text-left px-4 py-3 rounded-lg text-gray-700 hover:bg-indigo-100 font-medium"
                        >
                          Logout
                        </button>
                      </motion.div>
                    ) : (
                      <>
                        <motion.div
                          initial={{ x: 20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          <button
                            onClick={() => {
                              navigate('/');
                            }}
                            className="w-full text-left px-4 py-3 rounded-lg text-gray-700 hover:bg-indigo-100 font-medium"
                          >
                            Home
                          </button>
                        </motion.div>
                        <motion.div
                          initial={{ x: 20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          <button
                            onClick={() => {
                              navigate('/login');
                            }}
                            className="w-full text-left px-4 py-3 rounded-lg text-gray-700 hover:bg-indigo-100 font-medium"
                          >
                            Login
                          </button>
                        </motion.div>
                      </>
                    )}
                  </>
                }
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
};

export default Header;
