import React, { createContext, useContext, useState, useEffect } from 'react';

const CustomerContext = createContext();

export const useCustomer = () => useContext(CustomerContext);

export const CustomerProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('resto-customer-cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('resto-customer-favorites');
    return saved ? JSON.parse(saved) : [1, 3]; // Mock initial favorites
  });

  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('resto-customer-profile');
    return saved ? JSON.parse(saved) : {
      name: 'Guest User',
      phone: '+91 98765 43210',
      email: 'guest@example.com',
      tableId: '05',
      diningType: 'Dine-in'
    };
  });

  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [supportRequests, setSupportRequests] = useState(() => {
    const saved = localStorage.getItem('resto-customer-support');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('resto-customer-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('resto-customer-favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('resto-customer-profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('resto-customer-support', JSON.stringify(supportRequests));
  }, [supportRequests]);

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
    setAppliedCoupon(null);
  };

  const toggleFavorite = (itemId) => {
    setFavorites(prev => prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId]);
  };

  const updateProfile = (data) => {
    setProfile(prev => ({ ...prev, ...data }));
  };

  const createSupportRequest = (type, message = '') => {
    const newReq = {
      id: Date.now(),
      type,
      message,
      status: 'Open',
      createdAt: new Date().toISOString(),
      tableId: profile.tableId
    };
    setSupportRequests(prev => [newReq, ...prev]);
    return newReq;
  };

  return (
    <CustomerContext.Provider value={{ 
      cartItems, addToCart, removeFromCart, updateCartQuantity, clearCart,
      favorites, toggleFavorite,
      profile, updateProfile,
      appliedCoupon, setAppliedCoupon,
      supportRequests, createSupportRequest
    }}>
      {children}
    </CustomerContext.Provider>
  );
};
