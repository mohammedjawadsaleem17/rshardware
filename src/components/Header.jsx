import { Link } from 'react-router-dom';
import Logo from './Logo';
import { useAuth } from './Auth/AuthProvider';

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  return (
    <nav className="flex items-center justify-between p-2 pb-0 mt-0 mx-5">
      {
        <div className="flex items-center">
          <Logo />{' '}
          {isAuthenticated ? (
            ''
          ) : (
            <p className="unifrakturmaguntia-regular mt-2 ml-1 text-neutral-800">
              Hardware Glass & Electricals.
            </p>
          )}
        </div>
      }

      <div className="flex space-x-6">
        {isAuthenticated && (
          <Link
            to="/"
            className="text-indigo-500 hover:text-indigo-800 font-medium mt-2.5 transition-colors"
          >
            Dashboard
          </Link>
        )}
        {isAuthenticated && (
          <Link
            to="/invoice"
            className="text-indigo-700 hover:text-indigo-800 font-medium mt-2.5 transition-colors"
          >
            Invoice
          </Link>
        )}
        {isAuthenticated && (
          <button
            className="bg-indigo-600 text-white p-2 rounded mb-2 px-3"
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

