/* eslint-disable */
import {
  Document,
  Image,
  Page,
  PDFDownloadLink,
  PDFViewer,
  Text,
  View,
} from '@react-pdf/renderer';
import { styles } from './style';
import logo from '../../components/assets/logo.png';
import qr from '../../components/assets/qr.png';
import { ToastContainer, toast } from 'react-toastify';
import { useState } from 'react';
import Loader from '../Loader/Loader';

const sampleData = {
  sellerDetails: {
    name: 'CAUVERY TRADERS',
    address:
      '# 3, 1st Cross, Mahadeshwara Layout,\n16th Main, BTM Layout, 2nd Stage,\nBangalore -560076',
    phone: 'PH - 9845645910, 9008845910',
    gstin: '29AAFFC1847A1ZS',
    state: 'Karnataka, Code: 29',
    email: 'cauverytraders09@gmail.com',
  },
  buyerDetails: {
    name: 'R S Hardware Glass & Electricals',
    address:
      'Building No-3/7, Shop No-6\nGround Floor\nGown Shankar Complex\nArekere Main Road\nBengaluru- 560076',
    gstin: '29FKLPP1223G1Z0',
    state: 'Karnataka, Code: 29',
  },
  invoiceNo: '6939',
  invoiceDate: '3-Oct-25',
  items: [
    {
      slNo: 1,
      description: 'Birla White Cementt 1 Kg',
      hsn: '25232100',
      gstRate: '18 %',
      quantity: '25 Piece',
      rate: '26.80',
      ratePerPiece: '22.71',
      amount: '567.75',
    },
    {
      slNo: 2,
      description: 'White Plaster of Paris 1 Kg',
      hsn: '25201020',
      gstRate: '5 %',
      quantity: '25 Piece',
      rate: '15.00',
      ratePerPiece: '14.29',
      amount: '357.25',
    },
  ],
  taxBreakdown: {
    cgst9: { rate: '9%', amount: '51.10' },
    sgst9: { rate: '9 %', amount: '51.10' },
    cgst2_5: { rate: '2.50 %', amount: '8.93' },
    sgst2_5: { rate: '2.50 %', amount: '8.93' },
    roundOff: '(-)0.06',
  },
  subtotal: '925.00',
  totalAmount: '1,045.00',
  amountInWords: 'Indian Rupees One Thousand Forty Five Only',
  taxSummary: [
    {
      hsn: '25232100',
      taxableValue: '567.75',
      cgstRate: '9%',
      cgstAmount: '51.10',
      sgstRate: '9%',
      sgstAmount: '51.10',
      totalTax: '102.20',
    },
    {
      hsn: '25201020',
      taxableValue: '357.25',
      cgstRate: '2.50%',
      cgstAmount: '8.93',
      sgstRate: '2.50%',
      sgstAmount: '8.93',
      totalTax: '17.86',
    },
  ],
  totalTaxable: '925.00',
  totalTax: '120.06',
  taxAmountWords: 'Indian Rupees One Hundred Twenty and Six paise Only',
  bankDetails: {
    name: 'IDBI BANK',
    accountNo: '0551653800000073',
    ifsc: 'IBKL0000551',
    branch: 'C/C-A/C',
    address: 'Gandhinagar & IBKL0000551',
  },
};

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

  const InvoicePDF = ({ data = sampleData }) => (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Add Tax Invoice and ORIGINAL FOR RECIPIENT */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 10,
          }}
        >
          <Text
            style={{
              textAlign: 'center',
              fontSize: 12, // Font size for Tax Invoice
              fontWeight: 'bold',
            }}
          >
            Tax Invoice
          </Text>
        </View>
        <View
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            margin: 10,
          }}
        >
          <Text
            style={{
              textAlign: 'right',
              fontSize: 8, // Smaller than Tax Invoice
              fontStyle: 'italic', // Italic style
            }}
          >
            (ORIGINAL FOR RECIPIENT)
          </Text>
        </View>

        {/* Header Section */}
        <View style={styles.headerSection}>
          {/* Top Section - Seller and Invoice Info */}
          <View style={styles.headerTop}>
            {/* Seller Details */}
            <View style={styles.sellerSection}>
              <Text style={styles.companyName}>{data.sellerDetails.name}</Text>
              <Text style={styles.normalText}>
                {data.sellerDetails.address}
              </Text>
              <Text style={styles.normalText}>{data.sellerDetails.phone}</Text>
              <Text style={styles.normalText}>
                GSTIN/UIN: {data.sellerDetails.gstin}
              </Text>
              <Text style={styles.normalText}>
                State Name : {data.sellerDetails.state}
              </Text>
              <Text style={styles.normalText}>
                E-Mail : {data.sellerDetails.email}
              </Text>
            </View>

            {/* Invoice Info Grid */}
            <View style={styles.invoiceInfoSection}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Invoice No.</Text>
                <Text style={styles.infoValue}>{data.invoiceNo}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Delivery Note</Text>
                <Text style={styles.infoValue}></Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Reference No. & Date.</Text>
                <Text style={styles.infoValue}></Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Buyer's Order No.</Text>
                <Text style={styles.infoValue}></Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Dispatch Doc No.</Text>
                <Text style={styles.infoValue}></Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Dispatched through</Text>
                <Text style={styles.infoValue}></Text>
              </View>
              <View style={styles.infoRowNoBorder}>
                <Text style={styles.infoLabel}>Terms of Delivery</Text>
                <Text style={styles.infoValue}></Text>
              </View>
            </View>
          </View>

          {/* Invoice Info Right Side */}
          <View style={styles.headerTop}>
            <View style={[styles.sellerSection, { borderRightWidth: 0 }]}>
              <Text style={styles.boldText}>Buyer (Bill to)</Text>
            </View>
            <View
              style={[
                styles.invoiceInfoSection,
                { justifyContent: 'space-between' },
              ]}
            >
              <View style={[styles.infoRow, { marginTop: 0 }]}>
                <Text style={styles.infoLabel}>Dated</Text>
                <Text style={styles.infoValue}>{data.invoiceDate}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Mode/Terms of Payment</Text>
                <Text style={styles.infoValue}></Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Other References</Text>
                <Text style={styles.infoValue}></Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Dated</Text>
                <Text style={styles.infoValue}></Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Delivery Note Date</Text>
                <Text style={styles.infoValue}></Text>
              </View>
              <View style={[styles.infoRowNoBorder, { borderBottomWidth: 0 }]}>
                <Text style={styles.infoLabel}>Destination</Text>
                <Text style={styles.infoValue}></Text>
              </View>
            </View>
          </View>
        </View>

        {/* Items Table */}
        <View style={styles.table}>
          {/* Table Header */}
          <View style={styles.tableHeader}>
            <Text style={[styles.colSlNo, { borderLeftWidth: 1 }]}>
              Sl{'\n'}No
            </Text>
            <Text style={styles.colDescription}>Description of Goods</Text>
            <Text style={[styles.colHSN]}>HSN/SAC</Text>
            <Text style={[styles.colGST]}>GST{'\n'}Rate</Text>
            <Text style={[styles.colQuantity]}>Quantity</Text>
            <Text
              style={[
                styles.colRate,
                { width: 100, borderRightWidth: 1, marginLeft: -5 },
              ]}
            >
              Rate{'\n'}(Incl. of Tax)
            </Text>
            <Text style={[styles.colPer, { borderRightWidth: 1 }]}>per</Text>
            <Text style={[styles.colAmount, { borderRightWidth: 1 }]}>
              Amount
            </Text>
          </View>

          {/* Table Rows */}
          {data.items.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={[styles.colSlNo, { borderLeftWidth: 1 }]}>
                {item.slNo}
              </Text>
              <Text style={styles.colDescription}>{item.description}</Text>
              <Text
                style={[
                  styles.colHSN,
                  { textAlign: 'center', paddingHorizontal: 1 },
                ]}
              >
                {item.hsn}
              </Text>
              <Text style={styles.colGST}>{item.gstRate}</Text>
              <Text style={styles.colQuantity}>{item.quantity}</Text>
              <Text style={styles.colRate}>{item.rate}</Text>
              <Text style={[styles.colRatePer, { borderRightWidth: 1 }]}>
                {item.ratePerPiece}
              </Text>
              <Text style={[styles.colPer, { borderRightWidth: 1 }]}>
                Piece
              </Text>
              <Text style={[styles.colAmount, { borderRightWidth: 1 }]}>
                {item.amount}
              </Text>
            </View>
          ))}

          {/* Tax Breakdown Rows */}
          <View style={styles.taxBreakdownSection}>
            <View style={styles.taxRow}>
              <Text style={styles.taxLabel}>CGST 9%</Text>

              <Text style={styles.taxValue}>
                {data.taxBreakdown.cgst9.amount}
              </Text>
            </View>
            <View style={styles.taxRow}>
              <Text style={styles.taxLabel}>SGST 9%</Text>

              <Text style={styles.taxValue}>
                {data.taxBreakdown.sgst9.amount}
              </Text>
            </View>

            <View style={[styles.taxRow, { justifyContent: 'flex-start' }]}>
              <Text style={[styles.taxLabel, { marginLeft: 366 }]}>
                Round Off
              </Text>
              <Text style={[styles.taxValue, { marginLeft: 'auto' }]}>
                {data.taxBreakdown.roundOff}
              </Text>
            </View>
          </View>
        </View>

        {/* Total and Amount in Words */}
        <View
          style={[
            styles.footerSection,
            { borderLeftWidth: 1, borderRightWidth: 1, borderColor: '#000' },
          ]}
        >
          <View style={styles.amountInWords}>
            <Text style={styles.boldText}>Amount Chargeable (in words)</Text>
            <Text style={[styles.boldText, { fontSize: 9, marginTop: 3 }]}>
              {data.amountInWords}
            </Text>
          </View>
          <View style={styles.totalSection}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalLabel}>50 Piece</Text>
            </View>
            <View style={[styles.totalRow, { marginTop: 10 }]}>
              <Text style={styles.totalAmount}>₹ {data.totalAmount}</Text>
            </View>
            <Text
              style={[styles.normalText, { textAlign: 'right', fontSize: 7 }]}
            >
              E. & O.E
            </Text>
          </View>
        </View>

        {/* Tax Summary Table */}
        <View
          style={[
            styles.taxSummarySection,
            { borderLeftWidth: 1, borderRightWidth: 1, borderColor: '#000' },
          ]}
        >
          {/* Header */}
          <View style={styles.taxSummaryHeader}>
            <Text style={styles.taxColHSN}>HSN/SAC</Text>
            <Text style={styles.taxColTaxable}>Taxable{'\n'}Value</Text>
            <View style={styles.taxColCGST}>
              <Text
                style={[styles.boldText, { textAlign: 'center', padding: 2 }]}
              >
                CGST
              </Text>
              <View style={styles.taxSubCol}>
                <Text
                  style={[
                    styles.taxSubColRate,
                    { borderTopWidth: 1, borderColor: '#000' },
                  ]}
                >
                  Rate
                </Text>
                <Text
                  style={[
                    styles.taxSubColAmount,
                    { borderTopWidth: 1, borderColor: '#000' },
                  ]}
                >
                  Amount
                </Text>
              </View>
            </View>
            <View style={styles.taxColSGST}>
              <Text
                style={[styles.boldText, { textAlign: 'center', padding: 2 }]}
              >
                SGST/UTGST
              </Text>
              <View style={styles.taxSubCol}>
                <Text
                  style={[
                    styles.taxSubColRate,
                    { borderTopWidth: 1, borderColor: '#000' },
                  ]}
                >
                  Rate
                </Text>
                <Text
                  style={[
                    styles.taxSubColAmount,
                    { borderTopWidth: 1, borderColor: '#000' },
                  ]}
                >
                  Amount
                </Text>
              </View>
            </View>
            <Text style={styles.taxColTotal}>Total{'\n'}Tax Amount</Text>
          </View>

          {/* Data Rows */}
          {data.taxSummary.map((item, index) => (
            <View key={index} style={styles.taxSummaryRow}>
              <Text style={styles.taxColHSN}>{item.hsn}</Text>
              <Text style={styles.taxColTaxable}>{item.taxableValue}</Text>
              <View style={styles.taxColCGST}>
                <View style={styles.taxSubCol}>
                  <Text style={styles.taxSubColRate}>{item.cgstRate}</Text>
                  <Text style={styles.taxSubColAmount}>{item.cgstAmount}</Text>
                </View>
              </View>
              <View style={styles.taxColSGST}>
                <View style={styles.taxSubCol}>
                  <Text style={styles.taxSubColRate}>{item.sgstRate}</Text>
                  <Text style={styles.taxSubColAmount}>{item.sgstAmount}</Text>
                </View>
              </View>
              <Text style={styles.taxColTotal}>{item.totalTax}</Text>
            </View>
          ))}

          {/* Total Row */}
          <View style={styles.taxSummaryRow}>
            <Text style={[styles.taxColHSN, { fontWeight: 'bold' }]}>
              Total
            </Text>
            <Text style={[styles.taxColTaxable, { fontWeight: 'bold' }]}>
              {data.totalTaxable}
            </Text>
            <View style={styles.taxColCGST}>
              <View style={styles.taxSubCol}>
                <Text style={styles.taxSubColRate}></Text>
                <Text style={[styles.taxSubColAmount, { fontWeight: 'bold' }]}>
                  60.03
                </Text>
              </View>
            </View>
            <View style={styles.taxColSGST}>
              <View style={styles.taxSubCol}>
                <Text style={styles.taxSubColRate}></Text>
                <Text style={[styles.taxSubColAmount, { fontWeight: 'bold' }]}>
                  60.03
                </Text>
              </View>
            </View>
            <Text style={[styles.taxColTotal, { fontWeight: 'bold' }]}>
              {data.totalTax}
            </Text>
          </View>
        </View>

        {/* Tax Amount in Words */}
        <View style={[styles.footerSection, { borderBottomWidth: 0 }]}>
          <View style={styles.amountInWords}>
            <Text style={styles.normalText}>
              Tax Amount (in words) :{' '}
              <Text style={styles.boldText}>{data.taxAmountWords}</Text>
            </Text>
          </View>
        </View>

        {/* Bottom Section - Declaration and Signature */}

        <View style={styles.bottomSection}>
          <View style={[styles.totalSection]}>
            <Text style={[styles.boldText, { fontSize: 8 }]}>
              Company's Bank Details
            </Text>
            <Text style={styles.normalText}>
              Bank Name : {data.bankDetails.name}
            </Text>
            <Text style={styles.normalText}>
              A/c No. : {data.bankDetails.accountNo}
            </Text>
            <Text style={styles.normalText}>
              Branch & IFS Code : {data.bankDetails.branch}
              {'\n'}
              {data.bankDetails.ifsc}
              {'\n'}
              {data.bankDetails.address}
            </Text>
          </View>
          <View style={styles.bankSection}>
            <Text style={styles.boldText}>Declaration</Text>
            <Text style={styles.declarationText}>
              We declare that this Invoice shows the actual price of the goods
              described and that all particulars are true and correct.
            </Text>
          </View>
          <View
            style={[
              styles.signatureSection,
              { borderTopWidth: 1, borderColor: '#000', borderRightWidth: 1 },
            ]}
          >
            {' '}
            {/* Added horizontal and vertical lines */}
            <Text style={styles.signatureText}>
              for {data.sellerDetails.name}
            </Text>
            <Text style={[styles.normalText, { marginTop: 40 }]}>
              Authorised Signatory
            </Text>
          </View>
        </View>

        {/* Jurisdiction */}
        <View style={{ borderTopWidth: 1, borderColor: '#000', paddingTop: 5 }}>
          <Text style={styles.jurisdictionText}>
            SUBJECT TO BENGALURU JURISDICTION
          </Text>
          <Text style={styles.computerGenerated}>
            This is a Computer Generated Invoice
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
            {/* Inline preview for testing without downloading */}
            <div style={{ height: '800px', margin: '1rem 0' }}>
              <PDFViewer style={{ width: '100%', height: '100%' }}>
                <InvoicePDF />
              </PDFViewer>
            </div>

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
