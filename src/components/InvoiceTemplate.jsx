import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import {
  PlusIcon,
  TrashIcon,
  UserIcon,
  SettingsIcon,
  HomeIcon,
} from 'lucide-react';

const InvoiceTemplate = () => {
  const [activeTab, setActiveTab] = useState('invoices');
  const [items, setItems] = useState([
    {
      id: 1,
      type: 'Service',
      description: 'Service charges and gratuity',
      qty: 1,
      unit: 1250,
      value: 1250,
    },
    {
      id: 2,
      type: 'Deposit',
      description: 'Deposits',
      qty: 1,
      unit: 3000,
      value: 3000,
    },
    {
      id: 3,
      type: 'Item',
      description: 'Food items',
      qty: 1,
      unit: 5850,
      value: 5850,
    },
  ]);

  const columns = [
    {
      name: 'Type',
      selector: (row) => row.type,
      cell: (row) => (
        <select
          value={row.type}
          onChange={(e) => updateItem(row.id, 'type', e.target.value)}
          className="w-full p-2 border rounded bg-white"
        >
          <option>Service</option>
          <option>Deposit</option>
          <option>Item</option>
        </select>
      ),
    },
    {
      name: 'Description',
      selector: (row) => row.description,
      cell: (row) => (
        <input
          value={row.description}
          onChange={(e) => updateItem(row.id, 'description', e.target.value)}
          className="w-full p-2 border rounded"
        />
      ),
    },
    {
      name: 'Qty.',
      selector: (row) => row.qty,
      cell: (row) => (
        <input
          type="number"
          value={row.qty}
          onChange={(e) =>
            updateItem(row.id, 'qty', parseFloat(e.target.value))
          }
          className="w-20 p-2 border rounded text-center"
        />
      ),
    },
    {
      name: 'Unit',
      selector: (row) => row.unit,
      cell: (row) => (
        <input
          type="number"
          value={row.unit}
          onChange={(e) =>
            updateItem(row.id, 'unit', parseFloat(e.target.value))
          }
          className="w-32 p-2 border rounded text-right"
        />
      ),
    },
    {
      name: 'Value',
      selector: (row) => row.value,
      cell: (row) => (
        <div className="w-32 p-2 text-right font-semibold">
          ${row.value.toLocaleString()}
        </div>
      ),
    },
    {
      name: 'Actions',
      cell: (row) => (
        <button
          onClick={() => removeItem(row.id)}
          className="text-red-500 hover:bg-red-50 p-2 rounded"
        >
          <TrashIcon className="h-5 w-5" />
        </button>
      ),
      width: '100px',
    },
  ];

  const updateItem = (id, field, value) => {
    const updatedItems = items.map((item) =>
      item.id === id
        ? {
            ...item,
            [field]: value,
            value: item.qty * (field === 'unit' ? value : item.unit),
          }
        : item
    );
    setItems(updatedItems);
  };

  const addItem = () => {
    const newItem = {
      id: Date.now(),
      type: 'Service',
      description: 'New Item',
      qty: 1,
      unit: 0,
      value: 0,
    };
    setItems([...items, newItem]);
  };

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const calculateTotals = () => {
    return {
      subtotal: items.reduce((sum, item) => sum + item.value, 0),
      tax: items.reduce((sum, item) => sum + item.value, 0) * 0.1,
      total: items.reduce((sum, item) => sum + item.value, 0) * 1.1,
    };
  };

  const totals = calculateTotals();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <nav className="bg-green-500 text-white">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="text-2xl font-bold">Invoicer</div>
          <div className="flex space-x-6">
            <button
              onClick={() => setActiveTab('home')}
              className={`flex items-center space-x-2 ${activeTab === 'home' ? 'text-white' : 'text-green-200'}`}
            >
              <HomeIcon className="h-5 w-5" />
              <span>Home</span>
            </button>
            <button
              onClick={() => setActiveTab('invoices')}
              className={`flex items-center space-x-2 ${activeTab === 'invoices' ? 'text-white' : 'text-green-200'}`}
            >
              <UserIcon className="h-5 w-5" />
              <span>Invoices</span>
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex items-center space-x-2 ${activeTab === 'settings' ? 'text-white' : 'text-green-200'}`}
            >
              <SettingsIcon className="h-5 w-5" />
              <span>Settings</span>
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <img
              src="/api/placeholder/40/40"
              alt="Profile"
              className="rounded-full w-10 h-10"
            />
          </div>
        </div>
      </nav>

      {/* Invoice Content */}
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              New Invoice for Bread & Roll Ltd.
            </h1>
            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center">
              Recurring Invoice
            </button>
          </div>

          {/* Invoice Details */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Invoice Number
                </label>
                <input
                  type="text"
                  defaultValue="2023-37-01"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Client
                </label>
                <input
                  type="text"
                  defaultValue="Bread & Roll Ltd."
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Issue Date
                </label>
                <input
                  type="date"
                  defaultValue="2023-09-01"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Tax Number
                </label>
                <input
                  type="text"
                  defaultValue="1111111111"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Currency
                </label>
                <select className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3">
                  <option>United States Dollar (USD) - $</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Due Date
                </label>
                <div className="mt-1 flex items-center">
                  <input
                    type="text"
                    defaultValue="14 days"
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                  />
                </div>
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Subject
                </label>
                <input
                  type="text"
                  defaultValue="Catering services Halloween"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                />
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Invoice Items
              </h2>
              <button
                onClick={addItem}
                className="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600 flex items-center"
              >
                <PlusIcon className="mr-2 h-5 w-5" /> Add Item
              </button>
            </div>
            <DataTable
              columns={columns}
              data={items}
              pagination={false}
              highlightOnHover
              responsive
            />
          </div>

          {/* Totals */}
          <div className="ml-auto max-w-md">
            <div className="space-y-2 text-right">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">
                  ${totals.subtotal.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax (10%)</span>
                <span className="font-semibold">
                  ${totals.tax.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t pt-2">
                <span>Total</span>
                <span>${totals.total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceTemplate;
