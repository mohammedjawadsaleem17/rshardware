import { StyleSheet } from '@react-pdf/renderer';
export const newStyle = StyleSheet.create({
  page: {
    backgroundColor: '#fff',
    color: '#262626',
    fontFamily: 'Helvetica',
    fontSize: 12,
    padding: '20px 25px',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
  },
  heading: {
    fontWeight: 'bold',
  },
  soldByContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  soldBy: {
    flex: 1,
    marginHorizontal: 5,
  },
  rs: {
    fontWeight: 'bold',
    marginBottom: '5px',
  },
  sr: {
    fontWeight: 'normal',
    marginTop: '5px',
  },
  pan: {
    fontWeight: 'bold',
    marginTop: '15px',
  },
  billing: {
    display: 'flex',
    justifyContent: 'space-between',
    fontWeight: 'bold',
  },
  rightBill: {
    marginLeft: '30px',
  },
  shippingAddress: {
    marginTop: '20px',
  },
  pos: {
    fontWeight: 'bold',
    marginTop: '5px',
  },
  invoice: {
    fontWeight: 'bold',
    marginTop: '40px',
  },
  sr2: {
    fontWeight: 'bold',
  },

  rspace: {
    marginBottom: '0px',
    marginTop: '1px',
  },
  test: {
    marginBottom: '0px',
    marginTop: '1px',
  },
  normalFont: {
    fontWeight: 'normal',
  },
  //   Table CSS
  table: {
    display: 'table',
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
  },

  bold: {
    fontWeight: 'bold',
  },
  totalText: {
    textAlign: 'right',
    marginTop: 4,
    fontWeight: 'bold',
    fontSize: '9px',
    marginBottom: '0px',
  },

  total: {
    textAlign: 'right',
    marginTop: 8,
    fontWeight: 'bold',
    // borderTop: '1px solid dottted',
    fontSize: '15px',
    marginBottom: '0px',
  },
  img: {
    marginTop: '2px',
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 10,
    color: '#555',
  },
  bankContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  bankDetails: {
    flex: 1,
    marginTop: '12px',
  },
  businessDetails: {
    flex: 1,
    alignItems: 'flex-end',
    marginBottom: '12px',
  },
  businessName: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: '-40px',
  },
  logo: {
    width: 100,
    height: 100,
    marginTop: 10,
  },
  rowInvoice: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#000',
    paddingVertical: 4,
  },
  cellInvoice: {
    flex: 1,
    fontSize: 10,
    textAlign: 'left',
    padding: 2,
  },
  descriptionCellInvoice: {
    flex: 2, // or whatever is needed
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    alignItems: 'center',
    paddingVertical: 4,
  },
  cell: {
    fontSize: 10,
    width: '10%',
    padding: 2,
    textAlign: 'center',
  },
  descriptionCell: {
    width: '20%',
    textAlign: 'left',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 8,
    fontSize: 10,
    flex: 1,
    textAlign: 'center',
  },
  descriptionCell: {
    flex: 3,
    textAlign: 'left',
  },
});
