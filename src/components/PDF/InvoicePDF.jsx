/* InvoicePDF.js */
import { Document, Image, Page, Text, View } from '@react-pdf/renderer';
import { styles } from './style';
import { newStyle } from './newStyles';
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
    let word = '',
      unitIndex = 0;
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
  const items = userData?.items || [];

  // Convert and round amounts
  const taxAbleAmount = items.reduce(
    (acc, ele) => acc + Number(ele?.taxableValue || 0),
    0
  );
  const taxAmt = items.reduce(
    (acc, ele) => acc + Number(ele?.taxAmount || 0),
    0
  );
  const cgst = taxAmt / 2;
  const sgst = taxAmt / 2;
  const totalPayable = taxAbleAmount + taxAmt;
  const wordsAmount = numberToWords(totalPayable);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Image src={logo} style={styles.logo} />
          <View>
            <Text style={styles.heading}>
              Tax Invoice/Bill of Supply/Cash Memo
            </Text>
            <Text>(Original for Recipient)</Text>
          </View>
        </View>

        {/* Seller and Buyer Info */}
        <View style={styles.soldByContainer}>
          <View style={styles.soldBy}>
            <Text style={styles.rs}>Sold By:</Text>
            <Text style={styles.rspace}>R S HARDWARE GLASS & ELECTRICALS</Text>
            <Text>
               Building No- 3/7, Shop No-6, Ground Floor, Gowri Shankar Complex,
              Arekere Main Road, Bengaluru, Karnataka, PIN: 560076
            </Text>
            <Text>Mob: 8147465517</Text>
            <Text>Email: abdulfahad1436@gmail.com</Text>
            <Text style={styles.pan}>PAN No: -</Text>
            <Text>GST No: 29FKLPP1223G1ZO</Text>
            <Text>Invoice Number: {userData?.invoiceId}</Text>
            <Text>Invoice Date: {userData?.invoiceDate}</Text>
            <Text>Due Date: {userData?.dueDate}</Text>
          </View>

          <View style={styles.soldBy}>
            <Text style={styles.rs}>Billing Address:</Text>
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

        {/* Table Rows */}
        {items.map((item, index) => (
          <View style={newStyle.row} key={item.id || index}>
            <Text style={newStyle.cell}>{index + 1}</Text>
            <Text style={[newStyle.cell, newStyle.descriptionCell]}>
              {item.item}
            </Text>
            <Text style={newStyle.cell}>{item.hsn}</Text>
            <Text style={newStyle.cell}>{Number(item.rate).toFixed(2)}</Text>
            <Text style={newStyle.cell}>{item.qty}</Text>
            <Text style={newStyle.cell}>
              {Number(item.taxableValue).toFixed(2)}
            </Text>
            <Text style={newStyle.cell}>
              {Number(item.taxAmount).toFixed(2)}
            </Text>
            <Text style={newStyle.cell}>{Number(item.total).toFixed(2)}</Text>
          </View>
        ))}

        {/* Totals */}
        <View>
          <Text style={styles.totalText}>
            Taxable Amount: {taxAbleAmount.toFixed(2)}
          </Text>
          <Text style={styles.totalText}>CGST (9.0%): {cgst.toFixed(2)}</Text>
          <Text style={styles.totalText}>SGST (9.0%): {sgst.toFixed(2)}</Text>
          <Text style={styles.total}>
            Total (INR): {totalPayable.toFixed(2)}
          </Text>
          <Text style={{ marginTop: 20, fontSize: 10 }}>
            Amount in Words: <Text style={styles.rs}>{wordsAmount}</Text>
          </Text>
        </View>

        {/* Bank Info */}
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

        {/* Footer */}
        <View style={{ textAlign: 'center', fontSize: 10 }}>
          <Text>
            This is a computer-generated invoice and does not need a signature.
          </Text>
        </View>
      </Page>
    </Document>
  );
}
