// LoginForm.js
import React, { useState } from 'react';
import './LoginForm.css'; // Import the CSS file for styling

function LoginForm({ onLogin, onSignUp }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    onLogin(username, password);
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        alert('User account created successfully');
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to create user account');
      }
    } catch (error) {
      console.error('Error creating user account:', error);
      alert('Failed to create user account. Please try again.');
    }
  };

  return (
    <form className="login-form">
      <h2>Login</h2>
      <label>Username:</label>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      <label>Password:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLoginSubmit}>Login</button>
      <div className="sign-up">
        Don't have an account? <a href="#" onClick={handleSignUpSubmit}>Sign Up</a>
      </div>
    </form>
  );
}

export default LoginForm;
