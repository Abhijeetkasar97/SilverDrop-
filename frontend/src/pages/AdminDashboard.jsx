import React from 'react';

const AdminDashboard = () => {
  // Example data - replace with real API data as needed
  const stats = [
    { title: 'Total Sessions', value: 120, icon: '📅' },
    { title: 'Total Receipts', value: 85, icon: '🧾' },
    { title: 'Active Mentors', value: 15, icon: '👨‍🏫' },
    { title: 'Pending Approvals', value: 5, icon: '⏳' },
  ];

  const recentActivities = [
    { id: 1, activity: 'Mentor John approved receipt #R1001', date: '2025-05-14' },
    { id: 2, activity: 'New mentor registration: Jane Doe', date: '2025-05-13' },
    { id: 3, activity: 'Session #S250 completed', date: '2025-05-12' },
    { id: 4, activity: 'Admin updated payout settings', date: '2025-05-10' },
  ];

  return (
    <div style={{ padding: 20, color: '#2d3748' }}>
      <h1 style={{ marginBottom: 20, fontSize: '2rem', fontWeight: 'bold' }}>
        Admin Dashboard
      </h1>

      {/* Stats Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 20,
          marginBottom: 40,
        }}
      >
        {stats.map(({ title, value, icon }) => (
          <div
            key={title}
            style={{
              backgroundColor: '#3182ce',
              color: 'white',
              padding: 20,
              borderRadius: 8,
              boxShadow: '0 4px 12px rgba(49,130,206,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontWeight: 'bold',
              fontSize: '1.2rem',
              cursor: 'default',
              userSelect: 'none',
            }}
          >
            <span>{title}</span>
            <span style={{ fontSize: '1.8rem' }}>{icon}</span>
            <span style={{ fontSize: '2rem' }}>{value}</span>
          </div>
        ))}
      </div>

      {/* Placeholder for Chart */}
      <div
        style={{
          marginBottom: 40,
          padding: 20,
          backgroundColor: '#edf2f7',
          borderRadius: 8,
          minHeight: '200px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#718096',
          fontStyle: 'italic',
          fontSize: '1.2rem',
        }}
      >
        Chart coming soon...
      </div>

      {/* Recent Activities Table */}
      <div>
        <h2 style={{ marginBottom: 10, fontWeight: 'bold' }}>Recent Activities</h2>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            boxShadow: '0 0 10px rgba(0,0,0,0.05)',
          }}
        >
          <thead style={{ backgroundColor: '#2b6cb0', color: 'white' }}>
            <tr>
              <th style={{ padding: '10px', textAlign: 'left' }}>Activity</th>
              <th style={{ padding: '10px', textAlign: 'right', width: '150px' }}>Date</th>
            </tr>
          </thead>
          <tbody>
            {recentActivities.map(({ id, activity, date }) => (
              <tr key={id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '12px 10px' }}>{activity}</td>
                <td style={{ padding: '12px 10px', textAlign: 'right' }}>{date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
