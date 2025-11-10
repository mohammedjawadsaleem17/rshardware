/* eslint-disable */
import {
  Document,
  Image,
  Page,
  PDFDownloadLink,
  Text,
  View,
} from '@react-pdf/renderer';
import { styles } from './style';
import logo from '../../components/assets/logo.png';
import qr from '../../components/assets/qr.png';
import { ToastContainer, toast } from 'react-toastify';
import { useState } from 'react';
import Loader from '../Loader/Loader';

function numberToWords(num) {
  if (num === 0) return 'Zero';

  const belowTwenty = [
    'Zero',
    'One',
    'Two',
    'Three',
    'Four',
    'Five',
    'Six',
    'Seven',
    'Eight',
    'Nine',
    'Ten',
    'Eleven',
    'Twelve',
    'Thirteen',
    'Fourteen',
    'Fifteen',
    'Sixteen',
    'Seventeen',
    'Eighteen',
    'Nineteen',
  ];
  const tens = [
    '',
    '',
    'Twenty',
    'Thirty',
    'Forty',
    'Fifty',
    'Sixty',
    'Seventy',
    'Eighty',
    'Ninety',
  ];
  const thousandUnits = ['', 'Thousand', 'Million', 'Billion'];

  function convertChunk(num) {
    if (num === 0) return '';
    if (num < 20) return belowTwenty[num];
    if (num < 100)
      return (
        tens[Math.floor(num / 10)] +
        (num % 10 !== 0 ? ' ' + belowTwenty[num % 10] : '')
      );
    return (
      belowTwenty[Math.floor(num / 100)] +
      ' Hundred' +
      (num % 100 !== 0 ? ' ' + convertChunk(num % 100) : '')
    );
  }

  function convertInteger(num) {
    let word = '';
    let unitIndex = 0;
    while (num > 0) {
      const chunk = num % 1000;
      if (chunk !== 0) {
        word =
          convertChunk(chunk) +
          (thousandUnits[unitIndex] ? ' ' + thousandUnits[unitIndex] : '') +
          (word ? ' ' + word : '');
      }
      num = Math.floor(num / 1000);
      unitIndex++;
    }
    return word.trim() + ' Only.';
  }

  const [integerPart] = parseFloat(num).toFixed(2).split('.');
  return convertInteger(parseInt(integerPart));
}

export default function FinalInvoice({
  customerDetails,
  items,
  total,
  invoiceNo,
  setInvoiceNo,
  connection,
  fetchInvoiceNo,
  setCustomerName,
  setCustomerEmail,
  setCustomerPhone,
  setCustomerAddress,
  setCustomerGstin,
  setInvoiceDate,
  setCustomerPlaceOfSupply,
  setDueDate,
  setLineItems,
  invNo,
  setinvNo,
}) {
  const [loading, setLoading] = useState(false);
  const [invoiceReady, setInvoiceReady] = useState(false);

  const handleGenerateInvoice = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://rshardware.up.railway.app/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          invoiceId: invNo,
          invoiceDate: customerDetails?.invoiceDate,
          name: customerDetails?.name,
          email: customerDetails?.email,
          phoneNumber: customerDetails?.phone,
          billingAddress: customerDetails?.customerAddress,
          gstIn: customerDetails?.gstin,
          placeOfSupply: customerDetails?.customerPlaceOfSupply,
          dueDate: customerDetails?.dueDate,
          items: customerDetails?.lineItems,
        }),
      });
      await response.json();
      toast.success(`Invoice Generated for ${customerDetails?.name}`);
      setInvoiceReady(true);
    } catch (error) {
      console.error('Error updating invoice in database:', error);
      toast.warn('Loading, Please wait for a Minute');
      const response = await fetch(
        'https://rshardware-backend.onrender.com/users',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            invoiceId: invNo,
            invoiceDate: customerDetails?.invoiceDate,
            name: customerDetails?.name,
            email: customerDetails?.email,
            phoneNumber: customerDetails?.phone,
            billingAddress: customerDetails?.customerAddress,
            gstIn: customerDetails?.gstin,
            placeOfSupply: customerDetails?.customerPlaceOfSupply,
            dueDate: customerDetails?.dueDate,
            items: customerDetails?.lineItems,
          }),
        }
      );
      await response.json();
      setInvoiceReady(true);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    setInvoiceReady(false);
    toast.info('Reset to default');
    await fetchInvoiceNo();
    setCustomerName('');
    setCustomerEmail('');
    setCustomerPhone('');
    setCustomerAddress('');
    setCustomerGstin('');
    setCustomerPlaceOfSupply('');
    setInvoiceDate('');
    setDueDate('');

    setLineItems([
      {
        id: 1,
        sno: 1,
        item: '',
        hsn: '',
        rate: '',
        qty: '',
        taxableValue: 0,
        taxAmount: 0,
        total: 0,
      },
    ]);
  };

  const taxAmt = items?.reduce(
    (acc, item) => acc + parseFloat(item.taxableValue || 0),
    0
  );
  const cgst = (taxAmt / 100) * 9;
  const totalPayable = taxAmt + cgst * 2;
  const wordsAmount = numberToWords(totalPayable);

  const InvoicePDF = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Image src={logo} style={styles.logo} />
          <View>
            <Text style={styles.heading}>
              Tax Invoice/Bill of Supply/Cash Memo
            </Text>
            <Text>(Original for Recipient)</Text>
          </View>
        </View>

        <View style={styles.soldByContainer}>
          <View style={styles.soldBy}>
            <Text style={styles.rs}>Sold By:</Text>
            <Text style={styles.rspace}>R S HARDWARE GLASS & ELECTRICALS</Text>
            <Text>
              Building No-3/7, Shop No-6
              Ground Floor
              Gowri Shankar Complex 
              Arekere Main Road 
              Bengaluru PIN: 560076
            </Text>
            <Text>Mob: 8147465517</Text>
            <Text>Email: abdulfahad1436@gmail.com</Text>
            <Text style={styles.pan}>PAN No:</Text>
            <Text style={styles.heading}>
              GST No: <Text style={styles.sr}>29FKLPP1223G1ZO</Text>
            </Text>
            <Text style={styles.invoice}>
              Invoice Number: <Text style={styles.sr}>{invNo}</Text>
            </Text>
            <Text style={styles.pos}>
              Invoice Date:{' '}
              <Text style={styles.sr}>{customerDetails?.invoiceDate}</Text>
            </Text>
            <Text style={styles.pos}>
              Due Date:{' '}
              <Text style={styles.sr}>{customerDetails?.dueDate}</Text>
            </Text>
          </View>

          <View style={styles.soldBy}>
            <Text style={styles.rs}>Billing Address:</Text>
            <Text>{customerDetails?.name}</Text>
            <Text>{customerDetails?.address}</Text>
            <Text>GST No: {customerDetails?.gstin?.toUpperCase()}</Text>
            <Text>Email: {customerDetails?.email}</Text>
            <Text>Ph: {customerDetails?.phone}</Text>
            <Text>Shipping Address: {customerDetails?.address}</Text>
            <Text>Place of Supply: {customerDetails?.place}</Text>
          </View>
        </View>

        {/* Table Header */}
        <View style={[styles.row, styles.bold]}>
          <Text style={styles.cell}>Sl No.</Text>
          <Text style={[styles.cell, styles.descriptionCell]}>Item</Text>
          <Text style={styles.cell}>HSN</Text>
          <Text style={styles.cell}>Rate</Text>
          <Text style={styles.cell}>QTY</Text>
          <Text style={styles.cell}>Taxable</Text>
          <Text style={styles.cell}>Tax</Text>
          <Text style={styles.cell}>Total</Text>
        </View>

        {/* Table Rows */}
        {items?.map((item) => (
          <View style={styles.row} key={item.sno}>
            <Text style={styles.cell}>{item.sno}</Text>
            <Text style={[styles.cell, styles.descriptionCell]}>
              {item.item}
            </Text>
            <Text style={styles.cell}>{item.hsn?.slice(0, 7)}</Text>
            <Text style={styles.cell}>{parseFloat(item.rate).toFixed(2)}</Text>
            <Text style={styles.cell}>{item.qty}</Text>
            <Text style={styles.cell}>
              {parseFloat(item.taxableValue).toFixed(2)}
            </Text>
            <Text style={styles.cell}>
              {parseFloat(item.taxAmount).toFixed(2)}
            </Text>
            <Text style={styles.cell}>{parseFloat(item.total).toFixed(2)}</Text>
          </View>
        ))}

        {/* Totals */}
        <View>
          <Text style={styles.totalText}>
            Taxable Amount: {taxAmt.toFixed(2)}
          </Text>
          <Text style={styles.totalText}>CGST (9.0%): {cgst.toFixed(2)}</Text>
          <Text style={styles.totalText}>SGST (9.0%): {cgst.toFixed(2)}</Text>
          <Text style={styles.total}>
            Total (INR): {totalPayable.toFixed(2)}
          </Text>
          <Text style={{ marginTop: 20, fontSize: 10 }}>
            Amount in Words: <Text style={styles.rs}>{wordsAmount}</Text>
          </Text>
        </View>

        {/* Bank */}
        <View style={styles.bankContainer}>
          <View style={styles.bankDetails}>
            <Text
              style={{
                marginTop: 20,
                fontSize: 12,
                textDecoration: 'underline',
              }}
            >
              Bank Details:
            </Text>
            <Text>Bank: HDFC BANK</Text>
            <Text>Account: 50200093163651</Text>
            <Text>IFSC: HDFC0002841</Text>
            <Text>Branch: VIJAYA BANK LAYOUT</Text>
            <Image src={qr} style={styles.logo} />
          </View>
          <View style={styles.businessDetails}>
            <Text style={styles.businessName}>
              RS HARDWARE GLASS & ELECTRICALS
            </Text>
          </View>
        </View>

        <View style={{ textAlign: 'center', fontSize: 10 }}>
          <Text>
            This is a computer-generated invoice and does not need a signature.
          </Text>
        </View>
      </Page>
    </Document>
  );

  return (
    <div>
      <ToastContainer />
      {loading && <Loader />}
      <div className="mt-7 space-y-4">
        {!invoiceReady && (
          <button
            onClick={handleGenerateInvoice}
            className="bg-indigo-600 text-white p-3 rounded w-full block text-center font-bold"
          >
            Generate Invoice
          </button>
        )}
        {invoiceReady && (
          <>
            <PDFDownloadLink
              document={<InvoicePDF />}
              fileName={`${invoiceNo}.pdf`}
              className="bg-green-600 text-white p-3 rounded w-full block text-center font-bold my-7"
            >
              {({ loading }) => 'Download Invoice'}
            </PDFDownloadLink>
            <button
              onClick={handleReset}
              className="bg-red-600 text-white p-3 rounded w-full block text-center font-bold "
            >
              Reset to Default
            </button>
          </>
        )}
      </div>
    </div>
  );
}
