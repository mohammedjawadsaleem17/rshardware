import { useContext } from 'react';
import { MainContext } from './Invoice';
import DatePicker from 'react-datepicker';

export default function FinalDetails() {
  const {
    customerName,
    setCustomerName,
    invoiceDate,
    setInvoiceDate,
    dueDate,
    setDueDate,
    lineItems,
    setLineItems,
    invoiceNumber,
    setInvoiceNumber,
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
  } = useContext(MainContext);
  return (
    <div>
      <h1 className="text-xl font-bold mb-0 mt-8 underline mb-6">Summary</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="...">
          <b>{customerName}</b>
          <p>GSTIN: {customerGstin}</p>
          <p>{customerPhone}</p>
          <p>{customerEmail}</p>
          <p className="mt-4">Place of Supply: {customerPlaceOfSupply}</p>
        </div>
        <div className="...">
          <h1>Billing Address:</h1>
          <p>{customerAddress}</p>
        </div>
        <div className="...">
          <div className="flex flex-col md:flex-row md:items-center">
            <label className="font-light mb-2 md:mb-0 md:mr-2 w-33">
              Due Date:
            </label>
            <DatePicker
              selected={dueDate}
              onChange={(date) => setDueDate(date)}
              dateFormat="dd/MM/yyyy"
              className="border border-gray-300 p-2 rounded w-full md:w-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
