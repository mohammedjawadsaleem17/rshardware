import React, { useState, useContext, useCallback, useMemo } from 'react';
import DataTable from 'react-data-table-component';
import { format } from 'date-fns';
import Customer from './Customer';
import FinalDetails from './FinalDetails';
import { MainContext } from './Invoice';
import Payments from './Payments';
import Footer from './Footer';
import FinalInvoice from './PDF/FinalInvoice';
import { motion } from 'framer-motion';
import ProformaInvoice from './PDF/ProformaInvoice';
import Loader from './Loader/Loader';

const InvoiceGenerator = () => {
  const {
    isLoading,
    customerName,
    invoiceDate,
    dueDate,
    invoiceNumber,
    customerEmail,
    customerPhone,
    customerAddress,
    customerGstin,
    customerPlaceOfSupply,
    invoiceNo,
    setInvoiceNo,
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
      taxAmount: 0,
      total: 0,
    },
  ]);

  const calculateValues = useCallback((row) => {
    const rate = parseFloat(row.rate) || 0;
    const qty = parseFloat(row.qty) || 0;
    const taxableValue = rate * qty;
    const taxAmount = taxableValue * 0.18;
    const total = taxableValue + taxAmount;
    return { taxableValue, taxAmount, total };
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

  const handleRowUpdate = useCallback(
    (id, field, value) => {
      setLineItems((prevItems) =>
        prevItems.map((item) => {
          if (item.id === id) {
            const updatedItem = { ...item, [field]: value };
            if (['rate', 'qty'].includes(field)) {
              const calculated = calculateValues(updatedItem);
              return { ...updatedItem, ...calculated };
            }
            return updatedItem;
          }
          return item;
        })
      );
    },
    [calculateValues]
  );

  const addNewRow = useCallback(() => {
    const newId =
      lineItems.length > 0
        ? Math.max(...lineItems.map((item) => item.id)) + 1
        : 1;
    setLineItems((prevItems) => [
      ...prevItems,
      {
        id: newId,
        sno: prevItems.length + 1,
        item: '',
        hsn: '',
        rate: '',
        qty: '',
        taxableValue: 0,
        taxAmount: 0,
        total: 0,
      },
    ]);
  }, [lineItems]);

  const deleteRow = useCallback((id) => {
    setLineItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item.id !== id);
      return updatedItems.map((item, idx) => ({
        ...item,
        sno: idx + 1,
      }));
    });
  }, []);

  const InputField = useCallback(
    ({ row, fieldName, type = 'text', placeholder = '', min, step }) => {
      return (
        <input
          type={type}
          value={row[fieldName]}
          onChange={(e) => handleRowUpdate(row.id, fieldName, e.target.value)}
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          placeholder={placeholder}
          min={min}
          step={step}
        />
      );
    },
    [handleRowUpdate]
  );

  const columns = useMemo(
    () => [
      {
        name: '#',
        selector: (row) => row.sno,
        width: '60px',
        style: {
          justifyContent: 'center',
        },
      },
      {
        name: 'Item Description',
        cell: (row) => (
          <InputField row={row} fieldName="item" placeholder="Item name" />
        ),
        minWidth: '200px',
      },
      {
        name: 'HSN Code',
        cell: (row) => (
          <InputField row={row} fieldName="hsn" placeholder="HSN code" />
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
          <InputField row={row} fieldName="qty" type="number" min="0" />
        ),
        width: '80px',
      },
      {
        name: 'Taxable Value',
        selector: (row) => row.taxableValue,
        format: (row) => `₹${row.taxableValue.toFixed(2)}`,
        width: '120px',
        style: {
          justifyContent: 'flex-end',
        },
      },
      {
        name: 'Tax (18%)',
        selector: (row) => row.taxAmount,
        format: (row) => `₹${row.taxAmount.toFixed(2)}`,
        width: '120px',
        style: {
          justifyContent: 'flex-end',
        },
      },
      {
        name: 'Total',
        selector: (row) => row.total,
        format: (row) => `₹${row.total.toFixed(2)}`,
        width: '120px',
        style: {
          justifyContent: 'flex-end',
          fontWeight: 'bold',
        },
      },
      {
        name: 'Actions',
        cell: (row) => (
          <button
            onClick={() => deleteRow(row.id)}
            className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-100 transition-colors"
            title="Delete row"
            type="button"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
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
        style: {
          justifyContent: 'center',
        },
      },
    ],
    [InputField, deleteRow]
  );

  const calculateTotals = useMemo(() => {
    const subtotal = lineItems.reduce(
      (sum, item) => sum + item.taxableValue,
      0
    );
    const taxAmount = lineItems.reduce((sum, item) => sum + item.taxAmount, 0);
    const total = subtotal + taxAmount;
    return { subtotal, taxAmount, total };
  }, [lineItems]);

  const { subtotal, taxAmount, total } = calculateTotals;
  const cgst = taxAmount / 2;
  const sgst = taxAmount / 2;

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
      invoiceNum: invoiceNumber,
      invoiceDate: invoice,
      dueDate: due,
    }),
    [
      customerName,
      customerEmail,
      customerPhone,
      customerAddress,
      customerGstin,
      customerPlaceOfSupply,
      invoiceNumber,
      invoice,
      due,
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
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow mb-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
              <motion.h1
                variants={itemVariants}
                className="text-xl sm:text-2xl font-bold text-gray-800 border-b-2 border-indigo-200 pb-2 w-full sm:w-auto"
              >
                Particulars
              </motion.h1>
              <div className="flex flex-col xs:flex-row items-start xs:items-center gap-3 w-full sm:w-auto">
                <span className="text-sm bg-indigo-100 text-indigo-800 py-1 px-3 rounded-full whitespace-nowrap">
                  Items: {lineItems.length}
                </span>
                <button
                  onClick={addNewRow}
                  className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded flex items-center w-full xs:w-auto justify-center transition-colors"
                  type="button"
                >
                  <svg
                    className="w-5 h-5 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  Add Item
                </button>
              </div>
            </div>
          </div>

          <DataTable
            columns={columns}
            data={lineItems}
            noHeader
            fixedHeader
            fixedHeaderScrollHeight="400px"
            responsive
            customStyles={{
              head: {
                style: {
                  backgroundColor: '#f3f4f6',
                  fontWeight: 'bold',
                  fontSize: '14px',
                },
              },
              headRow: {
                style: {
                  borderTopWidth: '1px',
                  borderTopColor: '#e5e7eb',
                },
              },
              headCells: {
                style: {
                  paddingLeft: '12px',
                  paddingRight: '12px',
                },
              },
              cells: {
                style: {
                  paddingLeft: '12px',
                  paddingRight: '12px',
                  fontSize: '14px',
                },
              },
              rows: {
                style: {
                  minHeight: '60px',
                  '&:not(:last-of-type)': {
                    borderBottomWidth: '1px',
                    borderBottomColor: '#e5e7eb',
                  },
                },
              },
            }}
            pagination={false}
          />
        </div>

        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <motion.h1
            variants={itemVariants}
            className="text-2xl font-bold text-gray-800 border-b-2 border-indigo-200 pb-2"
          >
            Invoice Summary
          </motion.h1>
          <div className="space-y-3">
            <div className="flex justify-between py-2">
              <span className="text-gray-700">Taxable Amount:</span>
              <span className="font-medium">₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-700">CGST (9%):</span>
              <span className="font-medium">₹{cgst.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-700">SGST (9%):</span>
              <span className="font-medium">₹{sgst.toFixed(2)}</span>
            </div>
            <div className="border-t border-gray-200 pt-3 mt-2">
              <div className="flex justify-between py-2">
                <span className="text-lg font-bold">Grand Total:</span>
                <span className="text-lg font-bold">₹{total.toFixed(2)}</span>
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
            total={total}
            invoiceNo={invoiceNo}
            setInvoiceNo={setInvoiceNo}
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
