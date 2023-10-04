import React, { useState, useEffect } from "react";
import "./Profile.css";
import { Link, useNavigate } from "react-router-dom";
// import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsis,
  faHeart,
  faPaperPlane,
  faTrash,
  faLocationDot,
  faCloudArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import { faComment, faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import Swal from "sweetalert2";
import { API_BASE_URL } from "../../config-file/config";
import { useSelector } from "react-redux";

export const Profile = () => {
  const user = useSelector((state) => state.userReducer);

  const navigate = useNavigate();
  const [myallposts, setMyallposts] = useState([]);

  const [postDetail, setPostDetail] = useState({});

  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState({ preview: "", data: "" });

  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");

  const [lgShow, setLgShow] = useState(false);
  const handleShow = () => setLgShow(true);

  const [showPost, setShowPost] = useState(false);
  const handlePostShow = () => setShowPost(true);
  const handlePostclose = () => setShowPost(false)

  const CONFIG_OBJ = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  const handleFileSelect = (event) => {
    const img = {
      preview: URL.createObjectURL(event.target.files[0]),
      data: event.target.files[0],
    };
    setImage(img);
  };

  const handleImgUpload = async () => {
    let formData = await new FormData();
    formData.append("file", image.data);
    const response = axios.post(`${API_BASE_URL}/uploadFile`, formData);
    return response;
  };

  const getMyPosts = async () => {
    console.log("getAllPosts");
    const response = await axios.get(`${API_BASE_URL}/allposts`, CONFIG_OBJ);
    // debugger;

    if (response.status === 200) {
      setMyallposts(response.data.posts);
    } else {
      Swal.fire({
        icon: "error",
        title: "Some error occurred while getting all your posts",
      });
    }
  };

  const deletePost = async (postId) => {
    const response = await axios.delete(`${API_BASE_URL}/deletepost/${postId}`);
    if (response.status === 200) {
      getMyPosts();
      handlePostclose();
    }
  };


  const showDetail = (post) => {
    setPostDetail(post);
  }

  const addPost = async (error) => {
    if (image.preview === "") {
      Swal.fire({
        icon: "error",
        title: "Post image is mandatory!",
      });
    } else if (caption === "") {
      Swal.fire({
        icon: "error",
        title: "Post caption is mandatory!",
      });
    } else if (location === "") {
      Swal.fire({
        icon: "error",
        title: "Location is mandatory!",
      });
    } else {
      setLoading(true);
      const imgRes = await handleImgUpload();
      //add validation rule for caption and location
      const request = {
        description: caption,
        location: location,
        image: ` ${API_BASE_URL}/files/${imgRes.data.fileName}`,
      };
      //Write api call to create post
      const postResponse = await axios.post(
        `${API_BASE_URL}/createpost`,
        request,
        CONFIG_OBJ
      );
      setLoading(false);
      if (postResponse.status === 201) {
        navigate("/posts");
      } else {
        Swal.fire({
          icon: "error",
          title: "some erro occurred while creating post",
        });
      }
    }
  };

  useEffect(() => {
    getMyPosts();
  }, []);

  return (
    <div className="container shadow mt-3">
      <div className="row">
        <div className="col-md-6 d-flex flex-column">
          <img
            className="p-2 img-fluid profile-pic"
            src="https://images.unsplash.com/photo-1491555103944-7c647fd857e6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="post pic"
          />
          <p className="ms-3 fs-5 fw-bold">{user.user.fullName}</p>
          <p className="ms-3 fs-5">{user.user.fullName}</p>
          <p className="ms-3 fs-5">
            UI/UX Designer @john | Follow @{user.user.fullName}
          </p>
          <p className="ms-3 fs-5">
            My portfolio on <Link>www.portfolio.com/{user.user.fullName}</Link>
          </p>
        </div>
        <div className="col-md-6 d-flex flex-column justify-content-between my-4">
          <div className="d-flex justify-content-equal mx-auto">
            <div className="count-section pe-4 pe-md-5 text-center">
              <h4>{myallposts.length}</h4>
              <p className="fw-bold">Posts</p>
            </div>
            <div className="count-section px-4 px-md-5 text-center">
              <h4>20</h4>
              <p className="fw-bold">Followers</p>
            </div>
            <div className="ps-md-5 ps-4 text-center">
              <h4>20</h4>
              <p className="fw-bold">Following</p>
            </div>
          </div>
          <div className="mx-auto mt-md-0 mt-4">
            <button className="custom-btn custom-btn-white me-5">
              <span className="fs-6">Edit Profile</span>
            </button>
            <button className="custom-btn custom-btn-white">
              <span className="fs-6" onClick={handlePostShow}>
                Upload Post
              </span>
            </button>
          </div>
        </div>
      </div>
      <div className="row pb-3 mb-2">
        {myallposts.map((post) => {
          return (
            <div className="col-md-4 col-sm-12">
              <div className="card">
                <img
                  src={post.image}
                  className="card-img-top"
                  alt={post.description}
                  onClick={() => showDetail(post)}
                />
              </div>
            </div>
          );
        })}
      </div>

      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6">
              <div>
                <div id="carouselExampleIndicators" className="carousel slide">
                  <div className="carousel-indicators">
                    <button
                      type="button"
                      data-bs-target="#carouselExampleIndicators"
                      data-bs-slide-to="0"
                      className="active"
                      aria-current="true"
                      aria-label="Slide 1"
                    ></button>
                    <button
                      type="button"
                      data-bs-target="#carouselExampleIndicators"
                      data-bs-slide-to="1"
                      aria-label="Slide 2"
                    ></button>
                    <button
                      type="button"
                      data-bs-target="#carouselExampleIndicators"
                      data-bs-slide-to="2"
                      aria-label="Slide 3"
                    ></button>
                  </div>
                  <div className="carousel-inner">
                    <div className="carousel-item active">
                      <img
                        src={postDetail.image}
                        className="d-block w-100"
                        alt="..."
                      />
                    </div>
                    <div className="carousel-item">
                      <img
                        src={postDetail.image}
                        className="d-block w-100"
                        alt="..."
                      />
                    </div>
                    <div className="carousel-item">
                      <img
                        src={postDetail.image}
                        className="d-block w-100"
                        alt="..."
                      />
                    </div>
                  </div>
                  <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide="prev"
                  >
                    <span
                      className="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide="next"
                  >
                    <span
                      className="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="row">
                <div className="col-6 d-flex">
                  <img
                    className="p-1 post-profile-pic"
                    alt="profile pic"
                    src={postDetail.image}
                  />
                  <div className="d-flex flex-column justify-content-center mt-2 ms-2">
                    <p className="fs-6 fw-bold">{postDetail.location}</p>
                    <p className="location">{postDetail.description }</p>
                  </div>
                  <div className="col-md-6">
                    <div className="ms-5">
                      <div className="dropdown">
                        <button
                          className="btn"
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <FontAwesomeIcon
                            icon={faEllipsis}
                            className="fs-3 p-2 mt-1"
                          />
                        </button>
                        <ul className="dropdown-menu">
                          <li>
                            <Link className="dropdown-item" to="#">
                              <FontAwesomeIcon icon={faPenToSquare} /> Edit Post
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" to="#">
                              <FontAwesomeIcon icon={faTrash}
                              onClick={() => deletePost(postDetail._id)} /> Delete Post
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-12">
                  <span className=" p-2 text-muted">2 Hours Ago</span>
                </div>
              </div>
              <div className="row">
                <div className="col-12 ms-2">
                  <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Earum, reprehenderit!
                  </p>
                </div>
              </div>
              <div className="row mb-3 mt-2">
                <div className="col-6 d-flex mt-2">
                  <FontAwesomeIcon className="ps-2 fs-4" icon={faHeart} />
                  <FontAwesomeIcon className="ps-3 fs-4" icon={faComment} />
                  <FontAwesomeIcon className="ps-3 fs-4" icon={faPaperPlane} />
                </div>
                <div className="col-12 mt-3 ms-2">
                  <span className="fs-5 fw-bold">200 likes</span>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        size="lg"
        show={showPost}
        onHide={() => setShowPost(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <span className="fw-bold fs-5">Upload Post</span>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6 col-sm-12">
              <div className="upload-box">
                <div className="dropZoneContainer">
                  <input
                    name="file"
                    type="file"
                    id="drop_zone"
                    className="FileUpload"
                    accept=".jpg,.png,.gif"
                    onChange={handleFileSelect}
                  />
                  <div className="drapZoneOverlay">
                    {image.preview && (
                      <img
                        src={image.preview}
                        width="100"
                        height="100"
                        alt="..."
                      />
                    )}
                    <FontAwesomeIcon className="fs-2" icon={faCloudArrowDown} />
                    <br />
                    Upload Photo From Computer
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-12 d-flex flex-column justify-content-between">
              <div className="row me-4">
                <div className="col-sm-12 mb-3">
                  <div className="form-floating">
                    <textarea
                      onChange={(e) => setCaption(e.target.value)}
                      className="form-control"
                      placeholder="Add Caption"
                      id="floatingTextarea"
                    ></textarea>
                    <label for="floatingTextarea">Add Caption</label>
                  </div>
                </div>
                <div className="col-sm-12">
                  <div className="form-floating mb-3">
                    <input
                      onChange={(e) => setLocation(e.target.value)}
                      type="text"
                      className="form-control"
                      id="floatingInput"
                      placeholder="Add location"
                    />
                    <label for="floatingInput">
                      <FontAwesomeIcon className="pe-2" icon={faLocationDot} />
                      Add location
                    </label>
                  </div>
                </div>
              </div>
              <div className="row me-4">
                <div className="col-sm-12">
                  {loading ? (
                    <div className="col-md-12 d-flex justify-content-center mt-3">
                      <div
                        className="spinner-border text-primary"
                        role="status"
                      >
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  <button
                    onClick={() => addPost()}
                    className="custom-btn custom-btn-pink float-end"
                  >
                    <span className="fs-6">Post</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};
