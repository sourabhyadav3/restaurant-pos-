import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth, roles } from './context/AuthContext';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import Tables from './pages/Tables';
import POS from './pages/POS';
import Orders from './pages/Orders';
import Kitchen from './pages/Kitchen';
import Menu from './pages/Menu';
import Staff from './pages/Staff';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Login from './pages/Login';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();
  
  if (!user) return <Navigate to="/login" />;
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Show Access Denied or redirect according to RBAC.md
    return <Navigate to="/" />; 
  }
  
  return <MainLayout>{children}</MainLayout>;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route path="/" element={
            <ProtectedRoute allowedRoles={[roles.ADMIN, roles.MANAGER]}>
              <Dashboard />
            </ProtectedRoute>
          } />
          
          <Route path="/tables" element={
            <ProtectedRoute allowedRoles={[roles.ADMIN, roles.MANAGER, roles.WAITER]}>
              <Tables />
            </ProtectedRoute>
          } />
          
          <Route path="/pos" element={
            <ProtectedRoute allowedRoles={[roles.ADMIN, roles.MANAGER, roles.WAITER, roles.CASHIER]}>
              <POS />
            </ProtectedRoute>
          } />
          
          <Route path="/orders" element={
            <ProtectedRoute allowedRoles={[roles.ADMIN, roles.MANAGER, roles.WAITER, roles.CHEF, roles.CASHIER]}>
              <Orders />
            </ProtectedRoute>
          } />
          
          <Route path="/kitchen" element={
            <ProtectedRoute allowedRoles={[roles.ADMIN, roles.MANAGER, roles.CHEF]}>
              <Kitchen />
            </ProtectedRoute>
          } />
          
          <Route path="/menu" element={
            <ProtectedRoute allowedRoles={[roles.ADMIN, roles.MANAGER]}>
              <Menu />
            </ProtectedRoute>
          } />
          
          <Route path="/staff" element={
            <ProtectedRoute allowedRoles={[roles.ADMIN]}>
              <Staff />
            </ProtectedRoute>
          } />
          
          <Route path="/reports" element={
            <ProtectedRoute allowedRoles={[roles.ADMIN, roles.MANAGER]}>
              <Reports />
            </ProtectedRoute>
          } />
          
          <Route path="/settings" element={
            <ProtectedRoute allowedRoles={[roles.ADMIN]}>
              <Settings />
            </ProtectedRoute>
          } />
          
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
