import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import Loader from '../Loader/Loader';

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [record, setRecord] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  async function fetchInvoiceRecords() {
    setLoading(true);
    const res = await fetch('https://rshardware.up.railway.app/users');
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
      selector: (row) => row.invoiceId,
    },
    {
      name: 'Customer Name',
      selector: (row) => row.name,
    },
    {
      name: 'Customer Email',
      selector: (row) => row.email,
    },
    {
      name: 'Customer Phone Number',
      selector: (row) => row.phoneNumber,
    },
    {
      name: 'Total Amount',
      selector: (row) => row.totalAmount,
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
  return (
    <div>
      {loading && <Loader />}
      <div className="px-4 pt-8 flex justify-end">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-light py-3 px-6 rounded-lg transition-colors duration-300 flex items-center gap-2"
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
        title="Invoice Records"
      />
    </div>
  );
}
