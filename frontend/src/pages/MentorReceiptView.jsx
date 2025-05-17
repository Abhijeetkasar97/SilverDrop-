import React from 'react';
import ReceiptDetails from '../components/ReceiptDetails';

// Dummy receipt for mentor view
const sampleReceipt = {
  mentorName: 'John Doe',
  date: '2025-05-16T10:00:00Z',
  tasks: [
    { description: 'Code Review', hours: 2, rate: 500, amount: 1000 },
    { description: 'Mentorship Session', hours: 1.5, rate: 500, amount: 750 },
  ],
  tax: 175,
  platformFee: 100,
  total: 2425,
};

const MentorReceiptView = () => {
  return (
    <div>
      <h1>Receipt Details</h1>
      <ReceiptDetails receipt={sampleReceipt} />
    </div>
  );
};

export default MentorReceiptView;
