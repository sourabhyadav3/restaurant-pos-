import React, { createContext, useContext, useState, useEffect } from 'react';

const NotificationContext = createContext();

export const useNotifications = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState(() => {
    try {
      const saved = localStorage.getItem('resto-notifications');
      if (!saved) return [
        {
          id: 1,
          type: 'Reservation',
          title: 'VIP Reservation',
          message: 'Alexander Wright requested ROYAL SUITE for May 10.',
          targetRole: 'ADMIN',
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          read: false
        },
        {
          id: 2,
          type: 'Message',
          title: 'Priority Request',
          message: 'Elena Gilbert: "Need late checkout for Room 102."',
          targetRole: 'MANAGER',
          timestamp: new Date(Date.now() - 7200000).toISOString(),
          read: true
        },
        {
          id: 3,
          type: 'Inventory',
          title: 'Stock Alert',
          message: 'Seafood Grill is running low in stock (Kitchen).',
          targetRole: 'CHEF',
          timestamp: new Date(Date.now() - 10000000).toISOString(),
          read: false
        },
        {
          id: 4,
          type: 'System',
          title: 'Payroll Processed',
          message: 'Monthly payroll for staff has been finalized.',
          targetRole: 'ADMIN',
          timestamp: new Date(Date.now() - 86400000).toISOString(),
          read: true
        },
        {
          id: 5,
          type: 'Service',
          title: 'New Service Booking',
          message: 'Sarah Jenkins booked a "Sunset Cruise" for tomorrow.',
          targetRole: 'WAITER',
          timestamp: new Date(Date.now() - 1800000).toISOString(),
          read: false
        }
      ];
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      console.error("Error parsing notifications:", e);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('resto-notifications', JSON.stringify(notifications));
  }, [notifications]);

  const addNotification = (notif) => {
    const newNotif = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      read: false,
      ...notif,
      targetRole: notif.targetRole?.toUpperCase() || 'ALL'
    };
    setNotifications(prev => [newNotif, ...prev].slice(0, 50));
  };

  const markAsRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = (role) => {
    const roleUpper = role?.toUpperCase();
    setNotifications(prev => prev.map(n => (n.targetRole === roleUpper || n.targetRole === 'ALL') ? { ...n, read: true } : n));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getUnreadCount = (role) => {
    const roleUpper = role?.toUpperCase();
    return notifications.filter(n => !n.read && (n.targetRole === roleUpper || n.targetRole === 'ALL')).length;
  };

  return (
    <NotificationContext.Provider value={{
      notifications,
      addNotification,
      markAsRead,
      markAllAsRead,
      clearNotifications,
      getUnreadCount,
      deleteNotification
    }}>
      {children}
    </NotificationContext.Provider>
  );
};


