
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <h2 className="text-center transform transition-all duration-100 hover:scale-105 ">
      <Link to="/" className="inline-block p-2 rounded-lg">
        <span
          className="dancing-script-test text-indigo-700 text-4xl font-bold drop-shadow-md 
                     transition-all duration-300 
                     "
        >
          RS&#160;
        </span>
        <span
          className="zain-black text-zinc-700 text-2xl font-semibold 
                     tracking-wider uppercase 
                     transition-all duration-300 hover:text-zinc-900 
                     "
        ></span>
      </Link>
    </h2>
  );
};

export default Logo;
