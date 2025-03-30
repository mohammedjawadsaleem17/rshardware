import React, { useContext } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { MainContext } from './Invoice';

export default function Customer() {
  const {
    customerName,
    setCustomerName,
    invoiceDate,
    setInvoiceDate,
    dueDate,
    setDueDate,
    lineItems,
    setLineItems,
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 px-4 pl-0">
      {/* Left Section - Customer Details (9 columns) */}
      <div className="col-span-1 md:col-span-8">
        <h1 className="text-xl font-bold mb-8 underline">Customer Details</h1>

        {/* Invoice Number and Invoice Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="flex items-center">
            <label className="font-light w-44">Invoice No.</label>
            <input
              type="number"
              placeholder="Invoice"
              required
              onChange={(e) => setInvoiceNumber(e.target.value)}
              value={invoiceNumber}
              className="border border-gray-300 p-2 rounded w-full"
            />
          </div>

          <div className="flex items-center">
            <label className="font-light w-28 sm:w-28 lg:w-31">
              Invoice Date:
            </label>
            <DatePicker
              selected={invoiceDate}
              onChange={(date) => setInvoiceDate(date)}
              dateFormat="dd/MM/yyyy"
              className="border border-gray-300 p-2 lg:ml-2 sm:m-4 rounded w-full  sm:w-48 lg:w-64"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
          <div className="flex items-center">
            <label className="font-light w-44">Name:</label>
            <input
              type="text"
              placeholder="Name"
              required
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="border border-gray-300 p-2 rounded w-full"
            />
          </div>

          <div className="flex items-center">
            <label className="font-light w-44">Email:</label>
            <input
              type="email"
              placeholder="Email"
              required
              value={customerEmail}
              className="border border-gray-300 p-2 rounded w-full"
              onChange={(e) => setCustomerEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="flex items-center">
            <label className="font-light w-44">Phone Number:</label>
            <input
              type="number"
              placeholder="Phone Number"
              required
              value={customerPhone}
              className="border border-gray-300 p-2 rounded w-full"
              onChange={(e) => setCustomerPhone(e.target.value)}
            />
          </div>

          <div className="flex items-center">
            <label className="font-light w-44">Billing Address:</label>
            <textarea
              placeholder="Billing Address"
              required
              className="border border-gray-300 p-2 rounded w-full"
              value={customerAddress}
              onChange={(e) => setCustomerAddress(e.target.value)}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="flex items-center">
            <label className="font-light w-44">GSTIN: </label>
            <input
              type="text"
              placeholder="GSTIN"
              required
              value={customerGstin}
              className="border border-gray-300 p-2 rounded w-full"
              onChange={(e) => setCustomerGstin(e.target.value)}
            />
          </div>

          <div className="flex items-center">
            <label className="font-light w-44">Place of Supply:</label>
            <input
              placeholder="Place of Supply"
              required
              type="text"
              className="border border-gray-300 p-2 rounded w-full"
              value={customerPlaceOfSupply}
              onChange={(e) => setCustomerPlaceOfSupply(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Right Section - RS Hardware (3 columns) */}
      <div className="col-span-2 md:col-span-4 mt-12 ml-6">
        <h1 className="text-xl font-semibold mb-8">
          R S HARDWARE GLASS & ELECTRICALS
        </h1>
        <h2>
          GSTIN: <b> 29FKLPP1223G1ZO</b>
        </h2>
        <p>
          Building No- 3/7, Shop No-6, Ground Floor
          <br /> Gowri Shankar Complex Arekere Main Road
          <br /> Bengaluru Karnataka, India
          <br /> PIN: 560076
          <br /> Mobile: +91 8147465517
          <br /> Email: abdulfahad1436@gmail.com
        </p>
      </div>
    </div>
  );
}
