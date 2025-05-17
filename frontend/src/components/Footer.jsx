import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <p style={styles.text}>
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </p>
        <div style={styles.links}>
          <a href="/privacy" style={styles.link}>Privacy Policy</a>
          <a href="/terms" style={styles.link}>Terms of Service</a>
          <a href="/contact" style={styles.link}>Contact Us</a>
        </div>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#1a202c', // dark navy
    padding: '20px 0',
    color: '#cbd5e0', // light gray
    marginTop: 'auto',
  },
  container: {
    width: '90%',
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  text: {
    margin: '0 0 10px 0',
    fontSize: '14px',
  },
  links: {
    display: 'flex',
    gap: '15px',
  },
  link: {
    color: '#63b3ed', // soft blue
    textDecoration: 'none',
    fontSize: '14px',
  },
};

export default Footer;
