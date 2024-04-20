import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddCategory = () => {
  const [category, setCategory] = useState();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/auth/add_category", { category })
      .then((result) => {
        if (result.data.Status) {
          navigate("/dashboard/category");
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="container-fluid inputCategory">
      <form
        onSubmit={handleSubmit}
        className="inputForme  d-flex flex-column justify-content-center align-items-center   "
      >
        <h3 className="mt-4 text-white mb-4">Category Information</h3>
        <div className="inputBox  ">
          <input
            type="text"
            required="required"
            name="category"
            onChange={(e) => setCategory(e.target.value)}
          />
          <span>Category Name</span>
        </div>
        <button className="btn btn-category ">Add Category</button>
      </form>
    </div>
  );
};
export default AddCategory;
