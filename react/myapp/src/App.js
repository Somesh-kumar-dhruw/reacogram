import React, { Fragment } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login/Login";
import { SignUp } from "./pages/signup/SignUp";
import { Navbar } from "./components/navbar/Navbar";
import { PostOverview } from "./pages/postOverview/PostOverview";
import { Profile } from "./pages/profile/Profile";

export default function App() {
  return (
    <div className="app-bg">
      <Fragment>
        <Router>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<SignUp />} />
            <Route exact path="/posts" element={<PostOverview />} />
            <Route exact path="/myprofile" element={<Profile />} />
          </Routes>
        </Router>
      </Fragment>
    </div>
  );
}
