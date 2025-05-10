/* InvoicePDF.js */
import { Document, Image, Page, Text, View } from '@react-pdf/renderer';
import { styles } from './style';
import logo from '../../components/assets/logo.png';
import qr from '../../components/assets/qr.png';

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

  const [integerPart] = num.toString().split('.');
  return convertInteger(parseInt(integerPart));
}

export default function InvoicePDF({ userData }) {
  const connection = '';
  const items = [];
  const invoiceNo = '';
  const customerDetails = {};

  const taxAmt = 10 / 1.18;
  const cgst = (taxAmt / 100) * 9;
  const totalPayable = taxAmt + cgst * 2;
  const wordsAmount = numberToWords(totalPayable);
  console.log('--hrwehfoqehvoichqoih----', userData.items);

  console.log('PDF WAS CALLEDee', userData);
  return (
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
            <Text>Building No-3/7, Shop No-6, Ground Floor...</Text>
            <Text>Mob: 8147465517</Text>
            <Text>Email: abdulfahad1436@gmail.com</Text>
            <Text style={styles.pan}>PAN No: -</Text>
            <Text style={styles.heading}>
              GST No: <Text style={styles.sr}>29FKLPP1223G1ZO</Text>
            </Text>
            <Text style={styles.invoice}>
              Invoice Number:{' '}
              <Text style={styles.sr}> {userData?.invoiceId}</Text>
            </Text>
            <Text style={styles.pos}>
              Invoice Date:{' '}
              <Text style={styles.sr}> {userData?.invoiceDate}</Text>
            </Text>
            <Text style={styles.pos}>
              Due Date: <Text style={styles.sr}> {userData?.dueDate}</Text>
            </Text>
          </View>
          <View style={styles.soldBy}>
            <Text style={styles.rs}>Billing Address: </Text>
            <Text>{userData?.name}</Text>
            <Text>{userData?.billingAddress}</Text>
            <Text>GST No: {userData?.gstIn?.toUpperCase()}</Text>
            <Text>Email: {userData?.email}</Text>
            <Text>Ph: {userData?.phoneNumber}</Text>
            <Text>Shipping Address: {userData?.billingAddress}</Text>
            <Text>Place of Supply: {userData?.placeOfSupply}</Text>
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

        {/* Table Rows
        {items?.map((item) => (
          <View style={styles.row} key={item.sno}>
            <Text style={styles.cell}>{item.sno}</Text>
            <Text style={[styles.cell, styles.descriptionCell]}>
              {item.item}
            </Text>
            <Text style={styles.cell}>{item.hsn?.slice(0, 7)}</Text>
            <Text style={styles.cell}>{item.rate}</Text>
            <Text style={styles.cell}>{item.qty}</Text>
            <Text style={styles.cell}>{item.taxableValue?.toFixed(2)}</Text>
            <Text style={styles.cell}>{item.taxAmount?.toFixed(2)}</Text>
            <Text style={styles.cell}>{item.total?.toFixed(2)}</Text>
          </View>
        ))} */}

        {items?.map((item) => (
          <View style={styles.row} key={item.sno}>
            <Text style={styles.cell}>{item.sno}</Text>
            <Text style={[styles.cell, styles.descriptionCell]}>
              {item.item}
            </Text>
            <Text style={styles.cell}>{item.hsn?.slice(0, 7)}</Text>
            <Text style={styles.cell}>{item.rate}</Text>
            <Text style={styles.cell}>{item.qty}</Text>
            <Text style={styles.cell}>{item.taxableValue?.toFixed(2)}</Text>
            <Text style={styles.cell}>{item.taxAmount?.toFixed(2)}</Text>
            <Text style={styles.cell}>{item.total?.toFixed(2)}</Text>
          </View>
        ))}

        {/* Totals */}
        <View>
          <Text style={styles.totalText}>
            Taxable Amount: {taxAmt?.toFixed(2)}
          </Text>
          <Text style={styles.totalText}>CGST (9.0%): {cgst?.toFixed(2)}</Text>
          <Text style={styles.totalText}>SGST (9.0%): {cgst?.toFixed(2)}</Text>
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
}
