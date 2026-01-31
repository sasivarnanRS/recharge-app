import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Smartphone, LogOut, User as UserIcon, Shield } from 'lucide-react';

const Navbar = () => {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="glass-effect shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <Smartphone className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl text-gray-900">RechargeNow</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/" className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
              About
            </Link>
            <Link to="/plans" className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
              Plans
            </Link>
            {isAuthenticated ? (
              <>
                <Link to="/history" className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
                  History
                </Link>
                {isAdmin && (
                  <Link to="/admin" className="flex items-center gap-1 text-purple-600 hover:text-purple-700 px-3 py-2 rounded-md text-sm font-medium">
                    <Shield className="w-4 h-4" /> Admin
                  </Link>
                )}
                <div className="flex items-center gap-2 border-l pl-4 ml-2">
                  <span className="text-sm font-semibold text-gray-700 hidden sm:block">{user?.name}</span>
                  <button
                    onClick={handleLogout}
                    className="p-2 rounded-full text-gray-500 hover:bg-gray-100 transition-colors"
                    title="Logout"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-primary text-white hover:bg-secondary px-4 py-2 rounded-full text-sm font-medium transition-colors shadow-md"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;