import { Link } from 'react-router-dom';
import Logo from './Logo';

const Header = () => {
  return (
    <nav className="flex items-center justify-between  p-4 ">
      <div className="flex items-center">
        <Logo />
      </div>
      <div className="flex space-x-6">
        <Link
          to="/"
          className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
        >
          Dashboard
        </Link>
        <Link
          to="/invoice"
          className="text-indigo-600 hover:text-indigo-700 font-medium  transition-colors"
        >
          Invoice
        </Link>
        <Link
          to="/login"
          className="text-indigo-600 hover:text-indigo-700 font-medium  transition-colors"
        >
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Header;
