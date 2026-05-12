import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNotifications } from './NotificationContext';
import { useAuth } from './AuthContext';
import api from '../services/api';

const CommunicationContext = createContext();

export const useCommunication = () => useContext(CommunicationContext);

export const CommunicationProvider = ({ children }) => {
  const { addNotification } = useNotifications();
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [activeChats, setActiveChats] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchActiveChats = useCallback(async () => {
    if (!user) return;
    try {
      const response = await api.get('/concierge/tickets');
      if (response.data.success) {
        const chats = response.data.data.map(ticket => ({
          guestId: ticket.guest_id,
          ticketId: ticket.id,
          guestName: ticket.guest_name,
          lastMessage: ticket.last_message || 'New request',
          lastTimestamp: ticket.updatedAt,
          unreadCount: 0, // In a real app, track this in DB
          status: ticket.ticket_status
        }));
        setActiveChats(chats);
      }
    } catch (error) {
      console.error('Error fetching concierge chats:', error);
    }
  }, [user]);

  const fetchMessages = useCallback(async (ticketId) => {
    try {
      const response = await api.get(`/concierge/tickets/${ticketId}/messages`);
      if (response.data.success) {
        const formattedMessages = response.data.data.map(msg => ({
          id: msg.id,
          guestId: msg.guest_id, // Might need to adjust based on DB schema
          ticketId: msg.ticket_id,
          content: msg.message,
          sender: msg.sender_id === user?.id ? 'Staff' : 'Guest',
          timestamp: msg.createdAt
        }));
        setMessages(prev => {
          // Merge and avoid duplicates
          const otherMessages = prev.filter(m => m.ticketId !== ticketId);
          return [...otherMessages, ...formattedMessages];
        });
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  }, [user]);

  useEffect(() => {
    if (user && (user.role === 'WAITER' || user.role === 'ADMIN' || user.role === 'MANAGER')) {
      fetchActiveChats();
      const interval = setInterval(fetchActiveChats, 15000); // Poll for new tickets
      return () => clearInterval(interval);
    }
  }, [user, fetchActiveChats]);

  const sendMessage = async (ticketId, guestName, content, sender = 'Staff') => {
    try {
      const response = await api.post('/concierge/messages', {
        ticket_id: ticketId,
        message: content
      });

      if (response.data.success) {
        const newMessage = {
          id: response.data.data.id,
          ticketId,
          content,
          sender,
          timestamp: new Date().toISOString()
        };
        setMessages(prev => [...prev, newMessage]);
        
        // Update local chat summary
        setActiveChats(prev => prev.map(chat => 
          chat.ticketId === ticketId 
          ? { ...chat, lastMessage: content, lastTimestamp: newMessage.timestamp } 
          : chat
        ));
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const markAsRead = (ticketId) => {
    setActiveChats(prev => prev.map(c => 
      c.ticketId === ticketId ? { ...c, unreadCount: 0 } : c
    ));
  };

  return (
    <CommunicationContext.Provider value={{
      messages,
      activeChats,
      sendMessage,
      markAsRead,
      fetchMessages,
      loading
    }}>
      {children}
    </CommunicationContext.Provider>
  );
};
