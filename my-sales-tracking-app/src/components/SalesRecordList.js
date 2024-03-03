// SalesRecordList.js
import React from 'react';

function SalesRecordList({ records }) {
  return (
    <div className="record-list">
      <h2>Sales Records</h2>
      <table>
        <thead>
          <tr>
            <th>No. of Customer</th> {/* Change from Customer Name to No. of Customer */}
            <th>Item Purchased</th>
            <th>Purchase Amount</th>
            <th>Mode of Payment</th>
            <th>Date & Time</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record, index) => (
            <tr key={index}>
              <td>{record.noOfCustomer}</td> {/* Use noOfCustomer instead of customerName */}
              <td>{record.itemPurchased}</td>
              <td>₹{record.purchaseAmount}</td>
              <td>{record.modeOfPayment}</td>
              <td>{record.datetime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SalesRecordList;
