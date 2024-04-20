import axios from "axios";
import { useState, useEffect } from "react";

const AddEmployee = () => {
  const [category, setCategory] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/category")
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
      <form className="inputForme  d-flex flex-column justify-content-center align-items-center   ">
        <h3 className="mt-4 text-white mb-4">Employee Information</h3>
        <div className="inputBox  ">
          <input
            type="text"
            required="required"
            name="firstName"
            id="firstName"
          />
          <span>First Name</span>
        </div>
        <div className="inputBox  ">
          <input
            type="text"
            required="required"
            name="lastName"
            id="lastName"
          />
          <span>Last Name</span>
        </div>
        <div className="inputBox  ">
          <input
            type="text/email"
            required="required"
            name="email"
            id="email"
          />
          <span>Email</span>
        </div>
        <div className="inputBox  ">
          <input
            type="password"
            required="required"
            name="password"
            id="password"
          />
          <span>Password</span>
        </div>
        <div className="inputBox  ">
          <select name="category" id="category">
            <option value="">Please choose a category</option>
            {category.map((c, index) => {
              return (
                <option value={c.name} key={index}>
                  {c.name}
                </option>
              );
            })}
          </select>
          <span>Category</span>
        </div>
        <div className="inputBox  ">
          <input type="text" required="required" name="salary" id="salary" />
          <span>Salary</span>
        </div>
        <div className="inputBox  ">
          <input
            type="file"
            required="required"
            name="inputGroupFile"
            className="inputFile"
            id="inputGroupFile"
          />
          <span className="imageSpan">Image</span>
        </div>
        <div className="inputBox  ">
          <input type="text" required="required" name="phone" id="phone" />
          <span>Mobile</span>
        </div>
        <div className="inputBox  ">
          <textarea
            type="text"
            required="required"
            name="address"
            id="address"
          />
          <span>address</span>
        </div>
        <button className="btn btn-category ">Add Employee</button>
      </form>
    </div>
  );
};

export default AddEmployee;
