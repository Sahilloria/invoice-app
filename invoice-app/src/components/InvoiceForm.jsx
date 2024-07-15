import React from 'react';

const AddInvoiceForm = ({ addInvoice, isModal, handleModal, formData, setFormData, handleChange }) => {

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
  };

  return (
    <div>
  {
    isModal &&
    <div className="modal">
      <div className="modal-content">
        <form onSubmit={handleSubmit} className="form-grid">
          <div className="form-group">
            <label htmlFor="id">Code</label>
            <input type="text" name="id" id="id" value={formData.id} onChange={handleChange} placeholder="Code" required />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input type="text" name="description" id="description" value={formData.description} onChange={handleChange} placeholder="Description" required />
          </div>

          <div className="form-group">
            <label htmlFor="sun">Sun</label>
            <input type="number" name="sun" id="sun" value={formData.sun} onChange={handleChange} placeholder="Sun" required />
          </div>

          <div className="form-group">
            <label htmlFor="mon">Mon</label>
            <input type="number" name="mon" id="mon" value={formData.mon} onChange={handleChange} placeholder="Mon" required />
          </div>

          <div className="form-group">
            <label htmlFor="tue">Tue</label>
            <input type="number" name="tue" id="tue" value={formData.tue} onChange={handleChange} placeholder="Tue" required />
          </div>

          <div className="form-group">
            <label htmlFor="wed">Wed</label>
            <input type="number" name="wed" id="wed" value={formData.wed} onChange={handleChange} placeholder="Wed" required />
          </div>

          <div className="form-group">
            <label htmlFor="thu">Thu</label>
            <input type="number" name="thu" id="thu" value={formData.thu} onChange={handleChange} placeholder="Thu" required />
          </div>

          <div className="form-group">
            <label htmlFor="fri">Fri</label>
            <input type="number" name="fri" id="fri" value={formData.fri} onChange={handleChange} placeholder="Fri" required />
          </div>

          <div className="form-group">
            <label htmlFor="sat">Sat</label>
            <input type="number" name="sat" id="sat" value={formData.sat} onChange={handleChange} placeholder="Sat" required />
          </div>

          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input type="number" step="0.01" name="price" id="price" value={formData.price} onChange={handleChange} placeholder="Price" required />
          </div>

          <div className="form-group">
            <label htmlFor="vat">VAT</label>
            <input type="text" name="vat" id="vat" value={formData.vat} onChange={handleChange} placeholder="VAT" required />
          </div>

          <div className="form-group full-width">
            <button type="submit">Add Invoice Item</button>
          </div>
        </form>
      </div>
    </div>
  }
</div>

  
  
   
  );
};

export default AddInvoiceForm;
