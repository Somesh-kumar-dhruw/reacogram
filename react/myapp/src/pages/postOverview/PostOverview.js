import React, { useEffect, useState } from "react";
import "./PostOverview.css";
import { Card } from "../../components/card/Card";
import axios from "axios";
import Swal from "sweetalert2";
import { API_BASE_URL } from "../../config-file/config";

export const PostOverview = () => {
  const [allposts, setAllposts] = useState([]);

  const CONFIG_OBJ = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  const getAllPosts = async () => {
    console.log("getAllPosts");
    const response = await axios.get(`${API_BASE_URL}/allposts`);
    // debugger;

    if (response.status === 200) {
      setAllposts(response.data.posts);
    } else {
      Swal.fire({
        icon: "error",
        title: "Some error occurred while getting all posts",
      });
    }
  };

  const deletePost = async (postId) => {
    const response = await axios.delete(`${API_BASE_URL}/deletepost/${postId}`);
    if (response.status === 200) {
      getAllPosts();
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);
  return (
    <div className="container mt-5">
      <div className="row">
        {allposts.map((post) => {
          return (
            <div className="col-md-4 mb-5">
              <Card postData={post} deletePost={deletePost} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
