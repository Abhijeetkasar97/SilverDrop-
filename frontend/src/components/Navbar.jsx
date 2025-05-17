import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaBell, FaBullhorn, FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
  const [notifOpen, setNotifOpen] = useState(false);
  const [announceOpen, setAnnounceOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  const notifRef = useRef();
  const announceRef = useRef();
  const profileRef = useRef();

  // Close dropdowns if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        notifRef.current && !notifRef.current.contains(event.target)
      ) setNotifOpen(false);
      if (
        announceRef.current && !announceRef.current.contains(event.target)
      ) setAnnounceOpen(false);
      if (
        profileRef.current && !profileRef.current.contains(event.target)
      ) setProfileOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const notifications = [
    'New assignment uploaded',
    'Session starting in 30 mins',
    'Payment received',
  ];

  const announcements = [
    'Platform maintenance on May 25',
    'New feature released!',
  ];

  const handleLogout = () => {
    // Clear auth tokens or user session here
    navigate('/login');
  };

  return (
    <nav
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        height: 60,
        backgroundColor: '#2D3748',
        color: 'white',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
      }}
    >
      {/* Brand */}
      <div
        style={{
          fontWeight: 'bold',
          fontSize: 20,
          cursor: 'pointer',
          color: '#63B3ED',
        }}
        onClick={() => navigate('/')}
      >
        EdTech Portal
      </div>

      {/* Navigation Links */}
      <div style={{ display: 'flex', gap: 24 }}>
        <NavLink
          to="/admin/dashboard"
          style={({ isActive }) => ({
            color: isActive ? '#63B3ED' : 'white',
            textDecoration: 'none',
            fontWeight: isActive ? 'bold' : 'normal',
          })}
        >
          Admin
        </NavLink>

        <NavLink
          to="/mentor/dashboard"
          style={({ isActive }) => ({
            color: isActive ? '#63B3ED' : 'white',
            textDecoration: 'none',
            fontWeight: isActive ? 'bold' : 'normal',
          })}
        >
          Mentor
        </NavLink>
      </div>

      {/* Right side: Notifications, Announcements, Profile */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        {/* Notifications */}
        <div ref={notifRef} style={{ position: 'relative' }}>
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            aria-label="Notifications"
            style={iconButtonStyle}
          >
            <FaBell size={20} />
            <span style={badgeStyle}>{notifications.length}</span>
          </button>
          {notifOpen && (
            <DropdownMenu items={notifications} emptyMessage="No new notifications" />
          )}
        </div>

        {/* Announcements */}
        <div ref={announceRef} style={{ position: 'relative' }}>
          <button
            onClick={() => setAnnounceOpen(!announceOpen)}
            aria-label="Announcements"
            style={iconButtonStyle}
          >
            <FaBullhorn size={20} />
            <span style={badgeStyle}>{announcements.length}</span>
          </button>
          {announceOpen && (
            <DropdownMenu items={announcements} emptyMessage="No announcements" />
          )}
        </div>

        {/* Profile */}
        <div ref={profileRef} style={{ position: 'relative' }}>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            style={{
              ...iconButtonStyle,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontWeight: 'bold',
            }}
            aria-haspopup="true"
            aria-expanded={profileOpen}
          >
            <FaUserCircle size={22} />
            <span>Profile ▼</span>
          </button>
          {profileOpen && (
            <div style={profileDropdownStyle}>
              <button onClick={() => { setProfileOpen(false); navigate('/profile'); }} style={dropdownItemStyle}>Profile</button>
              <button onClick={() => { setProfileOpen(false); navigate('/settings'); }} style={dropdownItemStyle}>Settings</button>
              <hr style={{ margin: '8px 0', borderColor: '#eee' }} />
              <button onClick={handleLogout} style={dropdownItemStyle}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

const iconButtonStyle = {
  background: 'none',
  border: 'none',
  color: 'white',
  cursor: 'pointer',
  position: 'relative',
};

const badgeStyle = {
  position: 'absolute',
  top: -5,
  right: -5,
  background: 'red',
  color: 'white',
  borderRadius: '50%',
  padding: '2px 6px',
  fontSize: 10,
  fontWeight: 'bold',
  userSelect: 'none',
};

const dropdownMenuStyle = {
  position: 'absolute',
  right: 0,
  top: 'calc(100% + 8px)',
  backgroundColor: 'white',
  color: '#2D3748',
  borderRadius: 6,
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  minWidth: 220,
  maxHeight: 280,
  overflowY: 'auto',
  zIndex: 1001,
  padding: '10px 0',
};

const dropdownItemStyle = {
  padding: '10px 16px',
  width: '100%',
  background: 'none',
  border: 'none',
  textAlign: 'left',
  cursor: 'pointer',
  fontSize: 14,
  color: '#2D3748',
  outline: 'none',
};

const profileDropdownStyle = {
  ...dropdownMenuStyle,
  minWidth: 160,
};

const DropdownMenu = ({ items, emptyMessage }) => (
  <div style={dropdownMenuStyle}>
    {items.length === 0 ? (
      <div style={{ padding: '8px 16px', fontStyle: 'italic' }}>{emptyMessage}</div>
    ) : (
      items.map((item, i) => (
        <div
          key={i}
          style={{
            padding: '8px 16px',
            borderBottom: i !== items.length - 1 ? '1px solid #eee' : 'none',
            fontSize: 14,
          }}
        >
          {item}
        </div>
      ))
    )}
  </div>
);

export default Navbar;
