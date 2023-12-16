import { useState } from "react";
import React from "react";
import Layout from "../../components/Layout/Layout";
import { toast } from "react-toastify";
import "../../styles/AuthStyle.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/register", {
        name,
        email,
        password,
        phone,
        address,
        answer,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h4 className="title">REGISTER FORM</h4>
          <div className="mb-3">
            <input
              type="text"
              value={name}
              className="form-control"
              id="exampleInputEmail1"
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Your Name"
              required
            />
          </div>
          <div className="mb-3">
            <input
              value={email}
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Your Email"
              required
            />
          </div>

          <div className="mb-3">
            <input
              value={password}
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Your Password"
              required
            />
          </div>
          <div className="mb-3">
            <input
              value={phone}
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter Your Phone Number"
              required
            />
          </div>
          <div className="mb-3">
            <input
              value={address}
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter Your Address"
              required
            />
          </div>
          <div className="mb-3">
            <input
              value={answer}
              type="text"
              className="form-control"
              id="exampleInputAnswer"
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="What is Your favorite game ?"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
