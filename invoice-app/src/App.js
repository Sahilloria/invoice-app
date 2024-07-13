import React, { useState } from 'react';
import Header from './components/Header';
import InvoiceTable from './components/InvoiceTable';
import AddInvoiceForm from './components/InvoiceForm';
import './App.css';

const App = () => {
  const [invoiceInfo, setInvoiceInfo] = useState({
    invoiceTo: '',
    deliveryTo: '',
    invoiceNumber: '',
    customerNumber: '',
    weekEnding: '',
    invoiceDate: '',
  });

  const [invoices, setInvoices] = useState([
    { code: '5', description: 'SANDWICH £1.39', sun: 0, mon: 20, tue: 1, wed: 0, thu: 0, fri: 0, sat: 7, total: 28, price: 1.0425, amount: 29.19, vat: 'Z' },
    // Add more initial invoices as needed
  ]);

  const handleInvoiceInfoChange = (e) => {
    const { name, value } = e.target;
    setInvoiceInfo(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addInvoice = (invoice) => {
    setInvoices(prevInvoices => [...prevInvoices, invoice]);
  };

  return (
    <div className="app">
      <Header invoiceInfo={invoiceInfo} handleInvoiceInfoChange={handleInvoiceInfoChange} />
      <AddInvoiceForm addInvoice={addInvoice} />
      <InvoiceTable invoices={invoices} addInvoice={addInvoice} invoiceInfo={invoiceInfo} />
    </div>
  );
};

export default App;
