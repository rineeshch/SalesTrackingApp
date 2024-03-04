import React from 'react';
import './SalesRecordList.css'; // Import CSS file for styling

function SalesRecordList({ salesRecords }) {
  return (
    <div className="sales-record-list">
      <h2>Sales Records</h2>
      <table>
        <thead>
          <tr>
            <th>Customer Count</th>
            <th>Item Purchased</th>
            <th>Amount</th>
            <th>Payment Mode</th>
            <th>Date & Time</th>
          </tr>
        </thead>
        <tbody>
          {salesRecords.map((record, index) => (
            <tr key={index}>
              <td>{record.customerCount}</td>
              <td>{record.itemPurchased}</td>
              <td>{record.purchaseAmount}</td>
              <td>{record.paymentMode}</td>
              <td>{record.dateTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SalesRecordList;
