import React, { useContext, useCallback } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { MainContext } from '../../components/Invoice';

const TextField = React.memo(
  ({ label, type = 'text', value, onChange, placeholder }) => (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
                 transition-all duration-200"
      />
    </div>
  )
);

const TextArea = React.memo(({ label, value, onChange, placeholder }) => (
  <div className="space-y-1">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
                 transition-all duration-200 min-h-[80px]"
    />
  </div>
));

export default function Customer() {
  const {
    customerName,
    setCustomerName,
    invoiceDate,
    setInvoiceDate,
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
    invNo,
    setInvNo,
  } = useContext(MainContext);

  const handleInvNo = useCallback((e) => setInvNo(e.target.value), [setInvNo]);
  const handleName = useCallback(
    (e) => setCustomerName(e.target.value),
    [setCustomerName]
  );
  const handleEmail = useCallback(
    (e) => setCustomerEmail(e.target.value),
    [setCustomerEmail]
  );
  const handlePhone = useCallback(
    (e) => setCustomerPhone(e.target.value),
    [setCustomerPhone]
  );
  const handleAddress = useCallback(
    (e) => setCustomerAddress(e.target.value),
    [setCustomerAddress]
  );
  const handleGstin = useCallback(
    (e) => setCustomerGstin(e.target.value),
    [setCustomerGstin]
  );
  const handleSupply = useCallback(
    (e) => setCustomerPlaceOfSupply(e.target.value),
    [setCustomerPlaceOfSupply]
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg">
      <div className="col-span-1 lg:col-span-8 space-y-6">
        <h1 className="text-2xl font-bold text-gray-800 border-b-2 border-indigo-200 pb-2">
          Customer Details
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TextField
            label="Invoice No."
            value={invNo?.toUpperCase()}
            onChange={handleInvNo}
            placeholder="INV-001"
          />

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Invoice Date
            </label>
            <DatePicker
              selected={invoiceDate}
              onChange={(date) => setInvoiceDate(date)}
              dateFormat="dd/MM/yyyy"
              className="border border-gray-300 p-2 rounded w-full"
            />
          </div>
        </div>

        {/* Other Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TextField
            label="Customer Name"
            value={customerName}
            onChange={handleName}
            placeholder="Customer Name"
          />
          <TextField
            label="Email"
            type="email"
            value={customerEmail}
            onChange={handleEmail}
            placeholder="Customer Email"
          />
          <TextField
            label="Phone Number"
            type="tel"
            value={customerPhone}
            onChange={handlePhone}
            placeholder="+91 XXXXXXXXXX"
          />
          <TextArea
            label="Billing Address"
            value={customerAddress}
            onChange={handleAddress}
            placeholder="Customer Address"
          />
          <TextField
            label="GSTIN"
            value={customerGstin}
            onChange={handleGstin}
            placeholder="22AAAAA0000A1Z5"
          />
          <TextField
            label="Place of Supply"
            value={customerPlaceOfSupply}
            onChange={handleSupply}
            placeholder="Place of Supply"
          />
        </div>
      </div>

      <div className="col-span-1 lg:col-span-4 p-6 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl shadow-inner border border-indigo-100">
        <div className="space-y-4">
          <h1 className="text-xl font-bold text-indigo-800 mb-2 border-b border-indigo-200 pb-2">
            R S HARDWARE GLASS & ELECTRICALS
          </h1>
          <div className="space-y-3 text-gray-700">
            <p>
              <strong>GSTIN:</strong> 29FKLPP1223G1ZO
            </p>
            <p>
              181/2 Shop 2, Ground Floor VP Road <br />
              Old Madivala Near Gangamma Temple <br />
              Bengaluru Karnataka, India <br />
              PIN: 560068
            </p>
            <p>📞 +91 8147465517</p>
            <p>✉️ abdulfahad1436@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
