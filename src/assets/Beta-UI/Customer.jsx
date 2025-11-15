import React, { useState, useContext, useEffect } from 'react';
import { MainContext } from '../../../src/components/Invoice';

export default function Customer() {
  const [mode, setMode] = useState('business');

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
    deliveryNote,
    setDeliveryNote,
    referenceNo,
    setReferenceNo,
    buyersOrderNo,
    setBuyersOrderNo,
    dispatchDocNo,
    setDispatchDocNo,
    dispatchedThrough,
    setDispatchedThrough,
    termsOfDelivery,
    setTermsOfDelivery,
    dated,
    setDated,
    deliveryNoteDate,
    setDeliveryNoteDate,
    destination,
    setDestination,
    paymentTerms,
    setPaymentTerms,
    otherReferences,
    setOtherReferences,
  } = useContext(MainContext);

  const isCash = mode === 'cash';

  const statesOfIndia = [
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chhattisgarh',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttar Pradesh',
    'Uttarakhand',
    'West Bengal',
    'Andaman & Nicobar',
    'Chandigarh',
    'Dadra & Nagar Haveli',
    'Daman & Diu',
    'Delhi',
    'Jammu & Kashmir',
    'Ladakh',
    'Lakshadweep',
    'Puducherry',
  ];

  const inputClass =
    'w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none disabled:bg-gray-50 disabled:text-gray-400';

  useEffect(() => {
    if (isCash) {
      const today = new Date();
      const localDate = today.toLocaleDateString('en-CA');
      setCustomerName('CASH');
      setCustomerEmail('');
      setCustomerPhone('');
      setCustomerAddress('');
      setCustomerGstin('');
      setCustomerPlaceOfSupply('Karnataka');
      setDeliveryNote('');
      setReferenceNo('');
      setBuyersOrderNo('');
      setDispatchDocNo('');
      setDispatchedThrough('');
      setTermsOfDelivery('');
      setDestination('Karnataka');
      setInvoiceDate(localDate);
      setDated(localDate);
      setDeliveryNoteDate(localDate);
      setPaymentTerms('');
      setOtherReferences('');
    }
  }, [isCash]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="w-full mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm mb-6 border border-gray-200">
          <div className="bg-slate-600 px-6 py-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-white">
                  Invoice Details
                </h1>
                <p className="text-slate-100 text-sm mt-1">
                  Create and manage your invoices
                </p>
              </div>

              <div className="flex gap-2 bg-white rounded-lg p-1">
                <label
                  className={`px-4 py-2 rounded cursor-pointer text-sm font-medium ${
                    mode === 'business'
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600'
                  }`}
                >
                  <input
                    type="radio"
                    name="mode"
                    checked={mode === 'business'}
                    onChange={() => setMode('business')}
                    className="mr-2"
                  />
                  Business
                </label>
                <label
                  className={`px-4 py-2 rounded cursor-pointer text-sm font-medium ${
                    mode === 'cash'
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600'
                  }`}
                >
                  <input
                    type="radio"
                    name="mode"
                    checked={mode === 'cash'}
                    onChange={() => setMode('cash')}
                    className="mr-2"
                  />
                  Cash
                </label>
              </div>
            </div>
          </div>

          {isCash && (
            <div className="px-6 py-3 bg-amber-50 border-t border-amber-100">
              <p className="text-sm text-amber-800">
                <span className="font-semibold">Cash Mode:</span> Most fields
                are auto-filled for quick cash transactions
              </p>
            </div>
          )}
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          {/* Section 1 */}
          <div className="mb-6 pb-6 border-b">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 bg-blue-50 text-blue-600 rounded flex items-center justify-center text-sm font-semibold">
                1
              </span>
              Basic Information
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase">
                  Invoice No
                </label>
                <input
                  type="number"
                  value={invNo}
                  onChange={(e) => setInvNo(e.target.value)}
                  placeholder="001"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase">
                  Invoice Date
                </label>
                <input
                  type="date"
                  value={invoiceDate}
                  onChange={(e) => setInvoiceDate(e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div className="mb-6 pb-6 border-b">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 bg-blue-50 text-blue-600 rounded flex items-center justify-center text-sm font-semibold">
                2
              </span>
              Customer Details
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase">
                  Customer Name
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  disabled={isCash}
                  placeholder="Customer Name"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase">
                  Email
                </label>
                <input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  disabled={isCash}
                  placeholder="customer@example.com"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase">
                  Phone
                </label>
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  disabled={isCash}
                  placeholder="+91 98765 43210"
                  className={inputClass}
                />
              </div>
              <div className="md:col-span-2 lg:col-span-3">
                <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase">
                  Billing Address
                </label>
                <textarea
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  disabled={isCash}
                  placeholder="Enter complete billing address"
                  rows={3}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase">
                  GSTIN
                </label>
                <input
                  type="text"
                  value={customerGstin}
                  onChange={(e) => setCustomerGstin(e.target.value)}
                  disabled={isCash}
                  placeholder="22AAAAA0000A1Z5"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase">
                  Place of Supply
                </label>
                <select
                  value={customerPlaceOfSupply}
                  onChange={(e) => setCustomerPlaceOfSupply(e.target.value)}
                  disabled={isCash}
                  className={inputClass}
                >
                  <option value="">Select State</option>
                  {statesOfIndia.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 bg-blue-50 text-blue-600 rounded flex items-center justify-center text-sm font-semibold">
                3
              </span>
              Delivery & Dispatch Details
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase">
                  Delivery Note
                </label>
                <input
                  type="text"
                  value={deliveryNote}
                  onChange={(e) => setDeliveryNote(e.target.value)}
                  disabled={isCash}
                  placeholder="Delivery Note Reference"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase">
                  Reference No & Date
                </label>
                <input
                  type="text"
                  value={referenceNo}
                  onChange={(e) => setReferenceNo(e.target.value)}
                  disabled={isCash}
                  placeholder="Ref No & Date"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase">
                  Buyer's Order No.
                </label>
                <input
                  type="text"
                  value={buyersOrderNo}
                  onChange={(e) => setBuyersOrderNo(e.target.value)}
                  disabled={isCash}
                  placeholder="PO-12345"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase">
                  Payment Date
                </label>
                <input
                  type="date"
                  value={dated}
                  onChange={(e) => setDated(e.target.value)}
                  disabled={isCash}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase">
                  Dispatch Doc No.
                </label>
                <input
                  type="text"
                  value={dispatchDocNo}
                  onChange={(e) => setDispatchDocNo(e.target.value)}
                  disabled={isCash}
                  placeholder="DISP-001"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase">
                  Dispatched Through
                </label>
                <input
                  type="text"
                  value={dispatchedThrough}
                  onChange={(e) => setDispatchedThrough(e.target.value)}
                  disabled={isCash}
                  placeholder="Courier / Transport Name"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase">
                  Mode of Payment
                </label>
                <select
                  value={paymentTerms}
                  onChange={(e) => setPaymentTerms(e.target.value)}
                  disabled={isCash}
                  className={inputClass}
                >
                  <option value="">Select Payment Mode</option>
                  <option value="Cash">Cash</option>
                  <option value="Credit Card">Credit Card</option>
                  <option value="Debit Card">Debit Card</option>
                  <option value="Cheque">Cheque</option>
                  <option value="UPI">UPI</option>
                  <option value="NetBanking">NetBanking</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase">
                  Other References
                </label>
                <input
                  type="text"
                  value={otherReferences}
                  onChange={(e) => setOtherReferences(e.target.value)}
                  disabled={isCash}
                  placeholder="Any other References"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase">
                  Terms of Delivery
                </label>
                <input
                  type="text"
                  value={termsOfDelivery}
                  onChange={(e) => setTermsOfDelivery(e.target.value)}
                  disabled={isCash}
                  placeholder="Terms of Delivery"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase">
                  Delivery Note Date
                </label>
                <input
                  type="date"
                  value={deliveryNoteDate}
                  onChange={(e) => setDeliveryNoteDate(e.target.value)}
                  disabled={isCash}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase">
                  Destination
                </label>
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  disabled={isCash}
                  className={inputClass}
                >
                  <option value="">Select State</option>
                  {statesOfIndia.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
