import React from "react";
import "./Card.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsis,
  faHeart,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { useSelector } from "react-redux";

export const Card = (props) => {
  // debugger;
  const user = useSelector(state => state.userReducer);
  console.log(user)

  console.log(props.postData.author._id);
  console.log(user.user._id);

  return (
    <div>
      <div className="card shadow-sm">
        <div className="card-body px-2">
          <div className="row">
            <div className="col-6 d-flex">
              <img
                className="p-1 post-profile-pic"
                alt="profile pic"
                src="https://images.unsplash.com/photo-1482474800037-6a26fa1c72ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=869&q=80"
              />
              <div className="d-flex flex-column justify-content-center mt-1 ms-2">
                <p className="fs-6 fw-bold">{props.postData.location}</p>
                <p className="location">{props.postData.description}</p>
              </div>
            </div>
            {/* { props.postData.author._id === user.user._id ?<div className="col-md-6">
              <span className="">
                <FontAwesomeIcon
                  icon={faEllipsis}
                  rotation={90}
                  className="fs-3 p-2 mt-1"
                  style={{cursor:"pointer"}}
                  onClick={()=> props.deletePost(props.postData._id)}
                />
              </span>
            </div> : ''} */}
            <div className="col-md-6">
              <span className="">
                <FontAwesomeIcon
                  icon={faEllipsis}
                  rotation={90}
                  className="fs-3 p-2 mt-1"
                  style={{ cursor: "pointer" }}
                  onClick={() => props.deletePost(props.postData._id)}
                />
              </span>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <img
                style={{ borderRadius: "20px" }}
                className="img-fluid p-2"
                src={props.postData.image}
                alt="post pic"
              />
            </div>
          </div>
          <div className="row mb-3 mt-2">
            <div className="col-6 d-flex mt-2">
              <FontAwesomeIcon className="ps-2 fs-4" icon={faHeart} />
              <FontAwesomeIcon className="ps-3 fs-4" icon={faComment} />
              <FontAwesomeIcon className="ps-3 fs-4" icon={faPaperPlane} />
            </div>
            <div className="col-6">
              <span className="pe-3 mt-1 fs-5 fw-bold float-end">
                200 likes
              </span>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <span className=" p-2 text-muted">2 Hours Ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
