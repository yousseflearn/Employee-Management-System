import axios from 'axios';
import { useState, useEffect } from 'react';

const AddEmployee = () => {
  const [category, setCategory] = useState([]);
  const [employee, setEmployee] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    salary: '',
    image: '',
    phone: '',
    address: '',
    category_id: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:3000/auth/add_employee', employee)
      .then((result) => console.log(result.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get('http://localhost:3000/auth/category')
      .then((result) => {
        if (result.data.Status) {
          setCategory(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="container-fluid inputCategory">
      <form
        className="inputForme  d-flex flex-column justify-content-center align-items-center"
        onSubmit={handleSubmit}
      >
        <h3 className="mt-4 text-white mb-4">Employee Information</h3>
        <div className="inputBox  ">
          <input
            type="text"
            required="required"
            name="firstName"
            id="firstName"
            onChange={(e) => {
              setEmployee({ ...employee, firstName: e.target.value });
            }}
          />
          <span>First Name</span>
        </div>
        <div className="inputBox  ">
          <input
            type="text"
            required="required"
            name="lastName"
            id="lastName"
            onChange={(e) => {
              setEmployee({ ...employee, lastName: e.target.value });
            }}
          />
          <span>Last Name</span>
        </div>
        <div className="inputBox  ">
          <input
            type="text/email"
            required="required"
            name="email"
            id="email"
            onChange={(e) => {
              setEmployee({ ...employee, email: e.target.value });
            }}
          />
          <span>Email</span>
        </div>
        <div className="inputBox  ">
          <input
            type="password"
            required="required"
            name="password"
            id="password"
            onChange={(e) => {
              setEmployee({ ...employee, password: e.target.value });
            }}
          />
          <span>Password</span>
        </div>
        <div className="inputBox  ">
          <select
            name="category"
            id="category"
            onChange={(e) => {
              setEmployee({ ...employee, category_id: e.target.value });
            }}
          >
            <option value="">Select your category</option>
            {category.map((c, index) => {
              return (
                <option value={c.id} key={index}>
                  {c.name}
                </option>
              );
            })}
          </select>
          <span>Category</span>
        </div>
        <div className="inputBox  ">
          <input
            type="text"
            required="required"
            name="salary"
            id="salary"
            onChange={(e) => {
              setEmployee({ ...employee, salary: e.target.value });
            }}
          />
          <span>Salary</span>
        </div>
        <div className="inputBox custom-file-button input-group ">
          <label className="input-group-text" htmlFor="inputGroupFile">
            upload
          </label>
          <input
            type="file"
            name="inputFile"
            className="form-control"
            id="inputGroupFile"
            onChange={(e) => {
              setEmployee({ ...employee, image: e.target.files[0] });
            }}
          />
        </div>
        <div className="inputBox  ">
          <input
            type="text"
            required="required"
            name="phone"
            id="phone"
            onChange={(e) => {
              setEmployee({ ...employee, phone: e.target.value });
            }}
          />
          <span>Mobile</span>
        </div>
        <div className="inputBox  ">
          <textarea
            type="text"
            required="required"
            name="address"
            id="address"
            onChange={(e) => {
              setEmployee({ ...employee, address: e.target.value });
            }}
          />
          <span>address</span>
        </div>
        <button className="btn btn-category ">Add Employee</button>
      </form>
    </div>
  );
};

export default AddEmployee;
