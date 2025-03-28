
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Home, Users, Briefcase, MessageSquare, Bell, User, Menu, X, BookIcon, ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/cn';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';

interface NavbarProps {
  isAuthenticated?: boolean;
  cartItemsCount?: number;
}

const Navbar = ({ isAuthenticated = false, cartItemsCount }: NavbarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const handleLogout = () => {
    localStorage.removeItem('authUser');
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-white shadow-sm" : "bg-white"
      )}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <BookIcon className="h-8 w-8 text-blue-600" />
              <span className="text-blue-600 font-semibold ml-1">Bookstore</span>
            </Link>

            {isAuthenticated && !isMobile && (
              <div className="ml-6 relative max-w-xs">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                  <input
                    type="search"
                    placeholder="Search books"
                    className="bg-gray-100 text-sm rounded-md py-2 pl-10 pr-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                  />
                </div>
              </div>
            )}
          </div>

          {isAuthenticated && !isMobile ? (
            <nav className="flex items-center space-x-1">
              <Link to="/feed" className={cn(
                "flex flex-col items-center px-3 py-2 text-sm font-medium text-gray-500 hover:text-black",
                location.pathname === "/feed" && "text-black border-b-2 border-black"
              )}>
                <Home size={20} />
                <span className="mt-1">Home</span>
              </Link>
              <Link to="/books" className={cn(
                "flex flex-col items-center px-3 py-2 text-sm font-medium text-gray-500 hover:text-black",
                location.pathname === "/books" && "text-black border-b-2 border-black"
              )}>
                <BookIcon size={20} />
                <span className="mt-1">Books</span>
              </Link>
              <Link to="/cart" className={cn(
                "flex flex-col items-center px-3 py-2 text-sm font-medium text-gray-500 hover:text-black",
                location.pathname === "/cart" && "text-black border-b-2 border-black"
              )}>
                <ShoppingBag size={20} />
                <span className="mt-1">Cart</span>
                {cartItemsCount ? (
                  <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {cartItemsCount}
                  </span>
                ) : null}
              </Link>
              <div className="flex flex-col items-center px-3 py-2 text-sm font-medium text-gray-500 hover:text-black cursor-pointer relative group">
                <User size={20} />
                <span className="mt-1">Me</span>
                <div className="absolute top-full right-0 w-64 mt-1 bg-white shadow-lg rounded-md hidden group-hover:block">
                  <div className="p-4 border-b">
                    <Link to="/profile" className="font-medium text-blue-600 hover:underline">View Profile</Link>
                  </div>
                  <div className="p-2">
                    <button onClick={handleLogout} className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            </nav>
          ) : !isAuthenticated && !isMobile ? (
            <div className="flex items-center space-x-4">
              <Link to="/login" className="text-sm font-medium text-gray-600 hover:text-gray-900">
                Sign in
              </Link>
              <Link to="/register" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700">
                Join now
              </Link>
            </div>
          ) : (
            <button 
              onClick={toggleMenu} 
              className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          )}
        </div>
      </div>

      {isMobile && isMenuOpen && (
        <div className="bg-white border-t animate-slide-down">
          <nav className="container mx-auto px-4 py-4">
            {isAuthenticated ? (
              <ul className="space-y-4">
                <li>
                  <Link 
                    to="/feed" 
                    className={cn(
                      "flex items-center py-2 text-base font-medium",
                      location.pathname === "/feed" ? "text-blue-600" : "text-gray-700"
                    )}
                  >
                    <Home size={20} className="mr-3" />
                    Home
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/books" 
                    className={cn(
                      "flex items-center py-2 text-base font-medium",
                      location.pathname === "/books" ? "text-blue-600" : "text-gray-700"
                    )}
                  >
                    <BookIcon size={20} className="mr-3" />
                    Books
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/cart" 
                    className={cn(
                      "flex items-center py-2 text-base font-medium",
                      location.pathname === "/cart" ? "text-blue-600" : "text-gray-700"
                    )}
                  >
                    <ShoppingBag size={20} className="mr-3" />
                    Cart
                    {cartItemsCount ? (
                      <span className="ml-2 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
                        {cartItemsCount}
                      </span>
                    ) : null}
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/profile" 
                    className={cn(
                      "flex items-center py-2 text-base font-medium",
                      location.pathname === "/profile" ? "text-blue-600" : "text-gray-700"
                    )}
                  >
                    <User size={20} className="mr-3" />
                    Profile
                  </Link>
                </li>
                <li className="pt-2 border-t">
                  <button
                    onClick={handleLogout}
                    className="flex items-center py-2 text-base font-medium text-gray-700"
                  >
                    Sign Out
                  </button>
                </li>
              </ul>
            ) : (
              <div className="space-y-4 pt-4">
                <Link 
                  to="/login" 
                  className="block w-full text-center py-2.5 font-medium text-gray-700 border border-gray-300 rounded-full hover:bg-gray-50"
                >
                  Sign in
                </Link>
                <Link 
                  to="/register" 
                  className="block w-full text-center py-2.5 font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700"
                >
                  Join now
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
