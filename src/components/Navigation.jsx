/* eslint-disable no-unused-vars */
import React, { createContext, useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Header from './Header';
import Invoice from './Invoice';
// import Dashboard from './Dashboard';

import Error from './Error';
import AuthProvider, { useAuth } from './Auth/AuthProvider';
import Login from './Auth/Login';
import Landing from './Landing';
import AboutPage from './about/AboutPage';
import Root from './Root';
import Dashboard from './dashboard/Dashboard';
import InvoiceDetails from './PDF/InvoiceDetails';

function ProtectedRoute({ element }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? element : <Navigate to="/login" />;
}

function HomeRoute() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/home" /> : <Landing />;
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
              path="/home"
              element={<ProtectedRoute element={<Root />} />}
            />
            <Route
              path="/dashboard"
              element={<ProtectedRoute element={<Dashboard />} />}
            />
            <Route
              path="/dashboard/:invoiceId"
              element={<ProtectedRoute element={<InvoiceDetails />} />}
            />
            <Route
              path="/invoice"
              element={<ProtectedRoute element={<Invoice />} />}
            />
            <Route
              path="/about"
              element={<ProtectedRoute element={<AboutPage />} />}
            />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}
