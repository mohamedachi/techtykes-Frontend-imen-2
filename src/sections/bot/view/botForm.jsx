/* eslint-disable react/button-has-type */
import { useNavigate } from 'react-router-dom';

import { useForm } from "./useForm";


export const BotForm  = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const {inputValues , handleInputChange , resetForm} = useForm ({
name: '',
description:  '',
model: '',
personality: '',
  })
const handleSubmit = (e)=>{
  e.preventDefault();
  console.log(inputValues)
  resetForm();
}
  return (
    <div>
      <div className="d-flex my-5 justify-content-between">
        <button className="btn btn-outline-secondary" onClick={() => navigate("/")}>Back</button>
        <h1>Add bot</h1>
      </div>

      <div className="card border-primary p-5 m-5">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label mt-2" htmlFor="name">Name</label>
            <input 
            type="text" 
            name="name"
            value={inputValues.name}
            onChange={handleInputChange}
            className="form-control" 
            id="name" 
            placeholder="Enter name"/>
          </div>
          <div className="form-group">
            <label className="form-label mt-2" htmlFor="Description">Description</label>
            <input 
            type="text" 
              name="description"
            value={inputValues.description}
            onChange={handleInputChange}
            className="form-control" 
            id="Description" 
            placeholder="Enter Description"/>
          </div>
          <div className="form-group">
            <label className="form-label mt-2" htmlFor="Model">Model</label>
            <input 
            type="text" 
              name="model"
            value={inputValues.model}
            onChange={handleInputChange}
            className="form-control" 
            id="Model" 
            placeholder="Enter Model"/>
          </div>
          <div className="form-group">
            <label className="form-label mt-2" htmlFor="Personality">Personality</label>
            <input 
            type="text" 
              name="personality"
            value={inputValues.personality}
            onChange={handleInputChange}
            className="form-control" 
            id="Personality" 
            placeholder="Enter Personality"/>
          </div>
          <div className='d-grid gap-2 mt-3'>
          <button type="submit" className="btn btn-primary">Add bot</button>
          </div>
        </form>
      </div>
    </div>
  );
}