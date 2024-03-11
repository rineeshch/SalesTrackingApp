import React, { useState } from 'react';
import axios from 'axios';

function AddSaleRecordForm({ onSubmit }) {
  const [itemPurchased, setItemPurchased] = useState('');
  const [purchaseAmount, setPurchaseAmount] = useState('');
  const [paymentMode, setPaymentMode] = useState('');
  const [customerCount, setCustomerCount] = useState(1); // Initial customer count

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!itemPurchased || !purchaseAmount || !paymentMode) {
      alert('Please fill in all fields');
      return;
    }
    try {
      const record = {
        customerCount: customerCount,
        itemPurchased: itemPurchased,
        purchaseAmount: parseFloat(purchaseAmount),
        paymentMode: paymentMode,
        dateTime: formatDate(new Date())
      };
      await axios.post('http://localhost:3001/api/addSalesRecord', record);
      onSubmit(record);
      setItemPurchased('');
      setPurchaseAmount('');
      setPaymentMode('');
      setCustomerCount(customerCount + 1); // Increment customer count
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
        <option value="Online Service">Online Service</option>
        <option value="Lamination">Lamination</option>
        <option value="Colour Print">Colour Print</option>
        <option value="Pan Card">Pan Card</option>
        <option value="Scan">Scan</option>
        <option value="CV/Resume">CV/Resume</option>
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
