import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Start = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get('http://localhost:3000/verify')
      .then((result) => {
        if (result.data.Status) {
          if (result.data.role === 'admin') {
            navigate('/dashboard/home');
          } else {
            navigate('/employee_detail/' + result.data.id);
          }
        }
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
      <div className="p-3 rounded w-25 border loginForm">
        <h2 className="text-center">Login As</h2>
        <div className="d-flex justify-content-between mt-5 mb3">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              navigate('/employee_login');
            }}
          >
            Employee
          </button>
          <button
            type="button"
            className="btn btn-success"
            onClick={() => {
              navigate('/admin_login');
            }}
          >
            Admin
          </button>
        </div>
      </div>
    </div>
  );
};

export default Start;
