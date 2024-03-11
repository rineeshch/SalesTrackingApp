import React, { useState, useEffect } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import AddSaleRecordForm from './AddSaleRecordForm';
import SalesRecordList from './SalesRecordList';
import TotalSale from './TotalSale';
import LoginForm from './LoginForm';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [salesRecords, setSalesRecords] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchSalesRecords = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/getSalesRecords');
        if (response.ok) {
          const data = await response.json();
          setSalesRecords(data);
        } else {
          console.error('Failed to fetch sales records');
        }
      } catch (error) {
        console.error('Failed to fetch sales records:', error);
      }
    };

    fetchSalesRecords();
  }, []);

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
        const userData = await response.json();
        setUser(userData);
      } else {
        alert('Invalid username or password');
      }
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please try again.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  const handleSubmit = async (record) => {
    setSalesRecords([...salesRecords, record]); // Add new record to the list
  };

  return (
    <div className="container">
      <h1 className="header">
        T-Logic Sales Tracking
        {isLoggedIn && (
          <button className="logout" onClick={handleLogout}>Logout</button>
        )}
      </h1>
      {isLoggedIn ? (
        <>
          <AddSaleRecordForm onSubmit={handleSubmit} />
          <SalesRecordList salesRecords={salesRecords} />
          <TotalSale salesRecords={salesRecords} />
        </>
      ) : (
        <LoginForm onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
