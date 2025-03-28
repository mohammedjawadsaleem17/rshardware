import { addDays } from 'date-fns';
import React, { useRef, useState } from 'react';

export default function Customer() {
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
  return (
    <div className="w-full">
      <h2>Customer Details</h2>
      <div className="grid grid-cols-2 gap-4">sfv</div>
      <div className=" grid grid-cols-2 gap-4">coihv</div>
    </div>
  );
}
