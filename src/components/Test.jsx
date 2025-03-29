import React, { useRef } from 'react';
import { usePDF } from 'react-to-pdf';

function MyForm() {
  const formRef = useRef();
  const { toPDF } = usePDF({ filename: 'form.pdf' });

  const handleSubmit = async () => {
    await toPDF(formRef.current);
  };

  return (
    <div>
      <div ref={formRef}>
        {/* Form elements here */}
        <input type="text" placeholder="Name" />
        <input type="email" placeholder="Email" />
      </div>
      <button onClick={handleSubmit}>Generate PDF</button>
    </div>
  );
}
export  default MyForm;