import logo from '../components/assets/qr.png';

export default function Payments() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start mt-6">
      {/* Left Section */}
      <div className="w-full md:w-1/2 mb-6 md:mb-0">
        <h1 className="text-xl font-bold underline mb-6">Payment Details</h1>
        <div>
          Pay using UPI
          <img src={logo} alt="Logo" className="w-64 h-64 mt-6" />
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2">
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
