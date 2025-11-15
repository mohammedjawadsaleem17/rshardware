import { useContext } from 'react';
import { MainContext } from './Invoice';
import DatePicker from 'react-datepicker';
import { motion } from 'framer-motion';

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

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
      <motion.h1
        variants={itemVariants}
        className="text-2xl font-bold text-gray-800 border-b-2 border-indigo-200 pb-2 mb-2"
      >
        Particulars
      </motion.h1>
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
      </div>
    </div>
  );
}
