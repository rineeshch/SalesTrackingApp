// AddSaleRecordForm.js
import React, { useState } from 'react';
import axios from 'axios';

function AddSaleRecordForm({ onSubmit, customerCount }) {
  const [itemPurchased, setItemPurchased] = useState('');
  const [purchaseAmount, setPurchaseAmount] = useState('');
  const [paymentMode, setPaymentMode] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!itemPurchased || !purchaseAmount || !paymentMode) {
      alert('Please fill in all fields');
      return;
    }
    const record = {
      noOfCustomer: customerCount + 1,
      itemPurchased,
      purchaseAmount: parseFloat(purchaseAmount),
      modeOfPayment: paymentMode,
      datetime: formatDate(new Date())
    };
    try {
      await axios.post('http://localhost:3001/api/addSalesRecord', { dateKey: formatDate(new Date()), record });
      onSubmit(record);
      setItemPurchased('');
      setPurchaseAmount('');
      setPaymentMode('');
    } catch (error) {
      console.error('Failed to add sales record:', error);
      alert('Failed to add sales record. Please try again.');
    }
  };

  const formatDate = (date) => {
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    };
    return new Intl.DateTimeFormat('en-IN', options).format(date);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <select
        value={itemPurchased}
        onChange={(e) => setItemPurchased(e.target.value)}
      >
        <option value="">Select Item Purchased</option>
        <option value="Print">Print</option>
        <option value="Photostat">Photostat</option>
        <option value="Lamination">Lamination</option>
        <option value="Other">Other</option>
      </select>
      <input
        type="number"
        placeholder="Amount"
        value={purchaseAmount}
        onChange={(e) => setPurchaseAmount(e.target.value)}
      />
      <select
        value={paymentMode}
        onChange={(e) => setPaymentMode(e.target.value)}
      >
        <option value="">Select Payment Mode</option>
        <option value="UPI">UPI</option>
        <option value="Cash">Cash</option>
      </select>
      <button type="submit">Add Sale Record</button>
    </form>
  );
}

export default AddSaleRecordForm;
