/* eslint-disable no-unused-vars */
import React, { createContext, useEffect, useState } from 'react';
import InvoiceGenerator from './InvoiceGenerator';

export const MainContext = createContext();

export default function Invoice() {
  // Existing states
  const [customerName, setCustomerName] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerGstin, setCustomerGstin] = useState('');
  const [customerPlaceOfSupply, setCustomerPlaceOfSupply] = useState('');
  const [invoiceDate, setInvoiceDate] = useState(new Date());
  const [dueDate, setDueDate] = useState(new Date());
  const [invoiceNo, setInvoiceNo] = useState('');
  const [invNo, setInvNo] = useState('');
  const [isLoading, SetIsLoading] = useState(false);
  const [connection, setConnection] = useState(false);
  const [items, setItems] = useState([]);

  // ⭐ New Fields

  const [deliveryNote, setDeliveryNote] = useState('');
  const [referenceNo, setReferenceNo] = useState('');
  const [buyersOrderNo, setBuyersOrderNo] = useState('');
  const [dispatchDocNo, setDispatchDocNo] = useState('');
  const [dispatchedThrough, setDispatchedThrough] = useState('');
  const [termsOfDelivery, setTermsOfDelivery] = useState('');
  const [paymentTerms, setPaymentTerms] = useState('');
  const [otherReferences, setOtherReferences] = useState('');
  const [dated, setDated] = useState('');
  const [deliveryNoteDate, setDeliveryNoteDate] = useState('');
  const [destination, setDestination] = useState('');


  return (
    <MainContext.Provider
      value={{
        // Existing exports
        referenceNo,
        setReferenceNo,
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
        connection,
        items,

        // ⭐ New added fields

        deliveryNote,
        setDeliveryNote,

        buyersOrderNo,
        setBuyersOrderNo,
        dispatchDocNo,
        setDispatchDocNo,
        dispatchedThrough,
        setDispatchedThrough,
        termsOfDelivery,
        setTermsOfDelivery,
        paymentTerms,
        setPaymentTerms,
        otherReferences,
        setOtherReferences,
        dated,
        setDated,
        deliveryNoteDate,
        setDeliveryNoteDate,
        destination,
        setDestination,
      }}
    >
      <InvoiceGenerator />
    </MainContext.Provider>
  );
}
