import React, { useEffect, useState, useMemo } from 'react';
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
  const [selectedMonth, setSelectedMonth] = useState('');

  async function fetchInvoiceRecords() {
    try {
      setLoading(true);
      const res = await fetch(
        'https://rs-hardware-glass-and-electrical.onrender.com/invoice'
      );
      const data = await res.json();
      setRecord(data);
      setLoading(false);
    } catch (e) {
      console.log(e);
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
        `https://rs-hardware-glass-and-electrical.onrender.com/invoice/${rowId}`,
        { method: 'DELETE' }
      );

      if (!res.ok) {
        alert('Failed to Delete');
      }

      setRecord((prev) => prev?.filter((item) => item?.id !== rowId));
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  }

  // ------------------------------
  // DATE LOGIC
  // ------------------------------

  const getMonthYear = (item) => {
    let dateStr =
      item?.dated?.trim() !== '' && item?.dated
        ? item.dated
        : item?.dueDate || '';

    if (!dateStr) return null;

    const parsedDate = new Date(dateStr);
    if (isNaN(parsedDate)) return null;

    return parsedDate.toLocaleString('en-US', {
      month: 'short',
      year: 'numeric',
    });
  };

  const getDisplayDate = (item) => {
    return item?.dated?.trim() ? item.dated : item?.dueDate || '—';
  };

  // Build unique month list
  const monthOptions = useMemo(() => {
    const setVal = new Set();
    record.forEach((r) => {
      const m = getMonthYear(r);
      if (m) setVal.add(m.toUpperCase());
    });
    return [...setVal];
  }, [record]);

  // ------------------------------
  // FILTERING
  // ------------------------------
  const filteredData = useMemo(() => {
    return record.filter((item) => {
      const matchesSearch =
        searchTerm === '' ||
        item?.invoiceId?.toString().includes(searchTerm) ||
        item?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item?.phoneNumber?.toString().includes(searchTerm);

      const itemMonth = getMonthYear(item)?.toUpperCase() || '';
      const matchesMonth = selectedMonth === '' || itemMonth === selectedMonth;

      return matchesSearch && matchesMonth;
    });
  }, [record, searchTerm, selectedMonth]);

  // ------------------------------
  // TABLE COLUMNS
  // ------------------------------
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
    { name: 'Name', selector: (row) => row.name, sortable: true, wrap: true },
    { name: 'Email', selector: (row) => row.email, sortable: true, wrap: true },
    {
      name: 'Ph No',
      selector: (row) => row.phoneNumber,
      sortable: true,
      wrap: true,
    },

    // NEW COLUMN — Dated
    {
      name: 'Dated',
      selector: (row) => getDisplayDate(row),
      sortable: true,
      wrap: true,
    },
  ];

  if (adminMode) {
    columns.push({
      name: 'Actions',
      cell: (row) => (
        <button
          onClick={() => handleDelete(row.id)}
          className="text-red-600 hover:text-red-800 font-medium"
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
    });
  }

  return (
    <div className="mx-auto px-5">
      <ToastContainer />
      {loading && <Loader />}

      {/* SEARCH + MONTH FILTER BAR */}
      <div className="px-4 pt-8 flex justify-between items-center">
        {/* LEFT - SEARCH */}
        <input
          type="text"
          placeholder="Search invoices"
          className="border p-2 rounded-md shadow-sm w-1/2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* RIGHT - MONTH SELECT */}
        <select
          className="border p-2 ml-3 rounded-md shadow-sm w-40 bg-white cursor-pointer"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          <option value="">All Months</option>
          {monthOptions.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>

      {/* REFRESH + ADMIN MODE */}
      <div className="px-4 pt-6 flex justify-end">
        <button
          className="bg-indigo-500 hover:bg-indigo-700 text-white font-light py-2 px-5 rounded-lg transition-colors duration-300 flex items-center gap-2 mr-4"
          onClick={fetchInvoiceRecords}
        >
          Refresh Records
        </button>

        <button
          className="bg-indigo-500 hover:bg-indigo-700 text-white font-extralight py-2 px-2 rounded-lg transition-colors duration-300 flex items-center gap-2"
          onClick={() => setAdminMode(!adminMode)}
        >
          {adminMode ? 'Disable Admin Mode' : 'Admin Mode'}
        </button>
      </div>

      {/* DATA TABLE */}
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
