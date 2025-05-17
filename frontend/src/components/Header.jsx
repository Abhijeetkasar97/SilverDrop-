import React from 'react';

const Header = () => {
  return (
    <header
      style={{
        backgroundColor: '#4a5568', // slightly lighter gray
        color: 'white',
        padding: '15px 20px',
        fontSize: '20px',
        fontWeight: 'bold',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <div>Mentor Portal</div>
      {/* You can add user info or settings icon here */}
    </header>
  );
};

export default Header;
