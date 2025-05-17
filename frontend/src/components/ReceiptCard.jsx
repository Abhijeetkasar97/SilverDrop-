import React from 'react';

const ReceiptCard = ({ receipt }) => {
  if (!receipt) return null;

  return (
    <div
      style={{
        background: '#222',
        padding: '20px',
        borderRadius: '10px',
        marginBottom: '20px',
        color: 'white',
        maxWidth: '500px',
      }}
    >
      <h3>Receipt for {receipt.mentorName}</h3>
      <p>Date: {new Date(receipt.date).toLocaleDateString()}</p>

      <table style={{ width: '100%', marginTop: '10px', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ borderBottom: '1px solid #555', textAlign: 'left' }}>Task</th>
            <th style={{ borderBottom: '1px solid #555', textAlign: 'right' }}>Hours</th>
            <th style={{ borderBottom: '1px solid #555', textAlign: 'right' }}>Rate/hr</th>
            <th style={{ borderBottom: '1px solid #555', textAlign: 'right' }}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {receipt?.tasks?.map((task, idx) => (
  <tr key={idx}>
    <td style={{ padding: '6px 0' }}>{task.description}</td>
    <td style={{ padding: '6px 0', textAlign: 'right' }}>{task.hours}</td>
    <td style={{ padding: '6px 0', textAlign: 'right' }}>₹{task.rate}</td>
    <td style={{ padding: '6px 0', textAlign: 'right' }}>₹{task.amount}</td>
  </tr>
))}

        </tbody>
      </table>

      <div
        style={{
          borderTop: '1px solid #555',
          marginTop: '15px',
          paddingTop: '10px',
          textAlign: 'right',
        }}
      >
        <p>Tax: ₹{receipt.tax}</p>
        <p>Platform Fee: ₹{receipt.platformFee}</p>
        <h4>Total: ₹{receipt.total}</h4>
      </div>
    </div>
  );
};

export default ReceiptCard;
