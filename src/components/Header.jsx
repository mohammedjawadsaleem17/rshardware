import { Link } from 'react-router-dom';
import Logo from './Logo';
import { useAuth } from './Auth/AuthProvider';

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  return (
    <nav className="flex items-center justify-between p-4 mt-0 mx-5">
      <div className="flex items-center">
        <Logo />
      </div>
      <div className="flex space-x-6">
        {isAuthenticated && (
          <Link
            to="/"
            className="text-indigo-600 hover:text-indigo-700 font-medium mt-2 transition-colors"
          >
            Dashboard
          </Link>
        )}
        {isAuthenticated && (
          <Link
            to="/invoice"
            className="text-indigo-600 hover:text-indigo-700 font-medium mt-2 transition-colors"
          >
            Invoice
          </Link>
        )}
        {isAuthenticated && (
          <button
            className="bg-indigo-500 text-white p-2 rounded mb-4 px-3"
            onClick={logout}
          >
            <span className="hidden sm:inline">Logout</span>
            <span className="sm:hidden">
              <span className="material-symbols-outlined">logout</span>
            </span>
          </button>
        )}
      </div>
    </nav>
  );
};

export default Header;

