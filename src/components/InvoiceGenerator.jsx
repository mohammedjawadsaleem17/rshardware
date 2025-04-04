import React, { useState, useRef, useContext } from 'react';
import DataTable from 'react-data-table-component';
import { format, addDays } from 'date-fns';
import Customer from './Customer';
import FinalDetails from './FinalDetails';
import { MainContext } from './Invoice';
import Payments from './Payments';
import Footer from './Footer';
import FinalInvoice from './PDF/FinalInvoice';

const InvoiceGenerator = () => {
  const {
    customerName,
    invoiceDate,
    dueDate,
    lineItems: items,
    invoiceNumber,
    customerEmail,
    customerPhone,
    customerAddress,
    customerGstin,
    customerPlaceOfSupply,
  } = useContext(MainContext);
  const [shouldDownload, setShouldDownload] = useState(false);
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
    updatedItems[index].taxAmount = updatedItems[index].taxableValue * 0.18;
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
    { name: 'Tax Amount (18%)', selector: (row) => row.taxAmount.toFixed(2) },
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

  //!Final Data
  console.log('-----------------Final Data-----------------');
  // console.log(customerName);
  console.log(invoiceDate);
  console.log(dueDate);
  console.log(invoiceNumber);
  // console.log(customerEmail);
  // console.log(customerPhone);
  // console.log(customerAddress);
  // console.log(customerGstin);
  // console.log(customerPlaceOfSupply);
  console.log('Line Items', lineItems);

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

  const customerDetails = {
    name: customerName,
    email: customerEmail,
    phone: customerPhone,
    address: customerAddress,
    gstin: customerGstin,
    place: customerPlaceOfSupply,
    invoiceNum: invoiceNumber,
    invoiceDate: invoice,
    dueDate: due,
  };

  //Test
  console.log('Tax ', lineItems);
  const taxAmt = lineItems?.reduce(
    (acc, item) => acc + Number(item.taxableValue),
    0
  );
  const taxPayable = lineItems?.reduce(
    (acc, item) => acc + Number(item.taxAmount),
    0
  );

  const cgst = (taxAmt / 100) * 9;

  console.log('Taxable Amount ', cgst);

  const total = taxAmt + cgst * 2;

  return (
    <div className="w-full px-4 py-0   min-h-screen">
      <div className="bg-white p-4 shadow-sm rounded-lg">
        <h1 className="text-3xl font-bold mb-6">Invoice Generator</h1>
        <Customer />

        <h1 className="text-xl font-bold mb-0 mt-8 underline">Particulars</h1>
        <DataTable
          columns={columns}
          data={lineItems}
          pagination
          paginationPerPage={50}
          paginationRowsPerPageOptions={[10, 25, 50, 100]}
        />
        <button
          className="bg-indigo-500 text-white p-2 rounded mb-4"
          onClick={addLineItem}
        >
          Add Item
        </button>
        <div className="flex justify-between mr-6">
          <p>
            Total Items:<b> {calculateTotals()?.totalItems}</b>
          </p>
          <p>
            Taxable Amount: <b>₹{taxAmt}</b>
          </p>
        </div>
        <div className="flex justify-end">
          <p className="mr-6">
            CGST: (9%) : ₹ <b>{cgst}</b>
          </p>
        </div>
        <div className="flex justify-end">
          <p className="mr-6">
            SGST: (9%) : ₹ <b>{cgst}</b>
          </p>
        </div>

        <div className="mt-6 flex flex-row-reverse mr-6">
          <p>
            <hr></hr>
            <b>Grand Total:</b> ₹ <b>{total?.toFixed(2)}</b>
          </p>
        </div>
        <hr />
        {customerName && <FinalDetails />}
        <Payments />
        <FinalInvoice customerDetails={customerDetails} items={lineItems} />
        <Footer />
      </div>
    </div>
  );
};

export default InvoiceGenerator;
