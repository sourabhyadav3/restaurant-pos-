import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import api from '../services/api';

const NotificationContext = createContext();

export const useNotifications = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchNotifications = useCallback(async () => {
    if (!user) return;
    try {
      const userRole = (user.role || user.role_name || '').toUpperCase();
      const response = await api.get('/notifications', {
        params: { userId: user.id, role: userRole }
      });
      setNotifications(response.data.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchNotifications();
      // Poll for new notifications every 30 seconds
      const interval = setInterval(fetchNotifications, 30000);
      return () => clearInterval(interval);
    }
  }, [user, fetchNotifications]);

  const addNotification = useCallback(async (notif) => {
    try {
      await api.post('/notifications', {
        user_id: notif.userId || user?.id,
        notification_type: notif.type || 'system',
        message: notif.message,
        targetRole: notif.targetRole?.toUpperCase() || 'ALL'
      });
      fetchNotifications();
    } catch (error) {
      console.error('Error adding notification:', error);
      // Fallback to local state if backend fails
      setNotifications(prev => [{
        id: Date.now(),
        timestamp: new Date().toISOString(),
        read: false,
        ...notif
      }, ...prev]);
    }
  }, [user, fetchNotifications]);

  const markAsRead = useCallback(async (id) => {
    try {
      await api.patch(`/notifications/${id}/read`);
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: 1, read: true } : n));
    } catch (error) {
      console.error('Error marking as read:', error);
    }
  }, []);

  const markAllAsRead = useCallback(async (role) => {
    try {
      const userRole = role || (user?.role || user?.role_name || '').toUpperCase();
      await api.post('/notifications/mark-all-read', { userId: user?.id, role: userRole });
      setNotifications(prev => prev.map(n => ({ ...n, is_read: 1, read: true })));
    } catch (error) {
      console.error('Error marking all as read:', error);
    }
  }, [user]);

  const deleteNotification = useCallback(async (id) => {
    try {
      await api.delete(`/notifications/${id}`);
      setNotifications(prev => prev.filter(n => n.id !== id));
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  }, []);

  const getUnreadCount = useCallback((role) => {
    return notifications.filter(n => !n.is_read && !n.read).length;
  }, [notifications]);

  return (
    <NotificationContext.Provider value={{
      notifications: notifications.map(n => ({
        ...n,
        title: n.notification_type?.toUpperCase() || 'SYSTEM ALERT',
        read: n.is_read === 1 || n.read === true,
        timestamp: n.createdAt || n.timestamp
      })),
      addNotification,
      markAsRead,
      markAllAsRead,
      getUnreadCount,
      deleteNotification,
      refreshNotifications: fetchNotifications
    }}>
      {children}
    </NotificationContext.Provider>
  );
};


