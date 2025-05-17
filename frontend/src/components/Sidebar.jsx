import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaChalkboardTeacher,
  FaClipboardList,
  FaComments,
  FaUserTie,
  FaSignOutAlt,
  FaUserPlus,
  FaSignInAlt
} from 'react-icons/fa';

const Sidebar = () => {
  const linkStyle = ({ isActive }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '12px 20px',
    color: isActive ? '#fff' : '#ccc',
    backgroundColor: isActive ? '#4a5568' : 'transparent',
    textDecoration: 'none',
    fontWeight: isActive ? 'bold' : 'normal',
    transition: 'background-color 0.2s',
  });

  return (
    <aside
      style={{
        width: '240px',
        background: '#2d3748',
        color: 'white',
        minHeight: '100vh',
        paddingTop: '20px',
        boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
      }}
    >
      <h2 style={{ padding: '0 20px 10px', fontSize: '20px', fontWeight: 'bold' }}>
        Mentor Portal
      </h2>

      <NavLink to="/login" style={linkStyle}><FaSignInAlt /> Login</NavLink>
      <NavLink to="/register" style={linkStyle}><FaUserPlus /> Register</NavLink>

      <hr style={{ borderColor: '#555', margin: '10px 0' }} />

      <NavLink to="/admin/dashboard" style={linkStyle}><FaTachometerAlt /> Admin Dashboard</NavLink>
      <NavLink to="/admin/sessions" style={linkStyle}><FaChalkboardTeacher /> Sessions</NavLink>
      <NavLink to="/admin/receipts" style={linkStyle}><FaClipboardList /> Receipts</NavLink>

      <hr style={{ borderColor: '#555', margin: '10px 0' }} />

      <NavLink to="/mentor/dashboard" style={linkStyle}><FaUserTie /> Mentor Dashboard</NavLink>
      <NavLink to="/chat" style={linkStyle}><FaComments /> Chat</NavLink>

      <hr style={{ borderColor: '#555', margin: '10px 0' }} />

      <NavLink to="/logout" style={linkStyle}><FaSignOutAlt /> Logout</NavLink>
    </aside>
  );
};

export default Sidebar;
