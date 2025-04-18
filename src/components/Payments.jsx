import logo from '../components/assets/qr.png';
import { motion } from 'framer-motion';

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

export default function Payments() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start mt-6">
      {/* Left Section */}
      <div className="w-full md:w-1/2 mb-6 md:mb-0">
        <motion.h1
          variants={itemVariants}
          className="text-2xl font-bold text-gray-800 border-b-2 border-indigo-200 pb-2"
        >
          Particulars
        </motion.h1>
        <div>
          Pay using UPI
          <img src={logo} alt="Logo" className="w-64 h-64 mt-6" />
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 md:pl-26">
        <h2 className="text-xl font-bold mb-6">Bank Details</h2>
        <p>
          Bank: <b>HDFC BANK</b>
        </p>
        <p>
          Account #: <b>50200093163651</b>
        </p>
        <p>
          IFSC CODE: <b>HDFC0002841</b>
        </p>
        <p>
          Branch: <b>VIJAYA BANK LAYOUT</b>
        </p>
      </div>
    </div>
  );
}
