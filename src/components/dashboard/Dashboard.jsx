import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import Loader from '../Loader/Loader';
import { Link } from 'react-router-dom';

const customStyles = {
  headCells: {
    style: {
      backgroundColor: '#6366F1', // Tailwind's indigo-500
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
      color: '#111827', // Tailwind gray-900
      marginBottom: '1rem',
    },
  },
};

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [record, setRecord] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  async function fetchInvoiceRecords() {
    setLoading(true);
    // const res = await fetch('https://rshardware.up.railway.app/users');
    const res = await fetch('http://localhost:8080/users');
    const data = await res.json();
    console.log(data);
    setRecord(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchInvoiceRecords();
  }, []);

  const columns = [
    {
      name: 'Invoice ID',
      selector: (row) => (
        <Link
          to={`/dashboard/${row._id}`}
          className="underline text-indigo-400 break-all"
        >
          {row.invoiceId}
        </Link>
      ),
      sortable: true,
      wrap: true,
    },
    {
      name: 'Customer Name',
      selector: (row) => row.name,
      sortable: true,
      wrap: true,
    },
    {
      name: 'Customer Email',
      selector: (row) => row.email,
      sortable: true,
      wrap: true,
    },
    {
      name: 'Customer Phone Number',
      selector: (row) => row.phoneNumber,
      sortable: true,
      wrap: true,
    },
  ];

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

  console.log(filteredData);
  return (
    <div className="mx-auto px-5">
      {loading && <Loader />}
      <div className="px-4 pt-8 flex justify-end">
        <button
          className="bg-indigo-500 hover:bg-indigo-700 text-white font-light py-2 px-5 rounded-lg transition-colors duration-300 flex items-center gap-2"
          onClick={fetchInvoiceRecords}
        >
          Refresh Records
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
