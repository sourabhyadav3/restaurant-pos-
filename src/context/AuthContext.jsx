import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const roles = {
  ADMIN: 'ADMIN',
  MANAGER: 'MANAGER',
  WAITER: 'WAITER',
  CHEF: 'CHEF',
  CASHIER: 'CASHIER',
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: 'Admin User',
    role: roles.ADMIN, // Default to ADMIN for development
  });

  const logout = () => setUser(null);
  const login = (role) => setUser({ name: `${role} User`, role });

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
