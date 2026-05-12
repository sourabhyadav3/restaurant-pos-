import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '@/utils/api';
import { useAuth } from './AuthContext';

const CustomerContext = createContext();

export const useCustomer = () => useContext(CustomerContext);

export const CustomerProvider = ({ children }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('resto-customer-cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [favorites, setFavorites] = useState([]);
  const [profile, setProfile] = useState(user || null);
  const [supportRequests, setSupportRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setProfile(user);
      fetchCustomerData();
    }
  }, [user]);

  const fetchCustomerData = async () => {
    setLoading(true);
    try {
      const favsRes = await api.get('/customer/favorites').catch(() => ({ data: { data: [] } }));
      const supportRes = await api.get('/concierge/tickets').catch(() => ({ data: { data: [] } }));
      
      setFavorites(favsRes.data.data.map(f => f.item_id));
      setSupportRequests(supportRes.data.data);
    } catch (error) {
      console.error('Error fetching customer data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    localStorage.setItem('resto-customer-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item, size, quantity, notes) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.itemId === item.id && i.size === size.name && i.notes === notes);
      if (existing) {
        return prev.map(i => i === existing ? { ...i, quantity: i.quantity + quantity } : i);
      }
      return [...prev, {
        id: Date.now(),
        itemId: item.id,
        name: item.name,
        image: item.image,
        size: size.name,
        price: size.price,
        quantity,
        notes
      }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(i => i.id !== id));
  };

  const updateCartQuantity = (id, delta) => {
    setCartItems(prev => prev.map(i => {
      if (i.id === id) {
        const newQty = Math.max(0, i.quantity + delta);
        return { ...i, quantity: newQty };
      }
      return i;
    }).filter(i => i.quantity > 0));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const toggleFavorite = async (itemId) => {
    try {
      if (favorites.includes(itemId)) {
        await api.delete(`/customer/favorites/${itemId}`);
        setFavorites(prev => prev.filter(id => id !== itemId));
      } else {
        await api.post('/customer/favorites', { item_id: itemId });
        setFavorites(prev => [...prev, itemId]);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const createSupportRequest = async (details) => {
    try {
      const response = await api.post('/concierge/tickets', details);
      const newReq = response.data.data;
      setSupportRequests(prev => [newReq, ...prev]);
      return newReq;
    } catch (error) {
      console.error('Error creating support request:', error);
      throw error;
    }
  };

  return (
    <CustomerContext.Provider value={{ 
      cartItems, addToCart, removeFromCart, updateCartQuantity, clearCart,
      favorites, toggleFavorite,
      profile,
      supportRequests, createSupportRequest,
      loading
    }}>
      {children}
    </CustomerContext.Provider>
  );
};
