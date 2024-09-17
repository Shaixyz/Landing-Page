import React, { useState } from "react";
import Logo from "~/assets/logo.png";
import { IoMdSearch } from "react-icons/io";
import { FaCartShopping } from "react-icons/fa6";
import { FaCaretDown, FaBell } from "react-icons/fa";
import DarkMode from "~/components/Layout/components/Header/DarkMode";
import useAuth from "~/context/auth/useAuth";
import R from "~/assets/R.png";
import { Link, useNavigate } from "react-router-dom";
import Notifications from "~/Notification/Notification";

const HeaderSeller = () => {
  const [open, setOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

  const showProfile = () => {
    setOpen(!open);
  };

  const handleNewNotification = (newCount, newNotifications) => {
    setNotificationCount(newCount);
    setNotifications(newNotifications);
  };

  const handleSearch = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      if (searchQuery) {
        navigate(`/search?q=${searchQuery}`);
      }
    }
  };

  return (
    <div className="shadow-md bg-white dark:bg-gray-900 dark:text-white duration-200 relative z-40">
      {/* Upper Navbar */}
      <div className="bg-primary/40 py-2">
        <div className="container flex justify-between items-center">
          <div>
            <Link to="/" className="font-bold text-2xl sm:text-3xl flex gap-2">
              <img src={Logo} alt="Logo" className="w-10" />
              Tech Gadget Seller
            </Link>
          </div>

          {/* Search bar */}
          <div className="flex items-center gap-4">
            <div className="relative group hidden sm:block">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
                placeholder="Search products"
                className="w-[200px] sm:w-[300px] transition-all duration-300 rounded-full border border-gray-300 px-2 py-1 focus:outline-none focus:border-primary dark:border-gray-500 dark:bg-gray-800"
              />
              <IoMdSearch
                className="text-gray-500 absolute top-1/2 -translate-y-1/2 right-3 cursor-pointer"
                onClick={handleSearch}
              />
            </div>

            {/* Notifications */}
            <div className="relative">
              <Notifications onNewNotification={handleNewNotification} />
              {notificationCount > 0 && (
                <FaBell className="text-xl text-red-500" />
              )}
            </div>

            {/* Seller Dashboard Links */}
            {user ? (
              <div className="relative">
                <div
                  className="flex items-center gap-[15px] cursor-pointer"
                  onClick={showProfile}
                >
                  <div className="h-[30px] w-[30px] rounded-full flex items-center justify-center">
                    <img
                      src={R}
                      alt="Profile Icon"
                      className="h-full w-full rounded-full object-cover"
                    />
                  </div>
                  <FaCaretDown className="text-xl" />
                </div>

                {open && (
                  <div className="absolute right-1/2 transform translate-x-1/2 mt-2 w-52 rounded-lg bg-white dark:bg-gray-800 border dark:border-gray-700 shadow-lg z-50">
                    <div className="py-2">
                      <Link
                        to="/seller/dashboard"
                        className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 p-3 rounded-lg text-gray-800 dark:text-gray-200 font-semibold w-full"
                      >
                        Dashboard
                      </Link>
                      <Link
                        to="/seller/products"
                        className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 p-3 rounded-lg text-gray-800 dark:text-gray-200 font-semibold w-full"
                      >
                        Manage Products
                      </Link>
                      <Link
                        to="/seller/orders"
                        className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 p-3 rounded-lg text-gray-800 dark:text-gray-200 font-semibold w-full"
                      >
                        View Orders
                      </Link>
                      <p
                        className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 p-3 rounded-lg text-red-600 dark:text-red-400 font-semibold w-full"
                        onClick={handleLogout}
                      >
                        Log out
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden text-white lg:flex justify-center space-x-6 items-center">
                <Link
                  to="/signin"
                  className="py-2 px-3 rounded-md border-2 text-black/80 dark:text-light border-black"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-primary to-secondary py-2 px-3 rounded-md text-white"
                >
                  Create an account
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderSeller;
