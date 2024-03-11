// SignUpForm.js
import React, { useState } from 'react';

function SignUpForm({ onSignUp }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSignUp(username, password, repeatPassword);
    setUsername('');
    setPassword('');
    setRepeatPassword('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Username:</label>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      <label>Password:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <label>Repeat Password:</label>
      <input type="password" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} />
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default SignUpForm;
