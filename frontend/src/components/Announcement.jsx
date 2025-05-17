import React, { useState, useEffect } from 'react';

const Announcement = ({ title, message, link, linkText }) => {
  const [visible, setVisible] = useState(true);

  // Persist dismiss state in localStorage (optional)
  useEffect(() => {
    const dismissed = localStorage.getItem('announcementDismissed');
    if (dismissed === 'true') setVisible(false);
  }, []);

  const dismiss = () => {
    setVisible(false);
    localStorage.setItem('announcementDismissed', 'true');
  };

  if (!visible) return null;

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <strong style={styles.title}>{title}</strong>
        <span style={styles.message}>{message}</span>
        {link && (
          <a href={link} target="_blank" rel="noopener noreferrer" style={styles.link}>
            {linkText || 'Learn more'}
          </a>
        )}
      </div>
      <button onClick={dismiss} style={styles.closeButton} aria-label="Dismiss announcement">
        &times;
      </button>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#fff3cd',
    border: '1px solid #ffeeba',
    color: '#856404',
    padding: '12px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: 14,
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  content: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
  },
  title: {
    fontWeight: '700',
  },
  message: {
    display: 'inline-block',
  },
  link: {
    color: '#856404',
    textDecoration: 'underline',
    fontWeight: '600',
  },
  closeButton: {
    background: 'transparent',
    border: 'none',
    fontSize: 20,
    cursor: 'pointer',
    lineHeight: 1,
    color: '#856404',
  },
};

export default Announcement;
