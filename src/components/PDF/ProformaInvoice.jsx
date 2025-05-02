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
    else if (num < 20) return belowTwenty[num];
    else if (num < 100)
      return (
        tens[Math.floor(num / 10)] +
        (num % 10 !== 0 ? ' ' + belowTwenty[num % 10] : '')
      );
    else
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

    return word.trim().concat(' Only.');
  }

  const [integerPart] = num.toString().split('.');
  return convertInteger(parseInt(integerPart));
}

export default function ProformaInvoice({ customerDetails, items }) {
  const totalAmount = items?.reduce((acc, item) => acc + Number(item.total), 0);
  const wordsAmount = numberToWords(totalAmount);

  const InvoicePDF = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View>
            <Image src={logo} style={styles.logo} />
          </View>
          <View>
            <Text style={styles.heading}>Proforma Invoice</Text>
            <Text>(Not a Tax Invoice)</Text>
          </View>
        </View>

        <View style={styles.soldByContainer}>
          <View style={styles.soldBy}>
            <Text style={styles.rs}>Prepared By:</Text>
            <Text style={styles.rspace}>R S HARDWARE GLASS & ELECTRICALS</Text>
            <Text>Building No- 3/7, Shop No-6, Ground Floor, Bangalore</Text>
            <Text>Mob: 8147465517</Text>
            <Text>Email: abdulfahad1436@gmail.com</Text>
          </View>

          <View style={styles.soldBy}>
            <Text style={styles.rs}>To:</Text>
            <Text>{customerDetails?.name}</Text>
            <Text>{customerDetails?.address}</Text>
            <Text>Email: {customerDetails?.email}</Text>
            <Text>Ph: {customerDetails?.phone}</Text>
          </View>
        </View>

        <View style={[styles.row, styles.bold]}>
          <Text style={styles.cell}>Sl No.</Text>
          <Text style={[styles.cell, styles.descriptionCell]}>Item</Text>
          <Text style={styles.cell}>Rate</Text>
          <Text style={styles.cell}>Qty</Text>
          <Text style={styles.cell}>Amount</Text>
        </View>

        {items?.map((item) => (
          <View style={styles.row} key={item.sno}>
            <Text style={styles.cell}>{item.sno}</Text>
            <Text style={[styles.cell, styles.descriptionCell]}>
              {item.item}
            </Text>
            <Text style={styles.cell}>{item.rate}</Text>
            <Text style={styles.cell}>{item.qty}</Text>
            <Text style={styles.cell}>{item.total?.toFixed(2)}</Text>
          </View>
        ))}

        <View>
          <Text style={styles.total}>
            Total (INR): {totalAmount.toFixed(2)}
          </Text>
          <Text style={{ marginTop: 10, fontSize: 10 }}>
            Amount in Words: <Text style={styles.rs}>{wordsAmount}</Text>
          </Text>
        </View>

        <View style={{ marginTop: 20, textAlign: 'center', fontSize: 10 }}>
          <Text>
            This is a Proforma Invoice – not valid for tax credit or payment.
          </Text>
        </View>
      </Page>
    </Document>
  );

  return (
    <div className="mt-7">
      <PDFDownloadLink
        document={<InvoicePDF />}
        fileName={`ProformaInvoice-${customerDetails.name}.pdf`}
        className="bg-yellow-600 text-white p-3 rounded w-full block text-center font-bold"
      >
        {({ loading }) =>
          loading ? 'Preparing document...' : 'Download Proforma Invoice'
        }
      </PDFDownloadLink>
    </div>
  );
}
