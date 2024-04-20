import { Link } from "react-router-dom";

const Employee = () => {
  return (
    <div className="container-fluid  px-5 inputCategory">
      <Link className="btn btn-category mt-5" to="/dashboard/add_employee">
        Add Employee
      </Link>
      <div className="d-flex flex-column justify-content-center align-items-center gap-3 ">
        <h2 className="text-warning mt-3">Employees List</h2>
      </div>
    </div>
  );
};

export default Employee;
