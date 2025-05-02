/* eslint-disable no-unused-vars */
import React, { createContext, useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Header from './Header';
import Invoice from './Invoice';
import Dashboard from './Dashboard';

import Error from './Error';
import AuthProvider, { useAuth } from './Auth/AuthProvider';
import Login from './Auth/Login';
import Landing from './Landing';

function ProtectedRoute({ element }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? element : <Navigate to="/login" />;
}

function HomeRoute() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/dashboard" /> : <Landing />;
}

export default function Navigation() {
  // const { isAuthenticated } = useAuth();

  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<HomeRoute />} />
            <Route
              path="/dashboard"
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
