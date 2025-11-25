/* InvoicePDF.js */
import { Document, Image, Page, Text, View } from '@react-pdf/renderer';
import { styles } from './style';
import { newStyle } from './newStyles';
import logo from '../../components/assets/logo.png';
import qr from '../../components/assets/qr.png';
import signatureImg from './fahad.png';

const formatAmount = (num) => Number(num).toFixed(2);

const sampleData = {
  sellerDetails: {
    name: 'R S Hardware Glass & Electricals',
    address:
      'Building No-3/7, Shop No-6\nGround Floor, Gowri Shankar Complex\nArekere Main Road\nBangalore - 560076',
    phone: '8147465517, 9066309842',
    gstin: '29FKLPP1223G1Z0',
    state: 'Karnataka, Code: 76',
    email: 'rshardware2210@gmail.com',
  },
  buyerDetails: {
    name: 'Cauvery Traders',
    address:
      '1st Cross Mahadeswara Layout\n16th Main Road BTM Layout\n2nd Stage Complex\nBengaluru - 560029',
    gstin: '29AAFFC1847A1ZS',
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
    name: 'HDFC BANK',
    accountNo: '50200093163651',
    ifsc: 'HDFC0002841',
    branch: '\nVijaya Bank Layout',
    address: 'Bilekhalli, off Bannerghatta Road, Bangalore Karnataka 560076',
  },
};

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

  // Split Rupees & Paise
  const [rupeesStr, paiseStr] = amount.toFixed(2).split('.');
  const rupees = parseInt(rupeesStr);
  const paise = parseInt(paiseStr);

  let result = '';

  if (rupees > 0) result += inWords(rupees) + ' Rupees';

  if (paise > 0)
    result += (rupees > 0 ? ' and ' : '') + inWords(paise) + ' Paise';

  return result + ' Only';
};

export default function InvoicePDF({ customerDetails, data = sampleData }) {
  const preTaxRatesArray = customerDetails?.lineItems.map((item) =>
    (item.rate / 1.18).toFixed(2)
  );

  console.log('Pretax array', preTaxRatesArray);
  const taxableTotalValue = customerDetails?.lineItems.map(
    (item) => (item.rate / 1.18).toFixed(2) * item.qty
  );
  const totalTaxAmt = taxableTotalValue?.reduce((acc, value) => acc + value, 0);

  const totalGSTAmount = customerDetails?.lineItems?.map((ele) => {
    const taxable = Number(ele.rate) / 1.18;

    const cgst = Number((taxable * 0.09).toFixed(2));
    const sgst = Number((taxable * 0.09).toFixed(2));

    return (cgst + sgst) * ele.qty;
  });
  console.log('Total GST', totalGSTAmount);

  const totalCGST_SGST = totalGSTAmount?.reduce((acc, val) => acc + val, 0);
  const totalGST = (totalCGST_SGST / 2).toFixed(2);

  console.log('Total CGST', totalGST);
  const gstValue = totalGSTAmount
    ?.reduce((acc, ele) => acc + ele, 0)
    .toFixed(2);
  console.log('gstValue', gstValue);
  const subTotal = customerDetails?.lineItems?.reduce(
    (acc, ele) => acc + Number(ele.rate / 1.18) * Number(ele.qty),
    0
  );
  const finalAmountBeforeRoundOff = Number(
    (Number(subTotal) + Number(gstValue)).toFixed(2)
  );
  const roundedAmount = Math.round(finalAmountBeforeRoundOff);

  const roundOff = Number(
    (roundedAmount - finalAmountBeforeRoundOff).toFixed(2)
  );

  const totalProductAmount = customerDetails?.lineItems?.reduce(
    (acc, ele) => acc + Number(ele?.rate) * Number(ele?.qty),
    0
  );

  console.log('Final Amount', totalProductAmount);
  const amountInWords = `Indian Rupees ${getAmountInWords(totalProductAmount)}`;

  const taxAmountInWords = `Indian Rupees ${getAmountInWords(totalGST * 2)}`;

  return (
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
        <View style={styles.headerSection} wrap={false}>
          {/* Top Section - Seller and Invoice Info */}
          <View style={styles.headerTopWithBorder}>
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
                State Name : {customerDetails.place}
              </Text>
            </View>
            <View
              style={[
                styles.invoiceInfoSection,
                { justifyContent: 'space-between' },
              ]}
            >
              <View style={styles.infoRow}>
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
                {String(item.hsn || '').slice(0, 8)}
              </Text>
              <Text style={styles.colGST}>18%</Text>
              <Text style={styles.colQuantity}>{item.qty} Piece</Text>
              <Text style={styles.colRate}>{formatAmount(item.rate)}</Text>
              <Text style={[styles.colRatePer, { borderRightWidth: 1 }]}>
                {formatAmount(preTaxRatesArray?.at(index))}
              </Text>
              <Text style={[styles.colPer, { borderRightWidth: 1 }]}>
                Piece
              </Text>
              <Text style={[styles.colAmount, { borderRightWidth: 1 }]}>
                {formatAmount(preTaxRatesArray?.at(index) * Number(item?.qty))}
              </Text>
            </View>
          ))}

          {/* Tax Breakdown Rows */}
          <View style={styles.taxBreakdownSection}>
            <View style={styles.taxRow}>
              <Text style={styles.taxLabel}>CGST 9%</Text>

              <Text style={styles.taxValue}>{formatAmount(gstValue / 2)}</Text>
            </View>
            <View style={styles.taxRow}>
              <Text style={styles.taxLabel}>SGST 9%</Text>

              <Text style={styles.taxValue}>{formatAmount(gstValue / 2)}</Text>
            </View>

            <View style={[styles.taxRow, { justifyContent: 'flex-start' }]}>
              <Text style={[styles.taxLabel, { marginLeft: 366 }]}>
                Round Off
              </Text>
              <Text style={[styles.taxValue, { marginLeft: 'auto' }]}>
                {roundOff}
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
                Rs: {formatAmount(totalProductAmount)}
              </Text>
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
          {customerDetails?.lineItems?.map((item, index) => (
            <View key={index} style={styles.taxSummaryRow}>
              <Text style={styles.taxColHSN}>{item.hsn}</Text>
              <Text style={styles.taxColTaxable}>
                {formatAmount(preTaxRatesArray?.at(index) * Number(item?.qty))}
              </Text>
              <View style={styles.taxColCGST}>
                <View style={styles.taxSubCol}>
                  <Text style={styles.taxSubColRate}>9%</Text>
                  <Text style={styles.taxSubColAmount}>
                    {formatAmount(totalGSTAmount?.at(index) / 2)}
                  </Text>
                </View>
              </View>
              <View style={styles.taxColSGST}>
                <View style={styles.taxSubCol}>
                  <Text style={styles.taxSubColRate}>9%</Text>
                  <Text style={styles.taxSubColAmount}>
                    {formatAmount(totalGSTAmount?.at(index) / 2)}
                  </Text>
                </View>
              </View>
              <Text style={styles.taxColTotal}>
                {' '}
                {formatAmount(totalGSTAmount?.at(index))}
              </Text>
            </View>
          ))}

          {/* Total Row */}
          <View style={styles.taxSummaryRow}>
            <Text style={[styles.taxColHSN, { fontWeight: 'bold' }]}>
              Total
            </Text>
            <Text style={[styles.taxColTaxable, { fontWeight: 'bold' }]}>
              {formatAmount(totalTaxAmt)}
            </Text>
            <View style={styles.taxColCGST}>
              <View style={styles.taxSubCol}>
                <Text style={styles.taxSubColRate}></Text>
                <Text style={[styles.taxSubColAmount, { fontWeight: 'bold' }]}>
                  {formatAmount(totalGST)}
                </Text>
              </View>
            </View>
            <View style={styles.taxColSGST}>
              <View style={styles.taxSubCol}>
                <Text style={styles.taxSubColRate}></Text>
                <Text style={[styles.taxSubColAmount, { fontWeight: 'bold' }]}>
                  {formatAmount(totalGST)}
                </Text>
              </View>
            </View>
            <Text style={[styles.taxColTotal, { fontWeight: 'bold' }]}>
              {formatAmount(totalGST * 2)}
            </Text>
          </View>
        </View>

        {/* Tax Amount in Words */}
        <View style={[styles.footerSection]}>
          <View style={styles.amountInWords}>
            <Text style={styles.normalText}>
              Tax Amount (in words) :{' '}
              <Text style={styles.boldText}>{taxAmountInWords}</Text>
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
          <View style={styles.signatureSection}>
            <Text style={styles.signatureText}>
              for {data.sellerDetails.name}
            </Text>

            {/* Signature Image */}
            <Image src={signatureImg} style={styles.signatureImage} />

            <Text style={[styles.normalText, { marginTop: 5 }]}>
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
            This is a Computer Generated Invoice
          </Text>
        </View>
      </Page>
    </Document>
  );
}
