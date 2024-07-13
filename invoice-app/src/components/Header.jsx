import React from 'react';

const Header = ({ invoiceInfo, handleInvoiceInfoChange }) => (
  <div className="header">
    <h1>MDG Foods Ltd</h1>
    <p>Unit 6A Millennia Park</p>
    <p>Thornes Rd, Wakefield - WF2 8PW</p>
    <p>Mob: 07984 143344</p>
    <p>Email: mdgfoods@hotmail.com</p>

    <div className="invoice-details">
      <div>
        <label>Invoice To:</label>
        <input
          type="text"
          name="invoiceTo"
          value={invoiceInfo.invoiceTo}
          onChange={handleInvoiceInfoChange}
        />
      </div>
      <div>
        <label>Delivery To:</label>
        <input
          type="text"
          name="deliveryTo"
          value={invoiceInfo.deliveryTo}
          onChange={handleInvoiceInfoChange}
        />
      </div>
      <div>
        <label>Invoice Number:</label>
        <input
          type="text"
          name="invoiceNumber"
          value={invoiceInfo.invoiceNumber}
          onChange={handleInvoiceInfoChange}
        />
      </div>
      <div>
        <label>Customer Number:</label>
        <input
          type="text"
          name="customerNumber"
          value={invoiceInfo.customerNumber}
          onChange={handleInvoiceInfoChange}
        />
      </div>
      <div>
        <label>Week Ending:</label>
        <input
          type="text"
          name="weekEnding"
          value={invoiceInfo.weekEnding}
          onChange={handleInvoiceInfoChange}
        />
      </div>
      <div>
        <label>Invoice Date:</label>
        <input
          type="text"
          name="invoiceDate"
          value={invoiceInfo.invoiceDate}
          onChange={handleInvoiceInfoChange}
        />
      </div>
    </div>
  </div>
);

export default Header;
