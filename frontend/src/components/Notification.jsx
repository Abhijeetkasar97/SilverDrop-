import React, { useState, useEffect, useRef } from 'react';

const sampleNotifications = [
  { id: 1, title: 'New session scheduled', time: '2 hours ago', read: false },
  { id: 2, title: 'Receipt approved', time: '1 day ago', read: false },
  { id: 3, title: 'Password changed successfully', time: '3 days ago', read: true },
];

const Notification = () => {
  const [notifications, setNotifications] = useState(sampleNotifications);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Mark all as read
  const markAllRead = () => {
    setNotifications((prev) =>
      prev.map((n) => ({ ...n, read: true }))
    );
  };

  // Toggle individual notification read status
  const toggleRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, read: !n.read } : n
      )
    );
  };

  return (
    <div style={{ position: 'relative' }} ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          position: 'relative',
          fontSize: 20,
        }}
        aria-label="Notifications"
      >
        🔔
        {unreadCount > 0 && (
          <span style={styles.badge}>{unreadCount}</span>
        )}
      </button>

      {open && (
        <div style={styles.dropdown}>
          <div style={styles.header}>
            <span>Notifications</span>
            <button onClick={markAllRead} style={styles.markReadBtn}>
              Mark all read
            </button>
          </div>
          <ul style={styles.list}>
            {notifications.length === 0 && (
              <li style={styles.empty}>No notifications</li>
            )}
            {notifications.map(({ id, title, time, read }) => (
              <li
                key={id}
                style={{
                  ...styles.item,
                  backgroundColor: read ? '#f5f5f5' : '#e6f7ff',
                  fontWeight: read ? 'normal' : '600',
                }}
                onClick={() => toggleRead(id)}
                title="Click to mark read/unread"
              >
                <div>{title}</div>
                <small style={styles.time}>{time}</small>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const styles = {
  badge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: '#ff4d4f',
    color: 'white',
    borderRadius: '50%',
    padding: '2px 6px',
    fontSize: 12,
    fontWeight: 'bold',
  },
  dropdown: {
    position: 'absolute',
    right: 0,
    marginTop: 10,
    width: 280,
    maxHeight: 350,
    overflowY: 'auto',
    backgroundColor: 'white',
    borderRadius: 6,
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    zIndex: 1000,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 16px',
    borderBottom: '1px solid #ddd',
    fontWeight: '600',
  },
  markReadBtn: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#1890ff',
    cursor: 'pointer',
    fontSize: 14,
  },
  list: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
  item: {
    padding: '12px 16px',
    borderBottom: '1px solid #eee',
    cursor: 'pointer',
    userSelect: 'none',
  },
  time: {
    fontSize: 11,
    color: '#888',
  },
  empty: {
    padding: '20px 16px',
    textAlign: 'center',
    color: '#888',
  },
};

export default Notification;
