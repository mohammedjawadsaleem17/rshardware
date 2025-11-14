import { StyleSheet } from '@react-pdf/renderer';
export const styles = StyleSheet.create({
  page: {
    backgroundColor: '#fff',
    fontFamily: 'Helvetica',
    fontSize: 9,
    padding: 15,
  },

  // Header section
  headerSection: {
    borderWidth: 1,
    borderColor: '#000',
  },
  headerTop: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#000',
  },
  sellerSection: {
    flex: 1,
    padding: 8,
    borderRightWidth: 0,
    borderColor: '#000',
  },
  invoiceInfoSection: {
    width: 240,
    padding: 0,
    borderLeftWidth: 1,
    borderColor: '#000',
  },
  companyName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  normalText: {
    fontSize: 8,
    marginBottom: 1,
    lineHeight: 1.3,
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: 8,
  },

  // Invoice info grid
  infoRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#000',
    minHeight: 18,
  },
  infoRowNoBorder: {
    flexDirection: 'row',
    minHeight: 18,
  },
  infoLabel: {
    width: '50%',
    padding: 3,
    paddingLeft: 2,
    fontSize: 8,
    borderRightWidth: 1,
    borderColor: '#000',
  },
  infoValue: {
    width: '50%',
    padding: 3,
    fontSize: 8,
    fontWeight: 'bold',
  },

  // Buyer section
  buyerSection: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#000',
  },
  buyerLeft: {
    flex: 1,
    padding: 8,
    // match the header behaviour: no right border on left column
    borderRightWidth: 0,
    borderColor: '#000',
  },
  buyerRight: {
    width: 240,
    padding: 8,
    borderLeftWidth: 1,
    borderColor: '#000',
  },
  sectionTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    marginBottom: 3,
  },

  // Table
  table: {
    borderBottomWidth: 1,
    borderColor: '#000',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#000',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#000',
  },
  tableRowNoBorder: {
    flexDirection: 'row',
  },

  // Table columns
  colSlNo: {
    width: 30,
    padding: 4,
    borderRightWidth: 1,
    borderColor: '#000',
    fontSize: 8,
    textAlign: 'center',
  },
  colDescription: {
    flex: 1,
    padding: 4,
    borderRightWidth: 1,
    borderColor: '#000',
    fontSize: 8,
  },
  colHSN: {
    width: 55,
    padding: 4,
    borderRightWidth: 1,
    borderColor: '#000',
    fontSize: 8,
    textAlign: 'center',
  },
  colGST: {
    width: 40,
    padding: 4,
    borderRightWidth: 1,
    borderColor: '#000',
    fontSize: 8,
    textAlign: 'center',
  },
  colQuantity: {
    width: 50,
    padding: 4,
    borderRightWidth: 1,
    borderColor: '#000',
    fontSize: 8,
    textAlign: 'center',
  },
  colRate: {
    width: 50,
    padding: 4,
    borderRightWidth: 1,
    borderColor: '#000',
    fontSize: 8,
    textAlign: 'center',
  },
  colRatePer: {
    width: 45,
    padding: 4,
    borderRightWidth: 1,
    borderColor: '#000',
    fontSize: 8,
    textAlign: 'center',
  },
  colPer: {
    width: 35,
    padding: 4,
    borderRightWidth: 1,
    borderColor: '#000',
    fontSize: 8,
    textAlign: 'center',
  },
  colAmount: {
    width: 60,
    padding: 4,
    fontSize: 8,
    textAlign: 'right',
  },

  // Tax breakdown section
  taxBreakdownSection: {
    borderBottomWidth: 1,
    borderColor: '#000',
    paddingVertical: 8,
    paddingHorizontal: 50,
  },
  taxRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  taxLabel: {
    fontSize: 8,
    width: 100,
    textAlign: 'right',
  },
  taxValue: {
    fontSize: 8,
    width: 80,
    textAlign: 'right',
  },
  lessLabel: {
    fontSize: 8,
    marginTop: 5,
    marginRight: 180,
  },

  // Footer sections
  footerSection: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#000',
  },
  amountInWords: {
    flex: 1,
    padding: 8,
    borderRightWidth: 1,
    borderColor: '#000',
  },
  totalSection: {
    width: 155,
    padding: 8,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  totalLabel: {
    fontSize: 9,
  },
  totalAmount: {
    fontSize: 12,
    fontWeight: 'bold',
  },

  // Tax summary table
  taxSummarySection: {
    borderBottomWidth: 1,
    borderColor: '#000',
  },
  taxSummaryHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#000',
    backgroundColor: '#fff',
  },
  taxSummaryRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#000',
  },
  taxColHSN: {
    width: 70,
    padding: 4,
    borderRightWidth: 1,
    borderColor: '#000',
    fontSize: 8,
    textAlign: 'center',
  },
  taxColTaxable: {
    width: 70,
    padding: 4,
    borderRightWidth: 1,
    borderColor: '#000',
    fontSize: 8,
    textAlign: 'center',
  },
  taxColCGST: {
    flex: 1,
    borderRightWidth: 1,
    borderColor: '#000',
  },
  taxColSGST: {
    flex: 1,
    borderRightWidth: 1,
    borderColor: '#000',
  },
  taxColTotal: {
    width: 70,
    padding: 4,
    fontSize: 8,
    textAlign: 'center',
  },
  taxSubCol: {
    flexDirection: 'row',
  },
  taxSubColRate: {
    flex: 1,
    padding: 4,
    borderRightWidth: 1,
    borderColor: '#000',
    fontSize: 8,
    textAlign: 'center',
  },
  taxSubColAmount: {
    flex: 1,
    padding: 4,
    fontSize: 8,
    textAlign: 'center',
  },

  // Bank details and signature
  bottomSection: {
    flexDirection: 'row',
    minHeight: 100,
  },
  bankSection: {
    flex: 1,
    padding: 8,
    borderRightWidth: 1,
    borderColor: '#000',
  },
  signatureSection: {
    width: 200,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  declarationText: {
    fontSize: 7,
    marginTop: 10,
    lineHeight: 1.3,
  },
  signatureText: {
    fontSize: 9,
    fontWeight: 'bold',
    marginTop: 30,
  },
  jurisdictionText: {
    fontSize: 8,
    textAlign: 'center',
    marginTop: 5,
  },
  computerGenerated: {
    fontSize: 7,
    textAlign: 'center',
    marginTop: 2,
  },
});
