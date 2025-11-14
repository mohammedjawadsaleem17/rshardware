import React, { useState, useContext, useCallback, useMemo } from 'react';
import DataTable from 'react-data-table-component';
import FinalDetails from './FinalDetails';
import { MainContext } from './Invoice';
import Payments from './Payments';
import Footer from './Footer';
import FinalInvoice from './PDF/FinalInvoice';
import ProformaInvoice from './PDF/ProformaInvoice';
import Loader from './Loader/Loader';
import Customer from '../assets/Beta-UI/Customer';

const InvoiceGenerator = () => {
  const {
    isLoading,
    connection,
    fetchInvoiceNo,
    invoiceDate = new Date(),
    dueDate = new Date(),
    invoiceNo = '',
    setInvoiceNo,
    setCustomerName,
    setCustomerEmail,
    setCustomerPhone,
    setCustomerAddress,
    setCustomerGstin,
    setInvoiceDate,
    setCustomerPlaceOfSupply,
    setDueDate,
    setInvNo,
    invNo,
    deliveryNote = '',
    setDeliveryNote,
    referenceNo = '',
    setReferenceNo,
    buyersOrderNo = '',
    setBuyersOrderNo,
    dispatchDocNo = '',
    setDispatchDocNo,
    dispatchedThrough = '',
    setDispatchedThrough,
    termsOfDelivery = '',
    setTermsOfDelivery,
    paymentTerms = '',
    setPaymentTerms,
    otherReferences = '',
    setOtherReferences,
    dated = '',
    setDated,
    deliveryNoteDate = '',
    setDeliveryNoteDate,
    destination = '',
    setDestination,
    customerName = '',
    customerEmail = '',
    customerPhone = '',
    customerAddress = '',
    customerGstin = '',
    customerPlaceOfSupply = '',
  } = useContext(MainContext);

  const [lineItems, setLineItems] = useState([
    {
      id: 1,
      sno: 1,
      item: '',
      hsn: '',
      rate: '',
      qty: '',
      taxableValue: 0,
      cgst: 0,
      sgst: 0,
      taxAmount: 0,
      total: 0,
    },
  ]);

  // ------------------------- Calculations -------------------------
  const calculateLineValues = useCallback((row) => {
    const rate = parseFloat(row.rate) || 0;
    const qty = parseFloat(row.qty) || 0;
    const taxableRate = rate / 1.18;
    const taxableValue = +(taxableRate * qty).toFixed(2);
    const cgst = +(taxableRate * 0.09 * qty).toFixed(2);
    const sgst = +(taxableRate * 0.09 * qty).toFixed(2);
    const taxAmount = +(cgst + sgst).toFixed(2);
    const total = +(taxableValue + taxAmount).toFixed(2);
    return { taxableValue, cgst, sgst, taxAmount, total };
  }, []);

  const handleRowUpdate = useCallback(
    (id, field, value) => {
      setLineItems((prev) =>
        prev.map((item) => {
          if (item.id === id) {
            const updatedItem = { ...item, [field]: value };
            if (['rate', 'qty', 'hsn'].includes(field)) {
              return { ...updatedItem, ...calculateLineValues(updatedItem) };
            }
            return updatedItem;
          }
          return item;
        })
      );
    },
    [calculateLineValues]
  );

  const addNewRow = useCallback(() => {
    const newId =
      lineItems.length > 0
        ? Math.max(...lineItems.map((item) => item.id)) + 1
        : 1;
    setLineItems((prev) => [
      ...prev,
      {
        id: newId,
        sno: prev.length + 1,
        item: '',
        hsn: '',
        rate: '',
        qty: '',
        taxableValue: 0,
        cgst: 0,
        sgst: 0,
        taxAmount: 0,
        total: 0,
      },
    ]);
  }, [lineItems]);

  const deleteRow = useCallback((id) => {
    setLineItems((prev) =>
      prev
        .filter((item) => item.id !== id)
        .map((item, idx) => ({ ...item, sno: idx + 1 }))
    );
  }, []);

  // ------------------------- InputField -------------------------
  const InputField = useCallback(
    ({ row, fieldName, type = 'text', placeholder = '', min, step, width }) => (
      <input
        type={type}
        value={row[fieldName]}
        onChange={(e) => handleRowUpdate(row.id, fieldName, e.target.value)}
        onWheel={(e) => e.target.blur()} // prevent scroll changing value
        className={`w-full p-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500`}
        placeholder={placeholder}
        min={min}
        step={step}
        style={{
          width: width || '100%',
          boxSizing: 'border-box',
          MozAppearance: 'textfield', // remove arrows in Firefox
        }}
      />
    ),
    [handleRowUpdate]
  );

  // ------------------------- Columns -------------------------
  const columns = useMemo(
    () => [
      {
        name: '#',
        selector: (row) => row.sno,
        width: '50px',
        style: { justifyContent: 'center' },
      },
      {
        name: 'Item Description',
        cell: (row) => (
          <InputField row={row} fieldName="item" placeholder="Item name" />
        ),
        minWidth: '220px',
      },
      {
        name: 'HSN Code',
        cell: (row) => (
          <InputField
            row={row}
            fieldName="hsn"
            placeholder="HSN code"
            type="number"
            min="0"
          />
        ),
        width: '120px',
      },
      {
        name: 'Rate (₹)',
        cell: (row) => (
          <InputField
            row={row}
            fieldName="rate"
            type="number"
            min="0"
            step="0.01"
          />
        ),
        width: '120px',
      },
      {
        name: 'Qty',
        cell: (row) => (
          <InputField
            row={row}
            fieldName="qty"
            type="number"
            min="0"
            width="80px"
          />
        ),
        width: '100px',
      },
      {
        name: 'Taxable Value',
        cell: (row) => (
          <div className="text-right w-full">
            ₹{row.taxableValue.toFixed(2)}
          </div>
        ),
        width: '120px',
      },
      {
        name: 'Tax (18%)',
        cell: (row) => (
          <div className="text-right w-full">₹{row.taxAmount.toFixed(2)}</div>
        ),
        width: '120px',
      },
      {
        name: 'Total',
        cell: (row) => (
          <div className="text-right font-bold w-full">
            ₹{row.total.toFixed(2)}
          </div>
        ),
        width: '120px',
      },
      {
        name: 'Actions',
        cell: (row) => (
          <button
            onClick={() => deleteRow(row.id)}
            className="text-red-500 hover:text-red-700 p-1.5 rounded-full hover:bg-red-100 transition-colors"
            title="Delete row"
            type="button"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        ),
        width: '80px',
        style: { justifyContent: 'center' },
      },
    ],
    [InputField, deleteRow]
  );

  // ------------------------- Totals -------------------------
  const totals = useMemo(() => {
    const subtotal = lineItems.reduce(
      (sum, item) => sum + item.taxableValue,
      0
    );
    const cgstTotal = lineItems.reduce((sum, item) => sum + item.cgst, 0);
    const sgstTotal = lineItems.reduce((sum, item) => sum + item.sgst, 0);
    const taxAmount = +(cgstTotal + sgstTotal).toFixed(2);
    const totalBeforeRoundOff = +(subtotal + taxAmount).toFixed(2);
    const grandTotal = Math.round(totalBeforeRoundOff);
    return {
      subtotal,
      cgstTotal,
      sgstTotal,
      taxAmount,
      totalBeforeRoundOff,
      grandTotal,
    };
  }, [lineItems]);

  const { subtotal, cgstTotal, sgstTotal, grandTotal } = totals;

  const invoice = new Date(invoiceDate).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
  const due = new Date(dueDate).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  const customerDetails = useMemo(
    () => ({
      name: customerName,
      email: customerEmail,
      phone: customerPhone,
      address: customerAddress,
      gstin: customerGstin,
      place: customerPlaceOfSupply,
      invoiceNum: invNo,
      invoiceDate: invoice,
      dueDate: due,
      lineItems,
      deliveryNote,
      referenceNo,
      buyersOrderNo,
      dispatchDocNo,
      dispatchedThrough,
      termsOfDelivery,
      paymentTerms,
      otherReferences,
      dated,
      deliveryNoteDate,
      destination,
    }),
    [
      customerName,
      customerEmail,
      customerPhone,
      customerAddress,
      customerGstin,
      customerPlaceOfSupply,
      invoice,
      due,
      lineItems,
      deliveryNote,
      referenceNo,
      buyersOrderNo,
      dispatchDocNo,
      dispatchedThrough,
      termsOfDelivery,
      paymentTerms,
      otherReferences,
      dated,
      deliveryNoteDate,
      destination,
      invNo,
    ]
  );

  return (
    <div className="mx-auto bg-gray-100 min-h-screen pb-16">
      {isLoading && <Loader />}
      <div className="bg-indigo-600 text-white p-4 sticky top-0 z-10 shadow-md">
        <h1 className="text-xl font-bold text-center">Invoice Generator</h1>
      </div>

      <div className="p-4 md:p-6">
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <Customer />
        </div>

        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow mb-6 flex justify-between items-center">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 border-b-2 border-indigo-200 pb-2 w-full sm:w-auto">
              Particulars
            </h1>
            <div className="flex gap-3">
              <span className="text-sm bg-indigo-100 text-indigo-800 py-1 px-3 rounded-full">
                Items: {lineItems.length}
              </span>
              <button
                onClick={addNewRow}
                className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded flex items-center justify-center transition-colors"
                type="button"
              >
                Add Item
              </button>
            </div>
          </div>

          <DataTable
            columns={columns}
            data={lineItems}
            noHeader
            fixedHeader
            fixedHeaderScrollHeight="400px"
            responsive
            pagination={false}
            customStyles={{
              headCells: { style: { fontSize: '14px', fontWeight: 'bold' } },
              cells: { style: { fontSize: '14px', padding: '4px 8px' } },
              rows: { style: { minHeight: '50px' } },
            }}
          />
        </div>

        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h1 className="text-2xl font-bold text-gray-800 border-b-2 border-indigo-200 pb-2">
            Invoice Summary
          </h1>
          <div className="space-y-3">
            <div className="flex justify-between py-2">
              <span className="text-gray-700">Taxable Amount:</span>
              <span className="font-medium">₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-700">CGST (9%):</span>
              <span className="font-medium">₹{cgstTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-700">SGST (9%):</span>
              <span className="font-medium">₹{sgstTotal.toFixed(2)}</span>
            </div>
            <div className="border-t border-gray-200 pt-3 mt-2">
              <div className="flex justify-between py-2">
                <span className="text-lg font-bold">Grand Total:</span>
                <span className="text-lg font-bold">
                  ₹{grandTotal.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {customerName && (
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <FinalDetails />
          </div>
        )}

        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <Payments />
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <ProformaInvoice
            customerDetails={customerDetails}
            items={lineItems}
          />
          <FinalInvoice
            customerDetails={customerDetails}
            items={lineItems}
            total={grandTotal}
            invoiceNo={invoiceNo}
            setInvoiceNo={setInvoiceNo}
            connection={connection}
            fetchInvoiceNo={fetchInvoiceNo}
            setCustomerName={setCustomerName}
            setCustomerEmail={setCustomerEmail}
            setCustomerPhone={setCustomerPhone}
            setCustomerAddress={setCustomerAddress}
            setCustomerGstin={setCustomerGstin}
            setInvoiceDate={setInvoiceDate}
            setCustomerPlaceOfSupply={setCustomerPlaceOfSupply}
            setDueDate={setDueDate}
            setLineItems={setLineItems}
            invNo={invNo}
            setInvNo={setInvNo}
          />
        </div>

        <div className="mt-1">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default InvoiceGenerator;
