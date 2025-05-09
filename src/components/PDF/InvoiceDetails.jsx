import { PDFDownloadLink } from '@react-pdf/renderer';
import React, { useEffect, useState } from 'react';
import InvoicePDF from './InvoicePDF';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

const InvoiceDetails = () => {
  const Navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const { invoiceId :ID} = useParams();
  console.log(ID);

    async function getDetails(){
    const res = await fetch(
      `https://rshardware.up.railway.app/users/${ID}`
    );
    const data = await res.json();
    console.log(data);
    setUserData(data);
    }
  
  
  useEffect(() => {
    getDetails();
  },[])
  



    return (
      <>
        <div>
          <div className="px-4 pt-8 flex justify-end">
            <button
              className="bg-indigo-500 hover:bg-indigo-700 text-white font-light py-2 px-5 rounded-lg transition-colors duration-300 flex items-center gap-2"
              onClick={() => Navigate('/dashboard')}
            >
              Back
            </button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto p-4 sm:p-6 border rounded shadow-sm bg-white text-sm leading-relaxed text-gray-800">
          <h1 className="text-center text-lg font-semibold mb-1">
            Tax Invoice/Bill of Supply/Cash Memo
          </h1>
          <p className="text-center mb-4">(Original for Recipient)</p>

          <div className="mb-4">
            <p className="font-semibold">Sold By:</p>
            <p>R S HARDWARE GLASS & ELECTRICALS</p>
            <p>
              Building No- 3/7, Shop No-6, Ground Floor Gowri Shankar Complex
              Arekere Main Road Bengaluru, Karnataka, India PIN: 560076
            </p>
            <p>Mob: 8147465517</p>
            <p>Email: abdulfahad1436@gmail.com</p>
            <p>PAN No:</p>
            <p>GST Registration No: 29FKLPP1223G1ZO</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div>
              <p>
                <span className="font-semibold">Invoice Number:</span>{' '}
                {userData?.invoiceId}
              </p>
              <p>
                <span className="font-semibold">Invoice Date:</span> 09 May 2025
              </p>
              <p>
                <span className="font-semibold">Due Date:</span> 09 May 2025
              </p>
            </div>

            <div>
              <p>
                <span className="font-semibold">Billing Address:</span>
                {userData?.name}
              </p>
              <p>
                <span className="font-semibold">GST Registration No:</span> 09
                May 2025
              </p>
              <p>
                <span className="font-semibold">Email:</span> {userData?.email}
              </p>
              <p>
                <span className="font-semibold">Ph:</span>
                {userData?.phoneNumber}
              </p>
              <p>
                <span className="font-semibold">Due Date:</span> 09 May 2025
              </p>
              <p className="font-semibold">
                <span> </span>
              </p>

             
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div>
              <p className="font-semibold">Shipping Address:</p>
            </div>
            <div>
              <p>
                <span className="font-semibold">Place of Supply:</span>
              </p>
              <p>
                <span className="font-semibold">Place of Delivery:</span>
              </p>
            </div>
          </div>

          {/* Responsive table */}
          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full border border-gray-300 text-sm">
              <thead className="bg-gray-100">
                <tr className="text-left">
                  <th className="border border-gray-300 px-2 py-1">Sl No.</th>
                  <th className="border border-gray-300 px-2 py-1">
                    Item/Particulars
                  </th>
                  <th className="border border-gray-300 px-2 py-1">HSN Code</th>
                  <th className="border border-gray-300 px-2 py-1">Rate</th>
                  <th className="border border-gray-300 px-2 py-1">QTY</th>
                  <th className="border border-gray-300 px-2 py-1">
                    Taxable Value
                  </th>
                  <th className="border border-gray-300 px-2 py-1">
                    Tax Amount
                  </th>
                  <th className="border border-gray-300 px-2 py-1">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-2 py-1">1</td>
                  <td className="border border-gray-300 px-2 py-1">-</td>
                  <td className="border border-gray-300 px-2 py-1">-</td>
                  <td className="border border-gray-300 px-2 py-1">0.00</td>
                  <td className="border border-gray-300 px-2 py-1">0</td>
                  <td className="border border-gray-300 px-2 py-1">0.00</td>
                  <td className="border border-gray-300 px-2 py-1">0.00</td>
                  <td className="border border-gray-300 px-2 py-1">0.00</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="mt-4 space-y-1">
            <p>
              <span className="font-semibold">Taxable Amount:</span> ₹0.00
            </p>
            <p>
              <span className="font-semibold">CGST (9.0%):</span> ₹0.00
            </p>
            <p>
              <span className="font-semibold">SGST (9.0%):</span> ₹0.00
            </p>
            <p>
              <span className="font-semibold">Total (INR):</span> ₹0.00
            </p>
            <p>
              <span className="font-semibold">Amount in Words:</span> Zero
            </p>
          </div>

          {/* Bank details */}
          <div className="mt-6 space-y-1">
            <p className="font-semibold">Bank Details:</p>
            <p>Bank: HDFC BANK</p>
            <p>Account: 50200093163651</p>
            <p>IFSC CODE: HDFC0002841</p>
            <p>Branch: VIJAYA BANK LAYOUT</p>
          </div>

          <p className="mt-6 font-semibold text-center">
            RS HARDWARE GLASS & ELECTRICALS
          </p>
          <p className="text-center text-xs text-gray-500">
            This is a computer-generated invoice and does not need a signature.
          </p>
          <div className="mt-8 text-center">
            <PDFDownloadLink
              document={<InvoicePDF invoice={1} />}
              fileName={`Invoice-1.pdf`}
              className="bg-indigo-600 text-white px-4 py-2 rounded shadow hover:bg-indigo-700 font-semibold"
            >
              {({ loading }) =>
                loading ? 'Preparing PDF...' : 'Download Invoice'
              }
            </PDFDownloadLink>
          </div>
        </div>
      </>
    );
};

export default InvoiceDetails;
