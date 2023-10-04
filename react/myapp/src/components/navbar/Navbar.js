import React from "react";
import "./Navbar.css";
import logo from "./../../images/logo.PNG";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { NavLink, Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


    const user = useSelector((state) => state.userReducer);
    // console.log(user);
  

  const logout = () => {
    console.log("logout btton clicked");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch({ type: "LOGIN_ERROR" });
    navigate("/login");
  };
  return (
    <div>
      <nav className="navbar bg-light shadow-sm">
        <div className="container-fluid">
          <NavLink to="/" className="navbar-brand ms-5">
            <img src={logo} alt="" height="45px" />
          </NavLink>
          <form className="nav d-flex me-md-5 " role="search">
            <input
              className="searchbox form-control me-2 text-muted"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <NavLink to="/posts" className="nav-link text-dark fs-5">
              <FontAwesomeIcon icon={faHouse} />
            </NavLink>
            <NavLink to="#" className="nav-link searchIcon text-dark fs-5">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </NavLink>
            {localStorage.getItem("token") !=null ? (
              <NavLink to="#" className="nav-link text-dark fs-5">
                <FontAwesomeIcon icon={faHeart} />
              </NavLink>
            ) : (
              ""
            )}
            {localStorage.getItem("token") !=null ? (
              <NavLink to="#" className="nav-link text-dark py-0">
                <div className="dropdown btn-group">
                  <button
                    className=" p-0"
                    style={{ border: "none", background: "transparent" }}
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img
                      className="p-1 post-profile-pic"
                      alt="profile pic"
                      src="https://images.unsplash.com/photo-1482474800037-6a26fa1c72ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=869&q=80"
                    />
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <Link className="dropdown-item" to="/myprofile">
                        <img
                          className="p-1 post-profile-pic-min"
                          alt="profile pic"
                          src="https://images.unsplash.com/photo-1482474800037-6a26fa1c72ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=869&q=80"
                        />
                        <span className="ps-2">My Profile</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        to="/login"
                        onClick={() => logout()}
                      >
                        <span className="ps-5">Log Out</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </NavLink>
            ) : (
              ""
            )}
          </form>
        </div>
      </nav>
    </div>
  );
};
