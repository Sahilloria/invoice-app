import React from 'react';

const Footer = ({ total, vat }) => (
  <div className="footer">
    <p>Total: £{total.toFixed(2)}</p>
    <p>VAT: £{vat.toFixed(2)}</p>
  </div>
);

export default Footer;
