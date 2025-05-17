import React, { useState, useEffect } from 'react';

const sampleReceipts = [
  {
    id: 'R001',
    mentor: 'John Doe',
    date: '2025-05-10',
    totalAmount: 1500,
    status: 'Paid',
  },
  {
    id: 'R002',
    mentor: 'Jane Smith',
    date: '2025-05-12',
    totalAmount: 2000,
    status: 'Pending',
  },
  {
    id: 'R003',
    mentor: 'Mark Lee',
    date: '2025-05-15',
    totalAmount: 1800,
    status: 'Paid',
  },
  // Add more sample receipts here
];

const AdminReceiptList = () => {
  const [receipts, setReceipts] = useState(sampleReceipts);
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState('date');
  const [sortAsc, setSortAsc] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const receiptsPerPage = 5;

  // Filter and sort receipts based on search and sorting state
  const filteredReceipts = receipts
    .filter(
      (r) =>
        r.mentor.toLowerCase().includes(search.toLowerCase()) ||
        r.id.toLowerCase().includes(search.toLowerCase()) ||
        r.status.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (a[sortField] < b[sortField]) return sortAsc ? -1 : 1;
      if (a[sortField] > b[sortField]) return sortAsc ? 1 : -1;
      return 0;
    });

  // Pagination logic
  const indexOfLast = currentPage * receiptsPerPage;
  const indexOfFirst = indexOfLast - receiptsPerPage;
  const currentReceipts = filteredReceipts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredReceipts.length / receiptsPerPage);

  const handleSort = (field) => {
    if (field === sortField) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1
        style={{
          marginBottom: 20,
          fontSize: '2rem',
          fontWeight: 'bold',
          color: '#2d3748',
        }}
      >
        Admin Receipts
      </h1>

      <input
        type="text"
        placeholder="Search by mentor, receipt ID, or status"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: '10px',
          width: '100%',
          maxWidth: 400,
          marginBottom: 20,
          borderRadius: 6,
          border: '1px solid #ccc',
          fontSize: 16,
        }}
      />

      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          boxShadow: '0 0 10px rgba(0,0,0,0.05)',
          color: '#2d3748',
        }}
      >
        <thead style={{ backgroundColor: '#2b6cb0', color: 'white' }}>
          <tr>
            <th
              onClick={() => handleSort('id')}
              style={{ padding: '10px', cursor: 'pointer', userSelect: 'none' }}
            >
              Receipt ID {sortField === 'id' ? (sortAsc ? '▲' : '▼') : ''}
            </th>
            <th
              onClick={() => handleSort('mentor')}
              style={{ padding: '10px', cursor: 'pointer', userSelect: 'none' }}
            >
              Mentor {sortField === 'mentor' ? (sortAsc ? '▲' : '▼') : ''}
            </th>
            <th
              onClick={() => handleSort('date')}
              style={{ padding: '10px', cursor: 'pointer', userSelect: 'none' }}
            >
              Date {sortField === 'date' ? (sortAsc ? '▲' : '▼') : ''}
            </th>
            <th
              onClick={() => handleSort('totalAmount')}
              style={{ padding: '10px', cursor: 'pointer', userSelect: 'none', textAlign: 'right' }}
            >
              Amount {sortField === 'totalAmount' ? (sortAsc ? '▲' : '▼') : ''}
            </th>
            <th
              onClick={() => handleSort('status')}
              style={{ padding: '10px', cursor: 'pointer', userSelect: 'none' }}
            >
              Status {sortField === 'status' ? (sortAsc ? '▲' : '▼') : ''}
            </th>
          </tr>
        </thead>
        <tbody>
          {currentReceipts.length > 0 ? (
            currentReceipts.map(({ id, mentor, date, totalAmount, status }) => (
              <tr key={id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '12px 10px' }}>{id}</td>
                <td style={{ padding: '12px 10px' }}>{mentor}</td>
                <td style={{ padding: '12px 10px' }}>{date}</td>
                <td style={{ padding: '12px 10px', textAlign: 'right' }}>₹{totalAmount}</td>
                <td style={{ padding: '12px 10px' }}>
                  <span
                    style={{
                      padding: '4px 8px',
                      borderRadius: 12,
                      color: 'white',
                      backgroundColor: status.toLowerCase() === 'paid' ? 'green' : '#d69e2e',
                      fontWeight: 'bold',
                      fontSize: '0.85rem',
                    }}
                  >
                    {status}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center', padding: 20 }}>
                No receipts found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div
        style={{
          marginTop: 20,
          display: 'flex',
          justifyContent: 'center',
          gap: 10,
          flexWrap: 'wrap',
        }}
      >
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          style={{
            padding: '8px 14px',
            borderRadius: 6,
            border: 'none',
            backgroundColor: currentPage === 1 ? '#ccc' : '#3182ce',
            color: 'white',
            cursor: currentPage === 1 ? 'default' : 'pointer',
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
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          style={{
            padding: '8px 14px',
            borderRadius: 6,
            border: 'none',
            backgroundColor: currentPage === totalPages ? '#ccc' : '#3182ce',
            color: 'white',
            cursor: currentPage === totalPages ? 'default' : 'pointer',
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminReceiptList;
