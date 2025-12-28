import React, { createContext, useContext, useState, useEffect } from "react";

const NotificationContext = createContext();

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotifications must be used within NotificationProvider"
    );
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem("flips_notifications");
    return saved ? JSON.parse(saved) : [];
  });

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem("flips_notifications", JSON.stringify(notifications));
  }, [notifications]);

  // Add new notification
  const addNotification = (notification) => {
    const newNotification = {
      id: `notif-${Date.now()}`,
      timestamp: new Date().toISOString(),
      read: false,
      ...notification,
    };

    setNotifications((prev) => [newNotification, ...prev]);
    return newNotification;
  };

  // Mark notification as read
  const markAsRead = (notificationId) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  };

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })));
  };

  // Clear notification
  const clearNotification = (notificationId) => {
    setNotifications((prev) =>
      prev.filter((notif) => notif.id !== notificationId)
    );
  };

  // Clear all notifications
  const clearAll = () => {
    setNotifications([]);
  };

  // Get unread count
  const unreadCount = notifications.filter((n) => !n.read).length;

  const value = {
    notifications,
    addNotification,
    markAsRead,
    markAllAsRead,
    clearNotification,
    clearAll,
    unreadCount,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};
