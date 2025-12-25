import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Wallet,
  User,
  Shield,
  Settings,
  Menu,
  LogOut,
  Gift,
} from "lucide-react";
import FlipsBrand from "../ui/FlipsBrand";

const Sidebar = ({ isOpen, onClose }) => {
  const navItems = [
    { icon: User, label: "Profile", path: "/" },
    { icon: Wallet, label: "Wallet/Bank", path: "/wallet" },
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: Gift, label: "Vouchers", path: "/vouchers" },
    { icon: Shield, label: "Security", path: "/security" },
    { icon: Settings, label: "System", path: "/system" },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
                fixed left-0 top-0 h-screen w-64 bg-gray-50 border-r border-gray-200 z-50 flex flex-col transition-transform duration-300 ease-in-out
                ${isOpen ? "translate-x-0" : "-translate-x-full"}
                md:translate-x-0
            `}
      >
        <div className="p-6 flex items-center justify-center border-b border-gray-100 bg-white/50 backdrop-blur-sm">
          <FlipsBrand />
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => onClose()} // Close on navigation on mobile
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "text-blue-600 bg-blue-50 font-medium"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button
            onClick={() => (window.location.href = "/login")}
            className="flex items-center gap-3 px-4 py-3 mb-4 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors w-full text-left"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Sign Out</span>
          </button>
          <p className="text-xs text-gray-400">
            © 2024 FinTech Pro. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
