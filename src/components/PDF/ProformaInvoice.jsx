/* eslint-disable */
import {
  Document,
  Page,
  PDFDownloadLink,
  Text,
  View,
} from '@react-pdf/renderer';
import { styles } from './style';
import { ToastContainer, toast } from 'react-toastify';

const getAmountInWords = (amount) => {
  const a = [
    '',
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
  const b = [
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

  const inWords = (num) => {
    if (num < 20) return a[num];
    if (num < 100)
      return b[Math.floor(num / 10)] + (num % 10 ? ' ' + a[num % 10] : '');
    if (num < 1000)
      return (
        a[Math.floor(num / 100)] +
        ' Hundred' +
        (num % 100 ? ' ' + inWords(num % 100) : '')
      );
    if (num < 100000)
      return (
        inWords(Math.floor(num / 1000)) +
        ' Thousand' +
        (num % 1000 ? ' ' + inWords(num % 1000) : '')
      );
    if (num < 10000000)
      return (
        inWords(Math.floor(num / 100000)) +
        ' Lakh' +
        (num % 100000 ? ' ' + inWords(num % 100000) : '')
      );
    return (
      inWords(Math.floor(num / 10000000)) +
      ' Crore' +
      (num % 10000000 ? ' ' + inWords(num % 10000000) : '')
    );
  };

  const [rupeesStr, paiseStr] = amount.toFixed(2).split('.');
  const rupees = parseInt(rupeesStr);
  const paise = parseInt(paiseStr);

  let result = '';
  if (rupees > 0) result += inWords(rupees) + ' Rupees';
  if (paise > 0)
    result += (rupees > 0 ? ' and ' : '') + inWords(paise) + ' Paise';

  return result + ' Only';
};

const sampleData = {
  sellerDetails: {
    name: 'R S Hardware Glass & Electricals',
    address:
      'Building No-3/7, Shop No-6\nGround Floor, Gowri Shankar Complex\nArekere Main Road\nBangalore - 560076',
    phone: 'PH - 8147465517, 9066309842',
    gstin: '29FKLPP1223G1Z0',
    state: 'Karnataka, Code: 76',
    email: 'rshardware2210@gmail.com',
  },
  bankDetails: {
    name: 'HDFC BANK',
    accountNo: '50200093163651',
    ifsc: 'HDFC0002841',
    branch: '\nVijaya Bank Layout',
    address: 'Bilekhalli, off Bannerghatta Road, Bangalore Karnataka 560076',
  },
};

export default function ProformaInvoice({
  customerDetails,
  items,
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
  deliveryNote,
}) {
  const preTaxRatesArray = customerDetails?.lineItems?.map((item) =>
    (item.rate / 1.18).toFixed(2)
  );

  // Total should include tax (use actual rate)
  const totalProductAmount = customerDetails?.lineItems?.reduce(
    (acc, ele) => acc + Number(ele?.rate) * Number(ele?.qty),
    0
  );

  const amountInWords = `Indian Rupees ${getAmountInWords(totalProductAmount)}`;

  const ProformaInvoicePDF = ({ data = sampleData }) => (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Add Proforma Invoice Header */}
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
              fontSize: 12,
              fontWeight: 'bold',
            }}
          >
            Proforma Invoice
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
              fontSize: 8,
              fontStyle: 'italic',
            }}
          >
            (NOT A TAX INVOICE)
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
                <Text style={styles.infoLabel}>Proforma No.</Text>
                <Text style={styles.infoValue}>
                  {customerDetails.invoiceNum}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Delivery Note</Text>
                <Text style={styles.infoValue}>
                  {customerDetails?.deliveryNote}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Reference No. & Date.</Text>
                <Text style={styles.infoValue}>
                  {customerDetails?.referenceNo}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Buyer's Order No.</Text>
                <Text style={styles.infoValue}>
                  {customerDetails?.buyersOrderNo}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Dispatch Doc No.</Text>
                <Text style={styles.infoValue}>
                  {customerDetails?.dispatchDocNo}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Dispatched through</Text>
                <Text style={styles.infoValue}>
                  {customerDetails?.dispatchedThrough}
                </Text>
              </View>
              <View style={styles.infoRowNoBorder}>
                <Text style={styles.infoLabel}>Terms of Delivery</Text>
                <Text style={styles.infoValue}>
                  {customerDetails?.termsOfDelivery}
                </Text>
              </View>
            </View>
          </View>

          {/* Invoice Info Right Side */}
          <View style={styles.headerTop}>
            <View style={[styles.sellerSection, { borderRightWidth: 0 }]}>
              <Text style={styles.boldText}>Buyer (Bill to)</Text>
              <Text style={styles.companyName}>{customerDetails.name}</Text>
              <Text style={styles.normalText}>{customerDetails.address}</Text>
              <Text style={styles.normalText}>
                GSTIN/UIN: {customerDetails.gstin}
              </Text>
              <Text style={styles.normalText}>
                State Name : {customerDetails.customerPlaceOfSupply}
              </Text>
            </View>
            <View
              style={[
                styles.invoiceInfoSection,
                { justifyContent: 'space-between' },
              ]}
            >
              <View style={[styles.infoRow]}>
                <Text style={styles.infoLabel}>Payment Date</Text>
                <Text style={styles.infoValue}>{customerDetails?.dated}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Mode/Terms of Payment</Text>
                <Text style={styles.infoValue}>
                  {customerDetails?.paymentTerms}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Other References</Text>
                <Text style={styles.infoValue}>
                  {customerDetails?.otherReferences}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Dated</Text>
                <Text style={styles.infoValue}>
                  {customerDetails?.invoiceDate}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Delivery Note Date</Text>
                <Text style={styles.infoValue}>
                  {customerDetails?.deliveryNoteDate}
                </Text>
              </View>
              <View style={[styles.infoRowNoBorder]}>
                <Text style={styles.infoLabel}>Destination</Text>
                <Text style={styles.infoValue}>
                  {customerDetails?.destination}
                </Text>
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
          {customerDetails?.lineItems?.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={[styles.colSlNo, { borderLeftWidth: 1 }]}>
                {item.sno}
              </Text>
              <Text style={styles.colDescription}>{item.item}</Text>
              <Text
                style={[
                  styles.colHSN,
                  { textAlign: 'center', paddingHorizontal: 1 },
                ]}
              >
                {item.hsn}
              </Text>
              <Text style={styles.colGST}>18%</Text>
              <Text style={styles.colQuantity}>{item.qty} Piece</Text>
              <Text style={styles.colRate}>{item.rate}</Text>
              <Text style={[styles.colRatePer, { borderRightWidth: 1 }]}>
                {preTaxRatesArray?.at(index)}
              </Text>
              <Text style={[styles.colPer, { borderRightWidth: 1 }]}>
                Piece
              </Text>
              <Text style={[styles.colAmount, { borderRightWidth: 1 }]}>
                {(preTaxRatesArray?.at(index) * Number(item?.qty)).toFixed(2)}
              </Text>
            </View>
          ))}
        </View>

        {/* Total and Amount in Words - NO TAX BREAKDOWN */}
        <View
          style={[
            styles.footerSection,
            { borderLeftWidth: 1, borderRightWidth: 1, borderColor: '#000' },
          ]}
        >
          <View style={styles.amountInWords}>
            <Text style={styles.boldText}>Amount Chargeable (in words)</Text>
            <Text style={[styles.boldText, { fontSize: 9, marginTop: 3 }]}>
              {amountInWords}
            </Text>
          </View>
          <View style={styles.totalSection}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalLabel}>
                {customerDetails?.lineItems?.reduce(
                  (acc, value) => acc + Number(value?.qty),
                  0
                )}
                {''} Piece
              </Text>
            </View>
            <View style={[styles.totalRow, { marginTop: 10 }]}>
              <Text style={styles.totalAmount}>
                Rs: {totalProductAmount?.toFixed(2)}
              </Text>
            </View>
            <Text
              style={[styles.normalText, { textAlign: 'right', fontSize: 7 }]}
            >
              E. & O.E
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
              This is a Proforma Invoice and not valid for tax credit or
              accounting purposes. Final invoice will be issued upon
              confirmation.
            </Text>
          </View>
          <View style={[styles.signatureSection]}>
            <Text style={styles.signatureText}>
              for {data.sellerDetails.name}
            </Text>
            <Text style={[styles.normalText, { marginTop: 40 }]}>
              Authorised Signatory
            </Text>
          </View>
        </View>

        {/* Jurisdiction */}
        <View style={{ borderTopWidth: 0, borderColor: '#000', paddingTop: 5 }}>
          <Text style={styles.jurisdictionText}>
            SUBJECT TO BENGALURU JURISDICTION
          </Text>
          <Text style={styles.computerGenerated}>
            This is a Computer Generated Proforma Invoice
          </Text>
        </View>
      </Page>
    </Document>
  );

  return (
    <div>
      <ToastContainer />
      <div className="mt-7 space-y-4">
        <PDFDownloadLink
          document={<ProformaInvoicePDF />}
          fileName={`RSHGE-Proforma-Invoice.pdf`}
          className="bg-slate-600 text-white p-3 rounded w-full block text-center font-bold"
        >
          {({ loading }) =>
            loading ? 'Generating...' : 'Download Proforma Invoice'
          }
        </PDFDownloadLink>
      </div>
    </div>
  );
}
