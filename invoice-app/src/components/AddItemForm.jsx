import React, { useState } from "react";
import axios from "axios";

const AddItemForm = ({ handleShowModal, handleOnChange,handleFormSubmit, form,title }) => {

    const { name, description, price, margin } = form;

    return (
        <div className="form-container"  >
            <h2 style={{textAlign:"center"}}>{title}</h2>
            <div onClick={handleShowModal} style={{position:"absolute", right:17,fontSize:"2rem", cursor:"pointer"}}>x</div>
            <form onSubmit={handleFormSubmit} className="form-section" >
                <input type="text" name="name" placeholder="Name" className="form-input" value={name} onChange={handleOnChange} required={true} />
                <input type="text" name="description" placeholder="Description" className="form-input" value={description} required={true} onChange={handleOnChange} />
                <input type="text" name="price" placeholder="Price" className="form-input" value={price} onChange={handleOnChange} required={true} />
                <input type="number" name="margin" placeholder="Margin in Percentage" className="form-input" value={margin} required={true} onChange={handleOnChange} />
                <button className="button">Save</button>
            </form>
        </div>
    )
};

export default AddItemForm;