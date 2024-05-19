import axios from 'axios';
import { useEffect, useState } from 'react';

const Home = () => {
  const [adminTotal, setAdminTotal] = useState();
  const [employeeTotal, setEmployeeTotal] = useState();
  const [salaryTotal, setSalaryTotal] = useState();
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    adminCount();
    employeeCount();
    salaryCount();
    adminList();
  }, []);
  const adminCount = () => {
    axios.get('http://localhost:3000/auth/admin_count').then((result) => {
      if (result.data.Status) {
        setAdminTotal(result.data.Result[0].admin);
      }
    });
  };

  const adminList = () => {
    axios.get('http://localhost:3000/auth/admins_list').then((result) => {
      if (result.data.Status) {
        setAdmins(result.data.Result);
      }
    });
  };

  const employeeCount = () => {
    axios.get('http://localhost:3000/auth/employee_count').then((result) => {
      if (result.data.Status) {
        setEmployeeTotal(result.data.Result[0].employee);
      }
    });
  };

  const salaryCount = () => {
    axios.get('http://localhost:3000/auth/salary_count').then((result) => {
      if (result.data.Status) {
        setSalaryTotal(result.data.Result[0].salary);
      }
    });
  };

  return (
    <div className="inputCategory text-white ">
      <div className="p-3 d-flex justify-content-around ">
        <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
          <div className="text-center pb-1">
            <h4>Admin</h4>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <h5>Total: </h5>
            <h5>{adminTotal}</h5>
          </div>
        </div>
        <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
          <div className="text-center pb-1">
            <h4>Employee</h4>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <h5>Total: </h5>
            <h5>{employeeTotal}</h5>
          </div>
        </div>
        <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
          <div className="text-center pb-1">
            <h4>Salary</h4>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <h5>Total: </h5>
            <h5>{salaryTotal} $</h5>
          </div>
        </div>
      </div>

      <div className="m-5 d-flex flex-column justify-content-center align-items-center gap-3 ">
        <h2 className="text-warning mt-3">Admins List</h2>
        <table className="table table-dark table-striped table-hover table-responsive tableCategory1 table-bordered   ">
          <thead>
            <tr>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((a, index) => (
              <tr className="flex-fill" key={index}>
                <td>{a.email}</td>
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

export default Home;
