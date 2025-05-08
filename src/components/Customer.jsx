import React, { useContext, useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { motion } from 'framer-motion';
import { MainContext } from './Invoice';

export default function Customer() {
  const {
    customerName,
    setCustomerName,
    invoiceDate,
    setInvoiceDate,
    dueDate,
    setDueDate,
    invoiceNumber,
    setInvoiceNumber,
    customerEmail,
    setCustomerEmail,
    customerPhone,
    setCustomerPhone,
    customerAddress,
    setCustomerAddress,
    customerGstin,
    setCustomerGstin,
    customerPlaceOfSupply,
    setCustomerPlaceOfSupply,
  } = useContext(MainContext);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      variants={containerVariants}
      className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg"
    >
      {/* Left Section - Customer Details */}
      <div className="col-span-1 lg:col-span-8 space-y-6">
        <motion.h1
          variants={itemVariants}
          className="text-2xl font-bold text-gray-800 border-b-2 border-indigo-200 pb-2"
        >
          Customer Details
        </motion.h1>

        {/* Invoice Number and Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Invoice No.
            </label>
            <div>
              <input
                type="text"
                placeholder="INV-001"
                required
                onChange={(e) => setInvoiceNumber(e.target.value)}
                value={invoiceNumber}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Invoice Date
            </label>
            <DatePicker
              selected={invoiceDate}
              onChange={(date) => setInvoiceDate(date)}
              dateFormat="dd/MM/yyyy"
              className="border border-gray-300 p-2 rounded w-full md:w-auto"
            />
          </div>
          {/* <div className="...">
            <div className="flex flex-col md:flex-row md:items-center">
              <label className="font-light mb-2 mt-1 md:mr-2 w-33 lg:mt-5">
                Invoice Date
              </label>
              <DatePicker
                selected={invoiceDate}
                onChange={(date) => setInvoiceDate(date)}
                dateFormat="dd/MM/yyyy"
                className="border border-gray-300 p-2 rounded w-full md:w-auto"
              />
            </div>
          </div> */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Customer Name
            </label>
            <div>
              <input
                type="text"
                placeholder="Customer Name"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <div>
              <input
                type="email"
                placeholder="Customer Email"
                required
                value={customerEmail}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                onChange={(e) => setCustomerEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <div>
              <input
                type="tel"
                placeholder="+91 XXXXXXXXXX"
                required
                value={customerPhone}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                onChange={(e) => setCustomerPhone(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Billing Address
            </label>
            <div>
              <textarea
                placeholder="Customer Address"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 min-h-[80px]"
                value={customerAddress}
                onChange={(e) => setCustomerAddress(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              GSTIN
            </label>
            <div>
              <input
                type="text"
                placeholder="22AAAAA0000A1Z5"
                required
                value={customerGstin}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                onChange={(e) => setCustomerGstin(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Place of Supply
            </label>
            <div>
              <input
                placeholder="Place of Supply"
                required
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                value={customerPlaceOfSupply}
                onChange={(e) => setCustomerPlaceOfSupply(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Company Details */}
      <motion.div
        variants={itemVariants}
        className="col-span-1 lg:col-span-4 p-6 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl shadow-inner border border-indigo-100"
      >
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 1.5 }}
          className="space-y-4"
        >
          <h1 className="text-xl font-bold text-indigo-800 mb-2 border-b border-indigo-200 pb-2">
            R S HARDWARE GLASS & ELECTRICALS
          </h1>

          <div className="space-y-3 text-gray-700">
            <p className="flex items-start">
              <svg
                className="w-5 h-5 text-indigo-500 mr-2 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span className="font-medium">GSTIN:</span> 29FKLPP1223G1ZO
            </p>

            <p className="flex items-start">
              <svg
                className="w-5 h-5 text-indigo-500 mr-2 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Building No- 3/7, Shop No-6, Ground Floor
              <br />
              Gowri Shankar Complex Arekere Main Road
              <br />
              Bengaluru Karnataka, India
              <br />
              PIN: 560076
            </p>

            <p className="flex items-center">
              <svg
                className="w-5 h-5 text-indigo-500 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <span>+91 8147465517</span>
            </p>

            <p className="flex items-center">
              <svg
                className="w-5 h-5 text-indigo-500 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span>abdulfahad1436@gmail.com</span>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
