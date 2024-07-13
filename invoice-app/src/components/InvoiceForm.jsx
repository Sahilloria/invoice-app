import React, { useState } from 'react';

const AddInvoiceForm = ({ addInvoice }) => {
  const [formData, setFormData] = useState({
    code: '',
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const total = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'].reduce((acc, day) => acc + Number(formData[day]), 0);
    const amount = total * formData.price;
    addInvoice({
      ...formData,
      total,
      amount: amount.toFixed(2),
    });
    setFormData({
      code: '',
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
  };

  return (
    <form onSubmit={handleSubmit} className="invoice-form">
      <input type="text" name="code" value={formData.code} onChange={handleChange} placeholder="Code" required />
      <input type="text" name="description" value={formData.description} onChange={handleChange} placeholder="Description" required />
      <input type="number" name="sun" value={formData.sun} onChange={handleChange} placeholder="Sun" required />
      <input type="number" name="mon" value={formData.mon} onChange={handleChange} placeholder="Mon" required />
      <input type="number" name="tue" value={formData.tue} onChange={handleChange} placeholder="Tue" required />
      <input type="number" name="wed" value={formData.wed} onChange={handleChange} placeholder="Wed" required />
      <input type="number" name="thu" value={formData.thu} onChange={handleChange} placeholder="Thu" required />
      <input type="number" name="fri" value={formData.fri} onChange={handleChange} placeholder="Fri" required />
      <input type="number" name="sat" value={formData.sat} onChange={handleChange} placeholder="Sat" required />
      <input type="number" step="0.01" name="price" value={formData.price} onChange={handleChange} placeholder="Price" required />
      <input type="text" name="vat" value={formData.vat} onChange={handleChange} placeholder="VAT" required />
      <button type="submit">Add Invoice Item</button>
    </form>
  );
};

export default AddInvoiceForm;
