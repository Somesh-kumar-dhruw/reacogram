import React, { useState } from "react";
import "./SignUp.css";
import { Link } from "react-router-dom";
import axios from 'axios';
import { API_BASE_URL } from '../../config-file/config'
import socialDesktop from "./../../images/social-desktop.PNG";
import socialMobile from "./../../images/social-mobile.PNG";
import Swal from 'sweetalert2';

export const SignUp = () => {

  
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const signup = (event) => {
    event.preventDefault();

    setLoading(true)
    const requestData = {fullName: fullName, email, password}
    axios.post(`${API_BASE_URL}/signup`, requestData)
    .then((result) => {
      if(result.status === 201){
        setLoading(false)
        Swal.fire({
          icon: 'success',
          title: 'User succesfully register'
        })
      }
      setFullName('');
      setEmail('');
      setPassword('');
    })
    .catch((error) => {
      console.log(error);
      setLoading(false)
      Swal.fire({
        icon: 'error',
        title: 'some error occurred please try again later'
      })
    })
  
  };
  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-7 col-sm-12 d-flex justify-content-center align-item-center">
          <img
            className="socialDesktop"
            src={socialDesktop}
            style={{ height: "80%" }}
            alt="instragram sign up for windows"
          />
          <img
            className="socialMobile"
            src={socialMobile}
            alt="instragram sign up for android"
          />
        </div>

        <div className="col-md-5 col-sm-12">
          <div className="card shadow">
            { loading ? <div className="col-md-12 d-flex justify-content-center mt-3">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div> : ""}
            <div className="card-body px-5">
              <h4 className="card-title text-center mt-3 fw-bold">Sign Up</h4>
              <form onSubmit={(e) => signup(e)}>
                <input
                  type="Phone"
                  className="form-control input-bg mb-2 mt-4"
                  placeholder="Phone Number"
                />
                <input
                  type="email"
                  className="form-control input-bg mb-2"
                  placeholder="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="text"
                  className="form-control input-bg mb-2"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
                <input
                  type="password"
                  className="form-control input-bg mb-2 "
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="d-grid mt-3">
                  <button className="custom-btn custom-btn-blue" type="submit">
                    Sign Up
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
                      Already have an account?
                    </span>
                    <Link to="/login" className="ms-1 text-info fw-bold">
                      Log In
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
