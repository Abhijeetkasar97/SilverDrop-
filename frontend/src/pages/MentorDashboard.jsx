import React, { useState } from 'react';

const sampleSessions = [
  { id: 'S001', date: '2025-05-10', student: 'Alice', topic: 'React Basics', duration: 2, status: 'Completed' },
  { id: 'S002', date: '2025-05-12', student: 'Bob', topic: 'Advanced JS', duration: 1.5, status: 'Completed' },
  { id: 'S003', date: '2025-05-14', student: 'Charlie', topic: 'Node.js Intro', duration: 2, status: 'Pending' },
  { id: 'S004', date: '2025-05-15', student: 'Diana', topic: 'CSS Grid', duration: 1, status: 'Completed' },
  { id: 'S005', date: '2025-05-16', student: 'Eve', topic: 'React Hooks', duration: 1.5, status: 'Completed' },
  { id: 'S006', date: '2025-05-17', student: 'Frank', topic: 'MongoDB Basics', duration: 2, status: 'Pending' },
];

const MentorDashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const sessionsPerPage = 4;

  // Pagination logic
  const indexOfLast = currentPage * sessionsPerPage;
  const indexOfFirst = indexOfLast - sessionsPerPage;
  const currentSessions = sampleSessions.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(sampleSessions.length / sessionsPerPage);

  const totalSessions = sampleSessions.length;
  const totalEarnings = sampleSessions.reduce((acc, s) => s.status === 'Completed' ? acc + s.duration * 500 : acc, 0); // Example rate ₹500/hr
  const pendingPayments = sampleSessions.filter(s => s.status === 'Pending').length;

  return (
    <div style={{ padding: 24, fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", color: '#2d3748' }}>
      <h1 style={{ marginBottom: 24 }}>Welcome back, Mentor!</h1>

      {/* Summary cards */}
      <div style={{ display: 'flex', gap: 20, marginBottom: 32, flexWrap: 'wrap' }}>
        {[
          { label: 'Total Sessions', value: totalSessions, bgColor: '#3182ce' },
          { label: 'Total Earnings', value: `₹${totalEarnings}`, bgColor: '#38a169' },
          { label: 'Pending Payments', value: pendingPayments, bgColor: '#dd6b20' },
        ].map(({ label, value, bgColor }) => (
          <div
            key={label}
            style={{
              backgroundColor: bgColor,
              color: 'white',
              padding: 20,
              borderRadius: 8,
              flex: '1 1 200px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
            }}
          >
            <p style={{ fontSize: 16, opacity: 0.8 }}>{label}</p>
            <p style={{ fontSize: 28, fontWeight: 'bold', marginTop: 8 }}>{value}</p>
          </div>
        ))}
      </div>

      {/* Recent sessions table */}
      <h2 style={{ marginBottom: 16 }}>Recent Sessions</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead style={{ backgroundColor: '#3182ce', color: 'white' }}>
          <tr>
            <th style={{ padding: 12, textAlign: 'left' }}>Date</th>
            <th style={{ padding: 12, textAlign: 'left' }}>Student</th>
            <th style={{ padding: 12, textAlign: 'left' }}>Topic</th>
            <th style={{ padding: 12, textAlign: 'right' }}>Duration (hrs)</th>
            <th style={{ padding: 12, textAlign: 'left' }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {currentSessions.map(({ id, date, student, topic, duration, status }) => (
            <tr key={id} style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: 12 }}>{date}</td>
              <td style={{ padding: 12 }}>{student}</td>
              <td style={{ padding: 12 }}>{topic}</td>
              <td style={{ padding: 12, textAlign: 'right' }}>{duration}</td>
              <td style={{ padding: 12 }}>
                <span
                  style={{
                    padding: '4px 10px',
                    borderRadius: 12,
                    color: 'white',
                    backgroundColor: status === 'Completed' ? '#38a169' : '#dd6b20',
                    fontWeight: 'bold',
                    fontSize: '0.85rem',
                  }}
                >
                  {status}
                </span>
              </td>
            </tr>
          ))}
          {currentSessions.length === 0 && (
            <tr>
              <td colSpan="5" style={{ padding: 20, textAlign: 'center' }}>
                No sessions found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div style={{ marginTop: 20, display: 'flex', justifyContent: 'center', gap: 10 }}>
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          style={{
            padding: '8px 14px',
            borderRadius: 6,
            border: 'none',
            backgroundColor: currentPage === 1 ? '#ccc' : '#3182ce',
            color: 'white',
            cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
          }}
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, i) => {
          const page = i + 1;
          return (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              style={{
                padding: '8px 14px',
                borderRadius: 6,
                border: 'none',
                backgroundColor: page === currentPage ? '#2b6cb0' : '#3182ce',
                color: 'white',
                cursor: 'pointer',
              }}
            >
              {page}
            </button>
          );
        })}

        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          style={{
            padding: '8px 14px',
            borderRadius: 6,
            border: 'none',
            backgroundColor: currentPage === totalPages ? '#ccc' : '#3182ce',
            color: 'white',
            cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MentorDashboard;
