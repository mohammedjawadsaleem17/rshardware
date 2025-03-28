import React, { useState, useRef } from 'react';
import DataTable from 'react-data-table-component';
import { format, addDays } from 'date-fns';
import Customer from './Customer';

const InvoiceGenerator = () => {
  const invoiceNumberRef = useRef(1);
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    gstin: '',
    placeOfSupply: '',
  });

  const [invoiceDate, setInvoiceDate] = useState(new Date());
  const [dueDate, setDueDate] = useState(addDays(new Date(), 7));
  const [lineItems, setLineItems] = useState([
    {
      sno: 1,
      item: 'Glass Sheet',
      rate: 200,
      qty: 10,
      taxableValue: 2000,
      taxAmount: 100,
      total: 2100,
    },
    {
      sno: 2,
      item: 'Electrical Wire',
      rate: 150,
      qty: 20,
      taxableValue: 3000,
      taxAmount: 150,
      total: 3150,
    },
  ]);

  const calculateTotals = () => {
    const subtotal = lineItems.reduce(
      (sum, item) => sum + item.taxableValue,
      0
    );
    const taxAmount = lineItems.reduce((sum, item) => sum + item.taxAmount, 0);
    const grandTotal = subtotal + taxAmount;
    return { subtotal, taxAmount, grandTotal, totalItems: lineItems.length };
  };

  const updateLineItem = (index, field, value) => {
    const updatedItems = [...lineItems];
    updatedItems[index][field] = value;
    updatedItems[index].taxableValue =
      updatedItems[index].rate * updatedItems[index].qty;
    updatedItems[index].taxAmount = updatedItems[index].taxableValue * 0.05;
    updatedItems[index].total =
      updatedItems[index].taxableValue + updatedItems[index].taxAmount;
    setLineItems(updatedItems);
  };

  const addLineItem = () => {
    setLineItems([
      ...lineItems,
      {
        sno: lineItems.length + 1,
        item: '',
        rate: 0,
        qty: 0,
        taxableValue: 0,
        taxAmount: 0,
        total: 0,
      },
    ]);
  };

  const deleteLineItem = (index) => {
    const updatedItems = lineItems.filter((_, i) => i !== index);
    setLineItems(updatedItems);
  };

  const columns = [
    { name: 'Sl No', selector: (row) => row.sno, width: '70px' },
    {
      name: 'Item',
      selector: (row) => row.item,
      cell: (row, index) => (
        <input
          value={row.item}
          onChange={(e) => updateLineItem(index, 'item', e.target.value)}
          className="border border-gray-300 p-2 rounded w-full"
        />
      ),
    },
    {
      name: 'Rate',
      selector: (row) => row.rate,
      cell: (row, index) => (
        <input
          type="number"
          value={row.rate}
          onChange={(e) =>
            updateLineItem(index, 'rate', Number(e.target.value))
          }
          className="border border-gray-300 p-2 rounded w-full"
        />
      ),
    },
    {
      name: 'Qty',
      selector: (row) => row.qty,
      cell: (row, index) => (
        <input
          type="number"
          value={row.qty}
          onChange={(e) => updateLineItem(index, 'qty', Number(e.target.value))}
          className="border border-gray-300 p-2 rounded w-full"
        />
      ),
    },
    { name: 'Taxable Value', selector: (row) => row.taxableValue.toFixed(2) },
    { name: 'Tax Amount', selector: (row) => row.taxAmount.toFixed(2) },
    { name: 'Total', selector: (row) => row.total.toFixed(2) },
    {
      name: 'Actions',
      cell: (row, index) => (
        <button
          className="bg-red-500 text-white p-2 rounded"
          onClick={() => deleteLineItem(index)}
        >
          Delete
        </button>
      ),
    },
  ];

  return (
    <div className="w-full p-6 bg-gray-50 min-h-screen">
      <div className="bg-white p-8 shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold mb-6">Invoice Generator</h1>

        <Customer />

        <DataTable columns={columns} data={lineItems} pagination />

        <button
          className="bg-indigo-500 text-white p-2 rounded mb-4"
          onClick={addLineItem}
        >
          Add Item
        </button>
        <div className="mt-6">
          <p>Total Items: {calculateTotals().totalItems}</p>
          <p>Grand Total: ₹{calculateTotals().grandTotal.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default InvoiceGenerator;
