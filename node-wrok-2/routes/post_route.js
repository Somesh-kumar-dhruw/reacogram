const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const PostModel = mongoose.model("PostModel");
const protectedRoute = require('../middleware/protectedResource');

//all users posts
router.get("/allposts", (req, res) => {
    PostModel.find()
    .populate("author", "_id fullName profileImg")
    .then((dbPosts) => {
        res.status(200).json({posts: dbPosts})
    })
    .catch((error) => {
        console.log(error);
    })
})


//all posts only from logged in user
router.get("/myallposts" , protectedRoute ,  (req, res) => {
    PostModel.find({author: req.user._id})
    .populate("author", "_id fullName profileImg")
    .then((dbPosts) => {
        res.status(200).json({posts: dbPosts})
    })
    .catch((error) => {
        console.log(error);
    })
})

router.post("/createpost", protectedRoute, (req, res) => {
    const {description, location, image} = req.body;
    if(!description || !location || !image){
        return res.status(400).json({error: "One or more mandatory fields are empty"});
    }
    req.user.password=undefined;
    const postObj = new PostModel({description: description, location: location, image: image, author: req.user});
    postObj.save()
    .then((newPost)=> {
        res.status(201).json({post: newPost})
    })
    .catch((error) => {
        console.log(error)
    })
});


// router.delete("/deletepost/:postId", protectedRoute, (req, res) => {
//     PostModel.findOne({_id: req.params.postId})
//     .populate("author", "_id")
//     .exec((error, postFound) => {
//         if(error || !postFound){
//             return res.status(400).json({error: "Post does not exist"})
//         }
//         //check if te post author is same as loggedin user only then allow deletion
//         if(postFound.author._id.toString() === req.user._id.toString()){
//             postFound.remove()
//             .then((data)=> {
//                 res.status(200).json({result: data})
//             })
//             .catch((error) => {
//                 console.log(error)
//             })
//         }
//     })
// });



// Delete a post by postId
router.delete("/deletepost/:postId", protectedRoute, async (req, res) => {
    try {
      const postFound = await PostModel.findOne({ _id: req.params.postId }).populate("author", "_id");
  
      if (!postFound) {
        return res.status(400).json({ error: "Post does not exist" });
      }
  
      // Check if the post author is the same as the logged-in user before allowing deletion
      if (postFound.author._id.toString() === req.user._id.toString()) {
        await PostModel.deleteOne({ _id: req.params.postId });
        res.status(200).json({ result: "Post deleted successfully" });
      } else {
        res.status(403).json({ error: "Permission denied: You can only delete your own posts" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  });


  router.put("/like", protectedRoute, async (req, res) => {
    try {
      const updatedPost = await PostModel.findByIdAndUpdate(
        req.body.postId,
        {
          $push: { likes: req.user._id }, // Use req.user._id instead of req.user._Id
        },
        {
          new: true, // Returns the updated record
        }
      ).populate("author", "_id fullName");
  
      if (!updatedPost) {
        return res.status(404).json({ error: "Post not found" });
      }
  
      res.json(updatedPost);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  router.put("/unlike", protectedRoute, async (req, res) => {
    try {
      const updatedPost = await PostModel.findByIdAndUpdate(
        req.body.postId,
        {
          $pull: { likes: req.user._id }, // Use req.user._id instead of req.user._Id
        },
        {
          new: true, // Returns the updated record
        }
      ).populate("author", "_id fullName");
  
      if (!updatedPost) {
        return res.status(404).json({ error: "Post not found" });
      }
  
      res.json(updatedPost);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  router.put("/comment", protectedRoute, async (req, res) => {
    try {
      const comment = { commentText: req.body.commentText, commentedBy: req.user._id };
  
      const updatedPost = await PostModel.findByIdAndUpdate(
        req.body.postId,
        {
          $push: { comments: comment },
        },
        {
          new: true, // Returns the updated record
        }
      )
        .populate("comments.commentedBy", "_id fullName") // Comment owner
        .populate("author", "_id fullName"); // Post owner
  
      if (!updatedPost) {
        return res.status(404).json({ error: "Post not found" });
      }
  
      res.json(updatedPost);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
  

  
module.exports = router;