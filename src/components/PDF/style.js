import { StyleSheet } from '@react-pdf/renderer';
export const styles = StyleSheet.create({
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
});
