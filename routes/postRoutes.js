const express = require("express");
const { requireSignIn } = require("../controllers/userController");
const {
  createPostController,
  getAllPostsController,
  getUserPostsController,
  deletePostController,
  updatePostController,
} = require("../controllers/postController");

//route object
const router = express.Router();

//CREATE POST || POST
router.post("/create-post", requireSignIn, createPostController);

//GET ALL POSTS
router.get("/get-all-post", getAllPostsController);

//GET User POSTS
router.get("/get-user-post", requireSignIn, getUserPostsController);

//DELETE USER POSTS
router.delete("/delete-user-post/:id", requireSignIn, deletePostController);

//UPDATE USER POSTS
router.put("/update-user-post/:id", requireSignIn, updatePostController);

//export
module.exports = router;
