import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { API_BASE_URL } from "../../config-file/config";
import Swal from "sweetalert2";
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from "react-router-dom";
import socialDesktop from "./../../images/social-desktop.PNG";
import socialMobile from "./../../images/social-mobile.PNG";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = (event) => {
    event.preventDefault();
    setLoading(true);
    const requestData = { email, password };
    axios
      .post(`${API_BASE_URL}/login`, requestData)
      .then((result) => {
        if (result.status === 201) {
          setLoading(false);
          localStorage.setItem("token", result.data.result.token);
          localStorage.setItem('user', JSON.stringify(result.data.result.user));
          dispatch({type: 'LOGIN_SUCCESS', payload: result.data.result.user})
          setLoading(false);
          navigate('/myprofile');
        }
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: error.response.data.error,
        });
      });
  };
  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-7 col-sm-12 d-flex justify-content-center align-item-center">
          <img
            className="socialDesktop"
            src={socialDesktop}
            style={{ height: "80%" }}
            alt="instragram login for windows"
          />
          <img
            className="socialMobile"
            src={socialMobile}
            alt="instragram login for android"
          />
        </div>
        <div className="col-md-5 col-sm-12">
          <div className="card shadow">
            {loading ? (
              <div className="col-md-12 d-flex justify-content-center mt-3">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              ""
            )}
            <div className="card-body px-5">
              <h4 className="card-title text-center mt-3 fw-bold">Log In</h4>
              <form onSubmit={(e) => login(e)}>
                <input
                  type="email"
                  className="form-control input-bg mt-4 mb-2"
                  placeholder="Phone number, username or email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  className="form-control input-bg mb-2 "
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="d-grid mt-3">
                  <button type="submit" className="custom-btn custom-btn-blue">
                    Log In
                  </button>
                </div>
                <div className="mt-4 hrBox">
                  <hr className="text-muted hrStyle" />
                  <h5 className="text-muted hrText">OR</h5>
                  <hr className="text-muted hrStyle" />
                </div>
                <div className="d-grid mt-3 mb-5">
                  <button className="custom-btn custom-btn-white">
                    <span className="text-muted fs-6">
                      Don't have an account?
                    </span>
                    <Link to="/signup" className="ms-1 text-info fw-bold">
                      Sign Up
                    </Link>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
