import React from 'react';

const SessionTable = ({ sessions }) => {
  if (!sessions || sessions.length === 0) return <p>No sessions available.</p>;

  return (
    <table
      style={{
        width: '100%',
        borderCollapse: 'collapse',
        color: 'white',
        backgroundColor: '#222',
        borderRadius: '8px',
        overflow: 'hidden',
      }}
    >
      <thead>
        <tr style={{ borderBottom: '1px solid #555' }}>
          <th style={{ padding: '12px', textAlign: 'left' }}>Session ID</th>
          <th style={{ padding: '12px', textAlign: 'left' }}>Mentor</th>
          <th style={{ padding: '12px', textAlign: 'left' }}>Date</th>
          <th style={{ padding: '12px', textAlign: 'right' }}>Duration (hrs)</th>
          <th style={{ padding: '12px', textAlign: 'right' }}>Status</th>
        </tr>
      </thead>
      <tbody>
        {sessions.map((session) => (
          <tr key={session.id} style={{ borderBottom: '1px solid #444' }}>
            <td style={{ padding: '10px' }}>{session.id}</td>
            <td style={{ padding: '10px' }}>{session.mentorName}</td>
            <td style={{ padding: '10px' }}>
              {new Date(session.date).toLocaleDateString()}
            </td>
            <td style={{ padding: '10px', textAlign: 'right' }}>{session.duration}</td>
            <td style={{ padding: '10px', textAlign: 'right' }}>{session.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SessionTable;
