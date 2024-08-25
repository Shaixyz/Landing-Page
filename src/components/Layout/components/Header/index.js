import { Menu, X } from "lucide-react";
import React, { useState } from 'react';
import logo from "~/assets/logo.png";
import { navItems } from "~/constants/index";
import { Link } from "react-router-dom";
import useAuth from "~/context/auth/useAuth";

const Header = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const { user, logout } = useAuth(); // Properly use the hook

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="sticky top-0 z-50 py-3 bg-black bg-opacity-50 backdrop-blur-lg border-b border-neutral-700/80">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center max-w-screen-xl mx-auto">
          <Link to="/" className="flex items-center flex-shrink-0">
            <img className="h-10 w-10 mr-2" src={logo} alt="Logo" />
            <span className="text-xl text-white tracking-tight">Shai</span>
          </Link>

          {user?.role === "Admin" && (
            <ul className="hidden text-white lg:flex ml-14 space-x-12">
              {navItems.map((item, index) => (
                <li key={index}>
                  <Link to={item.href}>{item.label}</Link> {/* Corrected to Link */}
                </li>
              ))}
            </ul>
          )}

          <div className="hidden text-white lg:flex justify-center space-x-12 items-center">
            {user ? (
              <>
                <span>Welcome, {user.name}</span>
                <button
                  onClick={handleLogout}
                  className="py-2 px-3 border rounded-md"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/signin" className="py-2 px-3 border rounded-md">
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-orange-500 to-orange-800 py-2 px-3 rounded-md"
                >
                  Create an account
                </Link>
              </>
            )}
          </div>

          <div className="lg:hidden text-white md:flex flex-col justify-end">
            <button onClick={toggleNavbar}>
              {mobileDrawerOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {mobileDrawerOpen && (
          <div className="fixed right-0 z-20 bg-neutral-900 w-full p-12 text-white flex flex-col justify-center items-center lg:hidden">
            {user?.role === "Admin" && (
              <ul>
                {navItems.map((item, index) => (
                  <li key={index} className="py-4">
                    <Link to={item.href} onClick={toggleNavbar}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}

            <div className="flex space-x-6">
              {user ? (
                <button onClick={handleLogout} className="py-2 px-3 border rounded-md">
                  Logout
                </button>
              ) : (
                <>
                  <Link to="/signin" className="py-2 px-3 border rounded-md">
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="py-2 px-3 rounded-md bg-gradient-to-r from-orange-500 to-orange-800"
                  >
                    Create an account
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
