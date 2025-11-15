import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import Loader from '../Loader/Loader';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const customStyles = {
  headCells: {
    style: {
      backgroundColor: '#6366F1',
      color: 'white',
      fontWeight: 'bold',
    },
  },
  cells: {
    style: {
      wordBreak: 'break-word',
    },
  },
  title: {
    style: {
      textAlign: 'center',
      width: '100%',
      fontSize: '1.25rem',
      fontWeight: '600',
      color: '#111827',
      marginBottom: '1rem',
    },
  },
};

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [record, setRecord] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [adminMode, setAdminMode] = useState(false);
  async function fetchInvoiceRecords() {
    try {
      setLoading(true);
      const res = await fetch('http://localhost:8080/invoice');
      // const res = await fetch('https://rshardware.up.railway.app/users');
      const data = await res.json();
      setRecord(data);
      setLoading(false);
    } catch (e) {
      console.log(e);
      // const res = await fetch('https://rshardware-backend.onrender.com/users');
      // const data = await res.json();
      // setRecord(data);
      // setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchInvoiceRecords();
  }, []);

  async function handleDelete(rowId) {
    setLoading(true);
    try {
      const res = await fetch(
        // `https://rshardware-backend.onrender.com/users/${rowId}`,
        `http://localhost:8080/invoice/${rowId}`,
        {
          method: 'DELETE',
        }
      );
      if (!res.ok) {
        alert('Failed to Delete');
      }
      setRecord((prev) => prev?.filter((user) => user?.id !== rowId));
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  }

  const columns = [
    {
      name: 'Invoice ID',
      selector: (row) => (
        <Link
          to={`/dashboard/${row.id}`}
          className="underline text-indigo-400 break-all"
        >
          {row.invoiceId}
        </Link>
      ),
      sortable: true,
      wrap: true,
    },
    {
      name: 'Name',
      selector: (row) => row.name,
      sortable: true,
      wrap: true,
    },
    {
      name: 'Email',
      selector: (row) => row.email,
      sortable: true,
      wrap: true,
    },
    {
      name: 'Ph No',
      selector: (row) => row.phoneNumber,
      sortable: true,
      wrap: true,
    },
  ];

  if (adminMode) {
    columns.push({
      name: 'Actions',
      cell: (row) => (
        <button
          onClick={() => {
            console.log('ROw', row);
            handleDelete(row.id);
            console.log('Rows id ', row.id);
          }}
          className="text-red-600 hover:text-red-800 font-medium"
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
    });
  }

  let data = [
    {
      invoiceId: 1,
      name: 'Fahad',
      email: '1988',
      phoneNumber: 8702549715,
      totalAmount: '100',
    },
    {
      invoiceId: 2,
      name: 'Jawad',
      email: '1988',
      phoneNumber: 8702549715,
      totalAmount: '100',
    },
  ];

  data = record;

  const filteredData = data?.filter(
    (item) =>
      item?.invoiceId?.toString().includes(searchTerm) ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.phoneNumber?.toString().includes(searchTerm)
  );

  return (
    <div className="mx-auto px-5">
      <ToastContainer />
      {loading && <Loader />}
      <div className="px-4 pt-8 flex justify-end">
        <button
          className="bg-indigo-500 hover:bg-indigo-700 text-white font-light py-2 px-5 rounded-lg transition-colors duration-300 flex items-center gap-2 mr-4"
          onClick={fetchInvoiceRecords}
        >
          Refresh Records
        </button>
        <button
          className="bg-indigo-500 hover:bg-indigo-700 text-white font-extralight py-2 px-2  rounded-lg transition-colors duration-300 flex items-center gap-2"
          onClick={() => setAdminMode(!adminMode)}
        >
          {adminMode ? 'Disable Admin Mode' : 'Admin Mode'}
        </button>
      </div>
      <div className="px-4 pt-8 flex justify-end">
        <input
          type="text"
          placeholder="Search Invoices"
          className="border-1 p-1 border- rounded-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <DataTable
        columns={columns}
        data={filteredData}
        striped
        title={
          <div className="w-full text-center text-2xl font-semibold text-gray-800">
            Invoice Records
          </div>
        }
        customStyles={customStyles}
      />
    </div>
  );
}
