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
      <h1 className="text-xl font-bold mb-0 mt-8 underline">Summary</h1>

      <div className="grid grid-cols-3 gap-4">
        <div className="...">
          <p>{customerName}</p>
          <p>{customerGstin}</p>
          <p>{customerPhone}</p>
          <p>{customerEmail}</p>
          <p className="mt-4">Place of Supply: {customerPlaceOfSupply}</p>
        </div>
        <div className="...">
          <h1>Billing Address:</h1>
          <p>{customerAddress}</p>
        </div>
        <div className="...">
          <div className="flex items-center">
            <label className="font-light w-33">Due Date:</label>
            <DatePicker
              selected={dueDate}
              onChange={(date) => setDueDate(date)}
              dateFormat="dd/MM/yyyy"
              className="border border-gray-300 p-2 rounded"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
