import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Employee = () => {
  const [employee, setEmployee] = useState([]);
  useEffect(() => {
    axios
      .get('http://localhost:3000/auth/employee')
      .then((result) => {
        if (result.data.Status) {
          setEmployee(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="container-fluid  px-5 inputCategory">
      <Link className="btn btn-category mt-5" to="/dashboard/add_employee">
        Add Employee
      </Link>
      <div className="d-flex flex-column justify-content-center align-items-center gap-3 ">
        <h2 className="text-warning mt-3">Employees List</h2>
        <table className="table table-dark table-striped table-hover .table-responsive tableCategory table-bordered">
          <thead>
            <tr>
              <th>firstName</th>
              <th>lastName</th>
              <th>email</th>
              <th>salary</th>
              <th>image</th>
              <th>phone</th>
              <th>address</th>
              <th>category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employee.map((e, index) => (
              <tr className="flex-fill" key={index}>
                <td>{e.firstName}</td>
                <td>{e.lastName}</td>
                <td>{e.email}</td>
                <td>{e.salary}</td>
                <td>
                  <img
                    className="imageEmployee"
                    src={`http://localhost:3000/Images/` + e.image}
                    alt=""
                  />
                </td>
                <td>{e.phone}</td>
                <td>{e.address}</td>
                <td>{e.category_id}</td>
                <td>
                  <button className="btn btn-info btn-sm me-2">Edit</button>
                  <button className="btn btn-warning btn-sm">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Employee;
