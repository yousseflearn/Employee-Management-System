import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditEmployee = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState({
    firstName: '',
    lastName: '',
    email: '',
    salary: '',
    phone: '',
    address: '',
    category_id: '',
  });
  const [category, setCategory] = useState([]);
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

    axios
      .get('http://localhost:3000/auth/employee/' + id)
      .then((result) => {
        setEmployee({
          ...employee,
          firstName: result.data.Result[0].firstName,
          lastName: result.data.Result[0].lastName,
          email: result.data.Result[0].email,
          salary: result.data.Result[0].salary,
          phone: result.data.Result[0].phone,
          address: result.data.Result[0].address,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put('http://localhost:3000/auth/edit_employee/' + id, employee)
      .then((result) => {
        console.log(result.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container-fluid inputCategory">
      <form
        className="inputForme  d-flex flex-column justify-content-center align-items-center"
        onSubmit={handleUpdate}
      >
        <h3 className="mt-4 text-white mb-4">Employee Information</h3>
        <div className="inputBox  ">
          <input
            type="text"
            required="required"
            name="firstName"
            id="firstName"
            value={employee.firstName}
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
            value={employee.lastName}
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
            value={employee.email}
            onChange={(e) => {
              setEmployee({ ...employee, email: e.target.value });
            }}
          />
          <span>Email</span>
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
            value={employee.salary}
            onChange={(e) => {
              setEmployee({ ...employee, salary: e.target.value });
            }}
          />
          <span>Salary</span>
        </div>

        <div className="inputBox  ">
          <input
            type="text"
            required="required"
            name="phone"
            id="phone"
            value={employee.phone}
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
            value={employee.address}
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

export default EditEmployee;
