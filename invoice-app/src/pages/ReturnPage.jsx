import React, { useState } from 'react';
import Header from '../components/Header';
import { useLocation } from 'react-router-dom';
import InvoiceTable from '../components/InvoiceTable';
import AddInvoiceForm from '../components/InvoiceForm';

const Return = () => {

    const [formData, setFormData] = useState({
        id: '',
        description: '',
        sun: 0,
        mon: 0,
        tue: 0,
        wed: 0,
        thu: 0,
        fri: 0,
        sat: 0,
        total: 0,
        price: 0,
        amount: 0,
        vat: '',
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    const location = useLocation();
    const [isModal, setIsModal] = useState(false);
    const data = location.state.selectedItems;
    const [invoiceInfo, setInvoiceInfo] = useState({
        invoiceTo: '',
        invoiceNumber: '',
        weekEnding: '',
        invoiceDate: '',
    });

    const [invoices, setInvoices] = useState(data);
    const handleInvoiceInfoChange = (e) => {
        const { name, value } = e.target;
        setInvoiceInfo(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const addInvoice = (invoice) => {
        setInvoices(prevItems => prevItems.map(item => item.id === formData.id ? formData : item));
        setIsModal(false)
    };

    const handleRowClick = (id) => {
        const item = invoices.find(item => item.id === id);
        if (item) {
          setFormData(item);
          setIsModal(true);
        }
      };

    return (
        <div className="app">
            <Header invoiceInfo={invoiceInfo} handleInvoiceInfoChange={handleInvoiceInfoChange} />

            <AddInvoiceForm addInvoice={addInvoice} isModal={isModal}  handleChange={handleChange} formData={formData} setFormData={setFormData}/>

            <InvoiceTable invoices={invoices} addInvoice={addInvoice} invoiceInfo={invoiceInfo} isModal={isModal} handleModal={handleRowClick} />
        </div>
    );
};

export default Return;
