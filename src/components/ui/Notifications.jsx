import React, { useState } from "react";
import { Check, AlertTriangle, DollarSign, X } from "lucide-react";
import { notifications } from "../../data/mockData";

const Notifications = ({ onClose }) => {
  const [filter, setFilter] = useState("All"); // 'All', 'Unread', 'Read'

  const filteredNotifications = notifications.filter((n) => {
    if (filter === "All") return true;
    if (filter === "Unread") return !n.read;
    if (filter === "Read") return n.read;
    return true;
  });

  const getIcon = (type) => {
    switch (type) {
      case "success":
        return (
          <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
            <Check className="w-5 h-5 text-green-600" />
          </div>
        );
      case "warning":
        return (
          <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-orange-600" />
          </div>
        );
      case "info":
        return (
          <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
            <DollarSign className="w-5 h-5 text-blue-600" />
          </div>
        );
      default:
        return (
          <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
            <Check className="w-5 h-5 text-gray-600" />
          </div>
        );
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 z-40 md:hidden"
        onClick={onClose}
      />

      {/* Notifications Panel */}
      <div className="fixed inset-x-0 top-14 mx-2 md:mx-0 md:absolute md:top-12 md:right-0 md:left-auto md:w-96 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50 max-h-[calc(100vh-80px)] md:max-h-[500px] flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-100 flex justify-between items-center flex-shrink-0">
          <h3 className="text-gray-900 font-bold text-lg">Notifications</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors md:hidden"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Filter */}
        <div className="flex items-center bg-gray-50 p-1 gap-1 m-2 rounded-lg flex-shrink-0">
          {["All", "Unread", "Read"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-colors ${
                filter === f
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="px-4 pb-2 text-right flex-shrink-0">
          <button className="text-xs text-primary font-medium hover:text-blue-700">
            Mark all as read
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto">
          {filteredNotifications.length === 0 ? (
            <div className="p-8 text-center text-gray-500 text-sm">
              No notifications found
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filteredNotifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`p-4 hover:bg-gray-50 transition-colors ${
                    !notif.read ? "bg-blue-50/30" : ""
                  }`}
                >
                  <div className="flex gap-3 md:gap-4">
                    <div className="flex-shrink-0 pt-1">
                      {getIcon(notif.type)}
                    </div>
                    <div className="flex-1 space-y-1 min-w-0">
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="text-gray-900 font-bold text-sm truncate">
                          {notif.title}
                        </h4>
                        <span className="text-xs text-gray-400 whitespace-nowrap flex-shrink-0">
                          {notif.time}
                        </span>
                      </div>
                      <p className="text-gray-600 text-xs leading-relaxed line-clamp-2">
                        {notif.description}
                      </p>

                      <div className="flex gap-2 pt-2">
                        <button className="px-3 py-1 bg-yellow-100 hover:bg-yellow-200 text-yellow-700 text-xs font-bold rounded shadow-sm transition-colors border border-yellow-200">
                          View details
                        </button>
                        <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs font-medium rounded transition-colors">
                          Dismiss
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Notifications;
