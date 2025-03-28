/* eslint-disable no-unused-vars */
import React, { createContext, useContext } from 'react';
import InvoiceTemplate from './InvoiceTemplate';
import InvoiceGenerator from './InvoiceGenerator';

export const MainContext = createContext();

export default function Invoice() {
  const [customerName, setCustomerName] = React.useState('');
  const [invoiceNumber, setInvoiceNumber] = React.useState('');
  const [customerEmail, setCustomerEmail] = React.useState('');
  const [customerPhone, setCustomerPhone] = React.useState('');
  const [customerAddress, setCustomerAddress] = React.useState('');
  const [customerGstin, setCustomerGstin] = React.useState('');
  const [customerPlaceOfSupply, setCustomerPlaceOfSupply] = React.useState('');
  const [invoiceDate, setInvoiceDate] = React.useState(new Date());
  const [dueDate, setDueDate] = React.useState(new Date());

  return (
    <div>
      <MainContext.Provider
        value={{
          invoiceNumber,
          setInvoiceNumber,
          customerName,
          setCustomerName,
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
          invoiceDate,
          setInvoiceDate,
          dueDate,
          setDueDate,
        }}
      >
        <InvoiceGenerator />
      </MainContext.Provider>
    </div>
  );
}

