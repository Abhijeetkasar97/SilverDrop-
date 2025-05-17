import React, { useState, useEffect } from 'react';

const Profile = () => {
  // Example user data - replace with actual fetched data or context
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Mentor',
    bio: 'Passionate about teaching and mentoring.',
  });

  const [editable, setEditable] = useState(false);
  const [formData, setFormData] = useState(user);

  useEffect(() => {
    setFormData(user);
  }, [user]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEditToggle = () => {
    setEditable(!editable);
  };

  const handleSave = () => {
    // TODO: Save changes to backend or context
    setUser(formData);
    setEditable(false);
  };

  const handleLogout = () => {
    // TODO: Implement logout logic (clear auth tokens, redirect, etc)
    alert('Logging out...');
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Profile</h2>
      <div style={styles.card}>
        <div style={styles.field}>
          <label style={styles.label}>Name:</label>
          {editable ? (
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={styles.input}
            />
          ) : (
            <p style={styles.text}>{user.name}</p>
          )}
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Email:</label>
          <p style={styles.text}>{user.email}</p>
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Role:</label>
          <p style={styles.text}>{user.role}</p>
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Bio:</label>
          {editable ? (
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              style={{ ...styles.input, height: '80px', resize: 'vertical' }}
            />
          ) : (
            <p style={styles.text}>{user.bio}</p>
          )}
        </div>

        <div style={styles.buttons}>
          {editable ? (
            <>
              <button onClick={handleSave} style={styles.saveBtn}>
                Save
              </button>
              <button onClick={handleEditToggle} style={styles.cancelBtn}>
                Cancel
              </button>
            </>
          ) : (
            <button onClick={handleEditToggle} style={styles.editBtn}>
              Edit Profile
            </button>
          )}

          <button onClick={handleLogout} style={styles.logoutBtn}>
            Logout
          </button>
        </div>
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
  heading: {
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    fontWeight: '600',
    marginBottom: 6,
    color: '#555',
  },
  input: {
    padding: '8px 10px',
    fontSize: 16,
    borderRadius: 4,
    border: '1px solid #ccc',
    outline: 'none',
  },
  text: {
    fontSize: 16,
    color: '#222',
    margin: 0,
  },
  buttons: {
    marginTop: 25,
    display: 'flex',
    justifyContent: 'space-between',
    gap: 10,
    flexWrap: 'wrap',
  },
  editBtn: {
    flex: 1,
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    padding: '10px 15px',
    borderRadius: 5,
    cursor: 'pointer',
    fontWeight: '600',
  },
  saveBtn: {
    flex: 1,
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    padding: '10px 15px',
    borderRadius: 5,
    cursor: 'pointer',
    fontWeight: '600',
  },
  cancelBtn: {
    flex: 1,
    backgroundColor: '#6c757d',
    color: '#fff',
    border: 'none',
    padding: '10px 15px',
    borderRadius: 5,
    cursor: 'pointer',
    fontWeight: '600',
  },
  logoutBtn: {
    flex: 1,
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    padding: '10px 15px',
    borderRadius: 5,
    cursor: 'pointer',
    fontWeight: '600',
  },
};

export default Profile;
