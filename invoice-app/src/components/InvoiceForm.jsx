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
      sunReturn: 0,
      mon: 0,
      monReturn:0,
      tue: 0,
      tueReturn:0,
      wed: 0,
      wedReturn:0,
      thu: 0,
      thuReturn:0,
      fri: 0,
      friReturn:0,
      sat: 0,
      satReturn:0,
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
            <label htmlFor="sun">Sun</label>
            <input type="number" name="sun" id="sun" min={0} value={formData.sun} onChange={handleChange} placeholder="Sun"  />
          </div>
          <div className="form-group">
            <label htmlFor="sunReturn">Sun Return</label>
            <input type="number" name="sunReturn" id="sunReturn" max={0} value={formData.sunReturn} onChange={handleChange} placeholder="Sun Return"  />
          </div>

          <div className="form-group">
            <label htmlFor="mon">Mon</label>
            <input type="number" name="mon" id="mon" min={0}  value={formData.mon} onChange={handleChange} placeholder="Mon"  />
          </div>

          <div className="form-group">
            <label htmlFor="mon">Mon Return</label>
            <input type="number" name="monReturn" id="monReturn" max={0} value={formData.monReturn} onChange={handleChange} placeholder="Mon Return"  />
          </div>

          <div className="form-group">
            <label htmlFor="tue">Tue</label>
            <input type="number" name="tue" id="tue" min={0}  value={formData.tue} onChange={handleChange} placeholder="Tue"  />
          </div>

          <div className="form-group">
            <label htmlFor="tue">Tue Return</label>
            <input type="number" name="tueReturn" id="tueReturn" max={0} value={formData.tueReturn} onChange={handleChange} placeholder="Tue Return"  />
          </div>

          <div className="form-group">
            <label htmlFor="wed">Wed</label>
            <input type="number" name="wed" id="wed" min={0}  value={formData.wed} onChange={handleChange} placeholder="Wed"  />
          </div>

          <div className="form-group">
            <label htmlFor="wedReturn">Wed Return</label>
            <input type="number" name="wedReturn" id="wedReturn" max={0} value={formData.wedReturn} onChange={handleChange} placeholder="Wed Return"  />
          </div>

          <div className="form-group">
            <label htmlFor="thu">Thu</label>
            <input type="number" name="thu" id="thu" min={0} value={formData.thu} onChange={handleChange} placeholder="Thu"  />
          </div>

          <div className="form-group">
            <label htmlFor="thuReturn">Thu Return</label>
            <input type="number" name="thuReturn" id="thuReturn" max={0} value={formData.thuReturn} onChange={handleChange} placeholder="Thu Return"  />
          </div>


          <div className="form-group">
            <label htmlFor="fri">Fri</label>
            <input type="number" name="fri" id="fri" min={0}  value={formData.fri} onChange={handleChange} placeholder="Fri"  />
          </div>

          <div className="form-group">
            <label htmlFor="friReturn">Fri</label>
            <input type="number" name="friReturn" id="friReturn" max={0} value={formData.friReturn} onChange={handleChange} placeholder="Fri Return"  />
          </div>

          <div className="form-group">
            <label htmlFor="sat">Sat</label>
            <input type="number" name="sat" id="sat" min={0}  value={formData.sat} onChange={handleChange} placeholder="Sat"  />
          </div>
          <div className="form-group">
            <label htmlFor="satReturn">Sat</label>
            <input type="number" name="satReturn" id="satReturn" max={0} value={formData.satReturn} onChange={handleChange} placeholder="Sat Return"  />
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
