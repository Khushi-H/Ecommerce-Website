import { useState } from "react";
import React from "react";
import Layout from "../../components/Layout/Layout";
import { toast } from "react-toastify";
import "../../styles/AuthStyle.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/forgot-password", {
        email,
        newPassword,
        answer,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);

        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error.message);

      toast.error("Something went wrong");
    }
  };
  return (
    <Layout>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h4 className="title">RESET FORM</h4>
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
              value={answer}
              type="text"
              className="form-control"
              id="exampleInputAnswer"
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Enter Your favorite game"
              required
            />
          </div>

          <div className="mb-3">
            <input
              value={newPassword}
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter Your New Password"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            RESET
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
