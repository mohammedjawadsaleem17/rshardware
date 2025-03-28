const Navbar = () => {
  return (
    <nav className="flex items-center justify-between bg-slate  -100 p-4 ">
      {/* Logo on the extreme left */}
      <div className="flex items-center">
        <h2 className="text-center">
          <span className="arizonia-regular text-indigo-500">RS&#160;</span>
          <span className="zain-black">Hardware Glass & Electricals</span>
        </h2>
      </div>

      {/* Navigation Links on the right */}
      <div className="flex space-x-6">
        <a
          href="/dashboard"
          className="text-indigo-500 hover:text-indigo-600 font-medium transition-colors"
        >
          Dashboard
        </a>
        <a
          href="/invoice"
          className="text-indigo-500 hover:text-indigo-600 font-medium transition-colors"
        >
          Invoice
        </a>
        <a
          href="/login"
          className="text-indigo-500 hover:text-indigo-600 font-medium transition-colors"
        >
          Login
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
