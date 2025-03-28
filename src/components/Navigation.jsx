/* eslint-disable no-unused-vars */
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Header";
import Invoice from "./Invoice";

export default function Navigation() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header />} />
          <Route path="/invoice" element={<Invoice/>} />  
        </Routes>
      </BrowserRouter>
    </div>
  );
}
