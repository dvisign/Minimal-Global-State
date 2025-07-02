import {Link, useLocation} from "react-router-dom";

const Header = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src="./logo.webp" alt="Medistream" className="h-8" />
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/todo"
              className={`text-base font-medium ${
                isActive("/todo")
                  ? "text-primary"
                  : "text-gray-600 hover:text-gray-900"
              }`}>
              TODO
            </Link>
            <Link
              to="/example"
              className={`text-base font-medium ${
                isActive("/example")
                  ? "text-primary"
                  : "text-gray-600 hover:text-gray-900"
              }`}>
              EXAMPLE
            </Link>
            {/* <Link
              to="/company"
              className={`text-base font-medium ${
                isActive("/company")
                  ? "text-primary"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              회사소개
            </Link>
            <Link
              to="/culture"
              className={`text-base font-medium ${
                isActive("/culture")
                  ? "text-primary"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              문화
            </Link>
            <Link
              to="/"
              className={`text-base font-medium ${
                isActive("/")
                  ? "text-primary"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              채용
            </Link> */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
