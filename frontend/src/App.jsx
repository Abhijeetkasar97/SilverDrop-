// App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Layout from './components/Layout';
import AdminDashboard from './pages/AdminDashboard';
import AdminReceiptList from './pages/AdminReceiptList';
import AdminSessionList from './pages/AdminSessionList';
import Chat from './pages/Chat';
import Login from './pages/Login';
import MentorDashboard from './pages/MentorDashboard';
import MentorReceiptView from './pages/MentorReceiptView';
import Register from './pages/Register';
import Setting from './pages/Settings';
import Notification from './components/Notification';
import Announcement from './components/Announcement';
import Profile from './pages/Profile';


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/login" replace />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        {/* Admin routes */}
        <Route path="admin/dashboard" element={<AdminDashboard />} />
        <Route path="admin/sessions" element={<AdminSessionList />} />
        <Route path="admin/receipts" element={<AdminReceiptList />} />

        {/* Mentor routes */}
        <Route path="mentor/dashboard" element={<MentorDashboard />} />
        <Route path="mentor/receipts/:id" element={<MentorReceiptView />} />

        {/* Other */}
        <Route path="chat" element={<Chat />} />
        <Route path="*" element={<h2>404 Not Found</h2>} />
      
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Setting />} />
        <Route path="/notifications" element={<Notification />} />
        <Route path="/announcements" element={<Announcement />} />

      </Route>
    </Routes>
  );
};

export default App;
