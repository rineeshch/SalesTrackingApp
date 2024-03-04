import React, { useState } from 'react';
import AddSaleRecordForm from './AddSaleRecordForm';
import SalesRecordList from './SalesRecordList';
import TotalSale from './TotalSale';
import LoginForm from './LoginForm';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = async (username, password) => {
    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (response.ok) {
        setIsLoggedIn(true);
      } else {
        alert('Invalid username or password');
      }
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please try again.');
    }
  };  

  return (
    <div className="container">
      <h1 className="header">T-Logic Sales Tracking</h1>
      {isLoggedIn ? (
        <>
          <AddSaleRecordForm />
          <SalesRecordList />
          <TotalSale />
        </>
      ) : (
        <LoginForm onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
