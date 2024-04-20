import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Category = () => {
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
    <div className="container-fluid  px-5 inputCategory">
      <Link className="btn btn-category mt-5" to="/dashboard/add_category">
        Add Category
      </Link>
      <div className="d-flex flex-column justify-content-center align-items-center gap-3 ">
        <h2 className="text-warning mt-3">Category List</h2>
        <table className="table table-dark table-striped table-hover .table-responsive tableCategory">
          <thead>
            <tr>
              <th>Category Name</th>
            </tr>
          </thead>
          <tbody>
            {category.map((c, index) => (
              <tr className="flex-fill" key={index}>
                <td>{c.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Category;
