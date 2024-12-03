import styles from "./Form.module.css";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { useAuth } from "./../../../contexts/UserContext";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
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
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.phone.trim() || formData.phone.length !== 10) {
      newErrors.phone = "Phone number must be 10 digits.";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    }
    if (!formData.password.trim() || formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        await signup(
          formData.name,
          formData.phone,
          formData.email,
          formData.password
        );
        toast.success("Account created successfully!");
        navigate("/");
      } catch (error) {
        toast.error(error.message || "Failed to create account!");
      } finally {
        setFormData({
          name: "",
          phone: "",
          email: "",
          password: "",
        });
        setErrors({});
      }
    } else {
      toast.error("Failed to create account!");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputContainer}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          placeholder="e.g. John Doe"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
        />
        <span className={styles.error}>{errors.name}</span>
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="phone">Phone Number</label>
        <input
          type="text"
          placeholder="Enter your 10 digit mobile number"
          name="phone"
          id="phone"
          value={formData.phone}
          onChange={handleChange}
        />
        <span className={styles.error}>{errors.phone}</span>
      </div>
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

export default SignUp;
