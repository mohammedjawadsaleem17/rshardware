/* eslint-disable no-unused-vars */
import React, { createContext, useContext, useEffect, useState } from 'react';
import InvoiceTemplate from '../../InvoiceTemplate';
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
  const [invoiceNo, setInvoiceNo] = useState('');
  const [isLoading, SetIsLoading] = useState(false);
  const [connection, setConnection] = useState(false);
  const [items, setItems] = useState([]);
  const [invNo, setInvNo] = useState('');
  async function fetchInvoiceNumber() {
    try {
      SetIsLoading(true);
      const res = await fetch('https://rshardware.up.railway.app/users');
      // const res = await fetch('http://localhost:8080/users');
      const data = await res.json();

      setItems(data?.items);
      setConnection(true);
    } catch (e) {
      SetIsLoading(false);
      setConnection(false);
    } finally {
      SetIsLoading(false);
    }
  }

  async function fetchInvoiceNo() {
    try {
      SetIsLoading(true);
      const res = await fetch('https://rshardware.up.railway.app/invoiceId');
      const data = await res.json();
      setInvoiceNo(`INV-${data}`);
      SetIsLoading(false);
      setConnection(true);
    } catch (e) {
      console.log('Error');
    } finally {
      SetIsLoading(false);
    }
  }
  useEffect(() => {
    fetchInvoiceNo();
    fetchInvoiceNumber();
  }, []);

  return (
    <div>
      <MainContext.Provider
        value={{
          invNo,
          setInvNo,
          invoiceNo,
          setInvoiceNo,
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
          isLoading,
          fetchInvoiceNo,
          connection,
          items,
        }}
      >
        <InvoiceGenerator />
      </MainContext.Provider>
    </div>
  );
}
