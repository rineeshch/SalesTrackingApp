import React from 'react';

function SalesRecordList({ records }) {
  if (!records) {
    return null; // or you can return a loading indicator
  }

  return (
    <div>
      <h2>Sales Records</h2>
      <ul>
        {records.map((record, index) => (
          <li key={index}>
            <p>Customer Count: {record.customerCount}</p>
            <p>Item Purchased: {record.itemPurchased}</p>
            <p>Purchase Amount: {record.purchaseAmount}</p>
            <p>Payment Mode: {record.paymentMode}</p>
            <p>Date & Time: {record.dateTime}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SalesRecordList;
