import styles from "./Form.module.css";

import { toast } from "react-hot-toast";
import { useAuth } from "./../../../contexts/UserContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    if (!formData.password.trim() || formData.password.length < 8)
      newErrors.password = "Password must be at least 8 characters.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await login(formData.email, formData.password);
        toast.success("Login successful!");
        navigate("/home");
      } catch (error) {
        toast.error(
          error.message || "Login failed! Please Check your credentials."
        );
      } finally {
        setFormData({
          name: "",
          phone: "",
          email: "",
          password: "",
        });
        setErrors({});
      }
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputContainer}>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          placeholder="example@email.com"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
        />
        <span className={styles.error}>{errors.email}</span>
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="password">Password</label>
        <input
          type="text"
          placeholder="At least 8 characters"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
        />
        <span className={styles.error}>{errors.password}</span>
      </div>
      <button className={styles.btn}>Continue</button>
    </form>
  );
}

export default Login;
