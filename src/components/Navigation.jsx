/* eslint-disable no-unused-vars */
import React, { createContext } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Header from './Header';
import Invoice from './Invoice';
import Dashboard from './Dashboard';

import Error from './Error';
import AuthProvider, { useAuth } from './Auth/AuthProvider';
import Login from './Auth/Login';

function ProtectedRoute({ element }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? element : <Navigate to="/login" />;
}

export default function Navigation() {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route
              path="/"
              index
              element={<ProtectedRoute element={<Dashboard />} />}
            />
            <Route
              path="/invoice"
              element={<ProtectedRoute element={<Invoice />} />}
            />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}
