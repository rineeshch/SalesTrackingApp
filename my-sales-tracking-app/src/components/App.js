// App.js
import React, { useState } from 'react';
import AddSaleRecordForm from './AddSaleRecordForm';
import SalesRecordList from './SalesRecordList';
import TotalSale from './TotalSale';
import './App.css';


function App() {
  const [records, setRecords] = useState([]);
  const [totalSale, setTotalSale] = useState(0);
  const [customerCount, setCustomerCount] = useState(0); // State to track customer count

  const addSaleRecord = (record) => {
    const updatedRecords = [...records, record];
    setRecords(updatedRecords);
    const total = updatedRecords.reduce((acc, curr) => acc + curr.purchaseAmount, 0);
    setTotalSale(total);
  };

  return (
    <div className="container">
      <h1 className="header">T-Logic Sales Tracking</h1>
      <AddSaleRecordForm onSubmit={addSaleRecord} customerCount={customerCount} /> {/* Pass customerCount */}
      <SalesRecordList records={records} />
      <TotalSale totalSale={totalSale} />
    </div>
  );
}

export default App;
