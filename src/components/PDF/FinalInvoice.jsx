/* eslint-disable */
import {
  Document,
  Image,
  Page,
  PDFViewer,
  Text,
  View,
  PDFDownloadLink,
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

    return word.trim();
  }

  // Handling decimal part
  const [integerPart, decimalPart] = num.toString().split('.');
  let result = convertInteger(parseInt(integerPart));

  if (decimalPart) {
    const decimalWords = decimalPart
      .split('')
      .map((digit) => belowTwenty[parseInt(digit)])
      .join(' ');
    result += ` Only.`;
  }

  return result;
}

// Output: Three Hundred Fifty-Six Thousand Five Hundred Ninety-Five And 60/100 (Six Zero)

export default function FinalInvoice({ customerDetails, items }) {
  console.log('Items, ', items);
  console.log('Received Customer Details ', customerDetails);

  const taxAmt = items?.reduce(
    (acc, item) => acc + Number(item.taxableValue),
    0
  );
  const taxPayable = items?.reduce(
    (acc, item) => acc + Number(item.taxAmount),
    0
  );

  const totalPayable = taxAmt + taxPayable;

  const wordsAmount = numberToWords(totalPayable);
  console.log(wordsAmount);

  const InvoicePDF = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View>
            {/* <Text>Invoice</Text>
          <Text>Invoice #INV-2024-001</Text> */}
            <Image src={logo} style={styles.logo} />
          </View>
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
              Building No- 3/7, Shop No-6, Ground Floor Gowri Shankar Complex
              Arekere Main Road Bengaluru, Karnataka, India PIN: 560076
            </Text>
            <Text>Mob: 8147465517</Text>
            <Text>Email: abdulfahad1436@gmail.com</Text>
            <Text style={styles.pan}>
              PAN No:<Text style={styles.sr}></Text>
            </Text>
            <Text style={styles.heading}>
              GST Registration No:
              <Text style={styles.sr}> 29FKLPP1223G1ZO</Text>
            </Text>
            <Text style={styles.invoice}>
              Invoice Number:
              <Text style={styles.sr}> {customerDetails.invoiceNum}</Text>
            </Text>
            <Text style={styles.pos}>
              Invoice Date:
              <Text style={styles.sr}> {customerDetails?.invoiceDate}</Text>
            </Text>
            <Text style={styles.pos}>
              Due Date:
              <Text style={styles.sr}> {customerDetails?.dueDate}</Text>
            </Text>
          </View>
          <View style={styles.soldBy}>
            <View style={styles.rightBill}>
              <Text style={styles.rs}>Billing Address:</Text>
              <Text>{customerDetails?.name}</Text>
              <Text>{customerDetails?.address}</Text>
              <Text style={styles.sr2}>
                GST Registration No:
                <Text style={styles.normalFont}>
                  {customerDetails?.gstin?.toUpperCase()}
                </Text>
              </Text>
              <Text style={styles.heading}>
                Email:
                <Text style={styles.sr}> {customerDetails?.email}</Text>
              </Text>
              <Text style={styles.heading}>
                Ph:
                <Text style={styles.sr}> {customerDetails?.phone}</Text>
              </Text>
              <Text style={styles.shippingAddress}>
                <Text style={styles.rs}>Shipping Address:</Text>
              </Text>
              <Text style={styles.sr}>{customerDetails?.name}</Text>
              <Text>{customerDetails?.address}</Text>

              <Text style={styles.sr2}>
                Place of Supply:
                <Text style={styles.sr}> {customerDetails?.place}</Text>
              </Text>
              <Text style={styles.sr2}>
                Place of Delivery:
                <Text style={styles.sr}> {customerDetails?.place}</Text>
              </Text>
            </View>
          </View>
        </View>
        {/* Table Comes here */}
        <View style={[styles.row, styles.bold]}>
          <Text style={styles.cell}>Sl No.</Text>
          <Text style={[styles.cell, styles.descriptionCell]}>
            Item/Particulars
          </Text>
          {/* <Text style={styles.cell}>HSN Code</Text> */}
          <Text style={styles.cell}>Rate</Text>
          <Text style={styles.cell}>QTY</Text>
          <Text style={styles.cell}>Taxable Value</Text>
          <Text style={styles.cell}>Tax Amount</Text>
          <Text style={styles.cell}>Amount</Text>
        </View>

        {/* Table Data */}
        {items?.map((item) => (
          <View style={styles.row} key={item.sno}>
            <Text style={styles.cell}>{item.sno}</Text>
            <Text style={[styles.cell, styles.descriptionCell]}>
              {item.item}
            </Text>
            <Text style={styles.cell}>{item.rate}</Text>
            <Text style={styles.cell}>{item.qty}</Text>
            <Text style={styles.cell}>{item.taxAmount?.toFixed(2)}</Text>
            <Text style={styles.cell}>{item.taxableValue?.toFixed(2)}</Text>
            <Text style={styles.cell}>{item.total?.toFixed(2)}</Text>
          </View>
        ))}

        {/* Totals Section */}
        <View>
          <Text style={styles.totalText}>
            Taxable Amount: {taxAmt?.toFixed(2)}
          </Text>
          <Text style={styles.totalText}>
            Tax (18.0%): {taxPayable?.toFixed(2)}
          </Text>
          {/* <Text style={styles.totalText}>
            Discount (10.0%): -{discount.toFixed(2)}
          </Text> */}
          <Text style={styles.total}>
            Total (INR): {totalPayable.toFixed(2)}
          </Text>
          <Text style={{ marginTop: 20, fontSize: 10 }}>
            Amount in Words:<Text style={styles.rs}> {wordsAmount}</Text>
          </Text>
        </View>

        {/* Footer */}
        <View style={styles.bankContainer}>
          {/* Left Section - Bank Details */}
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
            <Text>
              Bank: <Text style={styles.rs}>HDFC BANK</Text>
            </Text>
            <Text>
              Account: <Text style={styles.rs}>50200093163651</Text>
            </Text>
            <Text>
              IFSC CODE: <Text style={styles.rs}>HDFC0002841</Text>
            </Text>
            <Text>
              Branch: <Text style={styles.rs}>VIJAYA BANK LAYOUT</Text>
            </Text>
            <Image src="src/components/assets/qr.png" style={styles.logo} />
          </View>

          {/* Right Section - Business Name */}
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
      {/* <div className="w-full h-[750px]">
        <PDFViewer width="100%" height="100%">
          <InvoicePDF customerDetails={customerDetails} />
        </PDFViewer>
      </div> */}
      <div className="mt-7">
        <PDFDownloadLink
          document={
            <InvoicePDF customerDetails={customerDetails} items={items} />
          }
          fileName={`Invoice-${customerDetails.invoiceNum}.pdf`}
          className="bg-green-600 text-white p-3 rounded w-full block text-center font-bold"
        >
          {({ blob, url, loading, error }) =>
            loading ? 'Preparing document...' : 'Generate Invoice'
          }
        </PDFDownloadLink>
      </div>
    </div>
  );
}
