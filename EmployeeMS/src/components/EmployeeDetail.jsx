import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EmployeeDetail = () => {
  const [employee, setEmployee] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    axios
      .get('http://localhost:3000/employee/detail/' + id)
      .then((result) => {
        setEmployee(result.data[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  const navigate = useNavigate();
  const handleLogout = () => {
    axios
      .get('http://localhost:3000/employee/logout')
      .then((result) => {
        if (result.data.Status) {
          navigate('/');
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="p-2 d-flex justify-content-center shadow">
        <h4>Employee System management</h4>
      </div>
      <div className="d-flex justify-content-center flex-column align-items-center mt-3">
        <img
          src={`http://localhost:3000/Images/` + employee.image}
          alt=""
          className="emp_det_image mt-3"
        />
        <div className="d-flex align-items-center flex-column mt-3  gap-3">
          <h3>FirstName: {employee.firstName}</h3>
          <h3>LastName: {employee.lastName}</h3>
          <h3>Email: {employee.email}</h3>
          <h3>Salary: {employee.salary}$</h3>
          <h3>Address: {employee.address}</h3>
          <h3>Phone: {employee.phone}</h3>
          <h3></h3>
        </div>
        <div>
          <button className="btn btn-primary me-2">Edit</button>
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetail;
