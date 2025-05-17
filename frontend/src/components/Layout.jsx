import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div style={styles.appContainer}>
      <Sidebar />
      <div style={styles.mainArea}>
        <Navbar />
        <main style={styles.mainContent}>
          <Outlet /> {/* renders the matched child route */}
        </main>
        <Footer />
      </div>
    </div>
  );
};

const styles = {
  appContainer: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#f0f2f5',
  },
  mainArea: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  mainContent: {
    flex: 1,
    padding: '20px 30px',
    backgroundColor: 'white',
    overflowY: 'auto',
  },
};

export default Layout;
