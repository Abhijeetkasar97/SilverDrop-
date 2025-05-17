import React from 'react';

const ReceiptDetails = ({ receipt }) => {
  if (!receipt) return <p>No receipt selected.</p>;

  return (
    <div
      style={{
        background: '#1f1f1f',
        padding: '25px',
        borderRadius: '12px',
        color: 'white',
        maxWidth: '700px',
        margin: 'auto',
      }}
    >
      <h2>Receipt Details</h2>
      <p>
        <strong>Mentor:</strong> {receipt.mentorName}
      </p>
      <p>
        <strong>Date:</strong> {new Date(receipt.date).toLocaleString()}
      </p>
      <hr style={{ borderColor: '#444', margin: '15px 0' }} />
      <div>
        <h3>Tasks</h3>
        {receipt.tasks.map((task, idx) => (
          <div key={idx} style={{ marginBottom: '10px' }}>
            <div><strong>Description:</strong> {task.description}</div>
            <div><strong>Hours:</strong> {task.hours}</div>
            <div><strong>Rate/hr:</strong> ₹{task.rate}</div>
            <div><strong>Amount:</strong> ₹{task.amount}</div>
          </div>
        ))}
      </div>
      <hr style={{ borderColor: '#444', margin: '15px 0' }} />
      <p><strong>Tax:</strong> ₹{receipt.tax}</p>
      <p><strong>Platform Fee:</strong> ₹{receipt.platformFee}</p>
      <h3>Total Payable: ₹{receipt.total}</h3>
    </div>
  );
};

export default ReceiptDetails;
