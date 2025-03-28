/* eslint-disable no-unused-vars */
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Header";
import Invoice from "./Invoice";
import Dashboard from './Dashboard';
import Login from './Login';
import Error from './Error';

export default function Navigation() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" index element={<Dashboard />} />
          <Route path="/invoice" element={<Invoice />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
