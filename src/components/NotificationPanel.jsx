import React from "react";
import { useNotifications } from "../context/NotificationContext";
import { X, CheckCheck, Trash2, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NotificationPanel = ({ isOpen, onClose }) => {
  const {
    notifications,
    markAsRead,
    markAllAsRead,
    clearNotification,
    clearAll,
  } = useNotifications();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const notifTime = new Date(timestamp);
    const diffMs = now - notifTime;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? "s" : ""} ago`;
    if (diffHours < 24)
      return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "success":
        return "✅";
      case "info":
        return "ℹ️";
      case "warning":
        return "⚠️";
      case "error":
        return "❌";
      default:
        return "🔔";
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/20 z-40" onClick={onClose} />

      {/* Panel */}
      <div className="fixed top-16 right-4 w-96 max-w-[calc(100vw-2rem)] bg-white rounded-xl shadow-2xl border border-gray-200 z-50 max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white rounded-t-xl">
          <h3 className="font-semibold text-gray-900 flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notifications
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Actions */}
        {notifications.length > 0 && (
          <div className="px-4 py-2 border-b border-gray-100 flex gap-2">
            <button
              onClick={markAllAsRead}
              className="text-xs text-primary hover:text-primary/80 flex items-center gap-1"
            >
              <CheckCheck className="w-3 h-3" />
              Mark all as read
            </button>
            <span className="text-gray-300">|</span>
            <button
              onClick={clearAll}
              className="text-xs text-gray-600 hover:text-gray-900 flex items-center gap-1"
            >
              <Trash2 className="w-3 h-3" />
              Clear all
            </button>
          </div>
        )}

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="text-6xl mb-3">🔔</div>
              <p className="text-gray-500 text-sm">No notifications yet</p>
              <p className="text-gray-400 text-xs mt-1">
                You'll see updates here when you have new activity
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                    !notification.read ? "bg-primary/5" : ""
                  }`}
                  onClick={() => {
                    markAsRead(notification.id);
                    if (notification.action?.path) {
                      navigate(notification.action.path);
                      onClose();
                    }
                  }}
                >
                  <div className="flex gap-3">
                    <div className="text-2xl flex-shrink-0">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className="font-semibold text-sm text-gray-900">
                          {notification.title}
                        </h4>
                        {!notification.read && (
                          <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-1" />
                        )}
                      </div>
                      <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                        {notification.message}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400">
                          {formatTimestamp(notification.timestamp)}
                        </span>
                        {notification.action && (
                          <span className="text-xs text-primary font-medium">
                            {notification.action.label} →
                          </span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        clearNotification(notification.id);
                      }}
                      className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
                    >
                      <X className="w-4 h-4" />
                    </button>
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

export default NotificationPanel;
