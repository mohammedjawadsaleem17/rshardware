import { Link } from 'react-router-dom';
import Logo from './Logo';
import { useAuth } from './Auth/AuthProvider';

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  return (
    <nav className="flex items-center justify-between  p-4 mt-0 ">
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
            className="text-indigo-600 hover:text-indigo-700 font-medium  mt-2 transition-colors"
          >
            Invoice
          </Link>
        )}
        {isAuthenticated && (
          <button
            className="bg-indigo-500 text-white p-2 rounded mb-4 p-1  "
            onClick={logout}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Header;

/*: (
          <Link
            to="/login"
            className="text-indigo-600 hover:text-indigo-700 font-medium  mt-2 transition-colors"
          >
            Login
          </Link>
        )}*/
