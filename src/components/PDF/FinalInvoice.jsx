import {
  Document,
  Image,
  Page,
  PDFViewer,
  Text,
  View,
} from '@react-pdf/renderer';
import { styles } from './style';

const InvoicePDF = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <View>
          {/* <Text>Invoice</Text>
          <Text>Invoice #INV-2024-001</Text> */}
          <Image src="src/components/assets/logo.png" style={styles.logo} />
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
          <Text>R S HARDWARE GLASS & ELECTRICALS</Text>
          <Text>
            Building No- 3/7, Shop No-6, Ground Floor Gowri Shankar Complex
            Arekere Main Road Bengaluru, Karnataka, India PIN: 560076
          </Text>
          <Text style={styles.pan}>
            PAN No:<Text style={styles.sr}></Text>
          </Text>
          <Text style={styles.heading}>
            GST Registration No:<Text style={styles.sr}> 29FKLPP1223G1ZO</Text>
          </Text>
          <Text style={styles.invoice}>
            Invoice Number: <Text style={styles.sr}>1</Text>
          </Text>
          <Text style={styles.pos}>
            Invoice Date: <Text style={styles.sr}>30 March</Text>
          </Text>
          <Text style={styles.pos}>
            Due Date: <Text style={styles.sr}>30 March</Text>
          </Text>
        </View>
        <View style={styles.soldBy}>
          <View style={styles.rightBill}>
            <Text style={styles.rs}>Billing Address:</Text>
            <Text>R S HARDWARE GLASS & ELECTRICALS</Text>
            <Text>Building No- 3/7, Shop No-</Text>
            <Text style={styles.pan}>
              GST Registration No:
              <Text style={styles.sr}> 29FKLPP1223G1ZO</Text>
            </Text>
            <Text style={styles.heading}>
              Email:
              <Text style={styles.sr}>Customer@gmail.com</Text>
            </Text>
            <Text style={styles.heading}>
              Ph:
              <Text style={styles.sr}>8792549715</Text>
            </Text>
            <Text style={styles.shippingAddress}>
              <Text style={styles.rs}>Shipping Address</Text>
            </Text>
            <Text style={styles.sr}>R S HARDWARE GLASS & ELECTRICALS</Text>
            <Text>
              Building No- 3/7, Shop No-6, Ground Floor Gowri Shankar Complex
              Arekere Main Road Bengaluru, Karnataka, India PIN: 560076
            </Text>

            <Text style={styles.pos}>
              Place of Supply: <Text style={styles.sr}>KARNATAKA</Text>
            </Text>
            <Text style={styles.pos}>
              Place of Delivery: <Text style={styles.sr}>KARNATAKA</Text>
            </Text>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);
export default function FinalInvoice() {
  return (
    <div>
      <div className="w-full h-[750px]">
        <PDFViewer width="100%" height="100%">
          <InvoicePDF />
        </PDFViewer>
      </div>
    </div>
  );
}
