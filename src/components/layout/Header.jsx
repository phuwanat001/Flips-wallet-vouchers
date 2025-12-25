import React, { useState } from "react";
import { Bell, Search, Menu, X, User } from "lucide-react";
import { useLocation } from "react-router-dom";
import { userProfile } from "../../data/mockData";
import Notifications from "../ui/Notifications";

const Header = ({ onMenuClick }) => {
  const location = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const getPageTitle = () => {
    switch (location.pathname) {
      case "/":
        return "Profile";
      case "/profile/edit":
        return "Edit Profile";
      case "/wallet":
        return "Wallet & Bank";
      case "/dashboard":
        return "Dashboard";
      case "/vouchers":
        return "Vouchers";
      case "/security":
        return "Security";
      case "/system":
        return "Settings";
      case "/investments/report":
        return "Investment Report";
      case "/investments/portfolio":
        return "Portfolio";
      default:
        return "Flips";
    }
  };

  return (
    <>
      <header className="h-14 md:h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-6 sticky top-0 z-30 md:ml-64">
        {/* Left Side - Menu & Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 -ml-2 text-gray-600 hover:text-primary hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="text-lg md:text-xl font-bold text-gray-900 truncate max-w-[150px] md:max-w-none">
            {getPageTitle()}
          </h1>
        </div>

        {/* Right Side - Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Mobile Search Toggle */}
          <button
            onClick={() => setShowMobileSearch(!showMobileSearch)}
            className="md:hidden p-2 text-gray-400 hover:text-primary hover:bg-gray-100 rounded-lg transition-colors"
          >
            {showMobileSearch ? (
              <X className="w-5 h-5" />
            ) : (
              <Search className="w-5 h-5" />
            )}
          </button>

          {/* Desktop Search */}
          <div className="hidden md:block relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-40 lg:w-56 transition-all"
            />
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 text-gray-400 hover:text-primary hover:bg-gray-100 rounded-lg transition-colors relative"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            {showNotifications && (
              <Notifications onClose={() => setShowNotifications(false)} />
            )}
          </div>

          {/* User Avatar - Mobile Only */}
          <div className="md:hidden">
            <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-primary/20">
              <img
                src={userProfile.avatar}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Search Bar - Expandable */}
      {showMobileSearch && (
        <div className="md:hidden bg-white border-b border-gray-200 p-3 sticky top-14 z-20">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              autoFocus
              className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
