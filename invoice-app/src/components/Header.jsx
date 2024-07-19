import React from 'react';

const Header = ({ invoiceInfo, handleInvoiceInfoChange }) => (
  <div className="header">
    <div>
    <h1>GAGG Foods </h1>
    <p>85/87, Agbrigg Road</p>
    <p> Wakefield - WF1 5PAB</p>
    <p>Mob: 07916680050</p>
    <p>Email: mdgfoods@hotmail.com</p>
    </div>
    <div className="invoice-form">
      <div>
        <div>Invoice To:</div>
        <input
          type="text"
          name="invoiceTo"
          value={invoiceInfo.invoiceTo}
          onChange={handleInvoiceInfoChange}
        />
      </div>
      <div>
        <div>Invoice Number:</div>
        <input
          type="text"
          name="invoiceNumber"
          value={invoiceInfo.invoiceNumber}
          onChange={handleInvoiceInfoChange}
        />
      </div>
      <div>
        <div>Week Ending:</div>
        <input
          type="text"
          name="weekEnding"
          value={invoiceInfo.weekEnding}
          onChange={handleInvoiceInfoChange}
        />
      </div>
      <div>
        <div>Invoice Date:</div>
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
