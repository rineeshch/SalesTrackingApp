import React from 'react';

function TotalSale({ salesRecords }) {
  const totalSale = salesRecords ? salesRecords.reduce((acc, record) => acc + record.purchaseAmount, 0) : 0;

  return (
    <div className="total-sale">
      <p>Total Sale: {totalSale}</p>
    </div>
  );
}

export default TotalSale;
