import { useState } from "react";
import { userSignUp } from "../services/user";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UserRegister = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await userSignUp(
        form.name,
        form.email,
        form.password,
        form.phone,
        form.address
      );

      toast.success("Registration successful! Please login.");
      navigate("/login"); // Redirect to login screen
    } catch (err) {
      toast.error(err.message || "Registration failed");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h2 className="mb-4 text-center">User Registration</h2>
      <form onSubmit={handleRegister}>
        {["name", "email", "password", "phone", "address"].map((field) => (
          <div className="mb-3" key={field}>
            <label className="form-label">
              {field[0].toUpperCase() + field.slice(1)}
            </label>
            <input
              type={field === "password" ? "password" : "text"}
              className="form-control"
              name={field}
              value={form[field]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <button type="submit" className="btn btn-success w-100">
          Register
        </button>
      </form>
    </div>
  );
};

export default UserRegister;
