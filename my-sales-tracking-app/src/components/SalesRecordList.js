// SalesRecordList.js
import React from 'react';

const SalesRecordList = ({ records }) => {
  return (
    <div className="sales-record-list">
      <h2>Sales Records</h2>
      <table>
        <thead>
          <tr>
            <th>No. of Customer</th>
            <th>Item Purchased</th>
            <th>Purchase Amount</th>
            <th>Mode of Payment</th>
            <th>Date & Time</th>
          </tr>
        </thead>
        <tbody>
        {records.map((record, index) => (
        <tr key={index}>
        <td>{record.customerCount}</td>
        <td>{record.itemPurchased}</td>
        <td>{record.purchaseAmount}</td>
        <td>{record.paymentMode}</td> {/* Use paymentMode instead of modeOfPayment */}
        <td>{record.dateTime}</td>
        </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesRecordList;
