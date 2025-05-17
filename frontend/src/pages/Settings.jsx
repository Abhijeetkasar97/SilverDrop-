import React, { useState, useEffect } from 'react';

const Settings = () => {
  // Sample user settings data - replace with real data fetching
  const [settings, setSettings] = useState({
    username: 'john_doe',
    email: 'john.doe@example.com',
    notifications: true,
    darkMode: false,
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const [editMode, setEditMode] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Reset errors on settings change
    setErrors({});
  }, [settings]);

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!settings.username.trim()) newErrors.username = 'Username is required.';
    if (!settings.email.trim()) newErrors.email = 'Email is required.';
    // Simple email regex validation example
    if (
      settings.email &&
      !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(settings.email)
    ) {
      newErrors.email = 'Invalid email address.';
    }

    if (settings.newPassword || settings.confirmNewPassword) {
      if (settings.newPassword !== settings.confirmNewPassword) {
        newErrors.confirmNewPassword = 'Passwords do not match.';
      }
      if (settings.newPassword.length > 0 && settings.newPassword.length < 6) {
        newErrors.newPassword = 'Password must be at least 6 characters.';
      }
      if (!settings.currentPassword) {
        newErrors.currentPassword = 'Current password is required to change password.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;

    // TODO: Save updated settings to backend or context
    alert('Settings saved successfully!');
    setEditMode(false);

    // Clear password fields after save for security
    setSettings(prev => ({
      ...prev,
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    }));
  };

  const handleCancel = () => {
    // TODO: Reload original settings from backend or context if needed
    setEditMode(false);
    setErrors({});
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>User Settings</h2>

      <div style={styles.formGroup}>
        <label style={styles.label}>Username</label>
        <input
          type="text"
          name="username"
          value={settings.username}
          onChange={handleChange}
          disabled={!editMode}
          style={styles.input}
        />
        {errors.username && <small style={styles.error}>{errors.username}</small>}
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Email</label>
        <input
          type="email"
          name="email"
          value={settings.email}
          onChange={handleChange}
          disabled={!editMode}
          style={styles.input}
        />
        {errors.email && <small style={styles.error}>{errors.email}</small>}
      </div>

      <div style={styles.formGroupCheckbox}>
        <label style={styles.label}>
          <input
            type="checkbox"
            name="notifications"
            checked={settings.notifications}
            onChange={handleChange}
            disabled={!editMode}
            style={{ marginRight: 8 }}
          />
          Enable Notifications
        </label>
      </div>

      <div style={styles.formGroupCheckbox}>
        <label style={styles.label}>
          <input
            type="checkbox"
            name="darkMode"
            checked={settings.darkMode}
            onChange={handleChange}
            disabled={!editMode}
            style={{ marginRight: 8 }}
          />
          Enable Dark Mode
        </label>
      </div>

      {editMode && (
        <>
          <div style={styles.divider} />

          <h3 style={styles.subTitle}>Change Password</h3>

          <div style={styles.formGroup}>
            <label style={styles.label}>Current Password</label>
            <input
              type="password"
              name="currentPassword"
              value={settings.currentPassword}
              onChange={handleChange}
              style={styles.input}
              autoComplete="current-password"
            />
            {errors.currentPassword && (
              <small style={styles.error}>{errors.currentPassword}</small>
            )}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>New Password</label>
            <input
              type="password"
              name="newPassword"
              value={settings.newPassword}
              onChange={handleChange}
              style={styles.input}
              autoComplete="new-password"
            />
            {errors.newPassword && <small style={styles.error}>{errors.newPassword}</small>}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Confirm New Password</label>
            <input
              type="password"
              name="confirmNewPassword"
              value={settings.confirmNewPassword}
              onChange={handleChange}
              style={styles.input}
              autoComplete="new-password"
            />
            {errors.confirmNewPassword && (
              <small style={styles.error}>{errors.confirmNewPassword}</small>
            )}
          </div>
        </>
      )}

      <div style={styles.buttons}>
        {editMode ? (
          <>
            <button onClick={handleSave} style={styles.saveBtn}>
              Save Changes
            </button>
            <button onClick={handleCancel} style={styles.cancelBtn}>
              Cancel
            </button>
          </>
        ) : (
          <button onClick={() => setEditMode(true)} style={styles.editBtn}>
            Edit Settings
          </button>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: 600,
    margin: '40px auto',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  title: {
    marginBottom: 25,
    color: '#333',
  },
  subTitle: {
    marginTop: 20,
    marginBottom: 15,
    color: '#444',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 18,
  },
  formGroupCheckbox: {
    marginBottom: 18,
  },
  label: {
    fontWeight: 600,
    marginBottom: 6,
    color: '#555',
    cursor: 'pointer',
  },
  input: {
    padding: '10px 12px',
    fontSize: 16,
    borderRadius: 4,
    border: '1px solid #ccc',
    outline: 'none',
  },
  error: {
    marginTop: 4,
    color: '#d9534f',
    fontSize: 13,
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    margin: '20px 0',
  },
  buttons: {
    marginTop: 30,
    display: 'flex',
    gap: 10,
    flexWrap: 'wrap',
  },
  editBtn: {
    flex: 1,
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    padding: '12px 15px',
    borderRadius: 6,
    cursor: 'pointer',
    fontWeight: '600',
  },
  saveBtn: {
    flex: 1,
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    padding: '12px 15px',
    borderRadius: 6,
    cursor: 'pointer',
    fontWeight: '600',
  },
  cancelBtn: {
    flex: 1,
    backgroundColor: '#6c757d',
    color: '#fff',
    border: 'none',
    padding: '12px 15px',
    borderRadius: 6,
    cursor: 'pointer',
    fontWeight: '600',
  },
};

export default Settings;
