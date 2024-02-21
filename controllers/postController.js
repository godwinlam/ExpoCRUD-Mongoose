const postModel = require("../models/postModel");

// create post
const createPostController = async (req, res) => {
  try {
    const { title, description } = req.body;

    //validate
    if (!title || !description) {
      return res.status(500).send({
        success: false,
        message: "Please Provide All Fields",
      });
    }

    const post = await postModel({
      title,
      description,
      postedBy: req.auth._id,
    }).save();

    res.status(201).send({
      success: true,
      message: "Post Created Successfully ",
      post,
    });
    console.log(req);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Create Post API",
      error,
    });
  }
};

//GET ALL POSTS
const getAllPostsController = async (req, res) => {
  try {
    const posts = await postModel
      .find()
      .populate("postedBy", "_id name")
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      message: "All Posts Data Successfully ",
      posts,
    });
  } catch (error) {
    console.log("🚀 ~ getAllPostsController ~ error:", error);
    res.status(500).send({
      success: false,
      message: "Error In Get All Posts API",
      error,
    });
  }
};

//Get User Posts
const getUserPostsController = async (req, res) => {
  try {
    const userPosts = await postModel.find({ postedBy: req.auth._id });

    res.status(200).send({
      success: true,
      message: "Get User Posts Data Successfully ",
      userPosts,
    });
  } catch (error) {
    console.log("🚀 ~ getUserPostsController ~ error:", error);
    return res.status(500).send({
      success: false,
      message: "Error In Get User Posts API",
      error,
    });
  }
};

//DELETE User Post
const deletePostController = async (req, res) => {
  try {
    const { id } = req.params;

    await postModel.findByIdAndDelete({ _id: id });

    res.status(200).send({
      success: true,
      message: "Deleted Posts Data Successfully ",
    });
  } catch (error) {
    console.log("🚀 ~ deletePostController ~ error:", error);
    return res.status(500).send({
      success: false,
      message: "Error In Delete User Posts API",
      error,
    });
  }
};

//DELETE User Post
const updatePostController = async (req, res) => {
  try {
    const { title, description } = req.body;

    //find post
    const post = await postModel.findById({ _id: req.params.id });

    //validation
    if (!title || !description) {
      return res.status(500).send({
        success: false,
        message: "Please Provide Post Title Or Description",
      });
    }

    //update post
    const updatedPost = await postModel.findByIdAndUpdate(
      {
        _id: req.params.id,
      },
      {
        title: title || post?.title,
        description: description || post?.description,
      },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Updated Posts Data Successfully ",
      updatedPost,
    });
  } catch (error) {
    console.log("🚀 ~ updatePostController ~ error:", error);
    return res.status(500).send({
      success: false,
      message: "Error In Update User Posts API",
      error,
    });
  }
};

module.exports = {
  createPostController,
  getAllPostsController,
  getUserPostsController,
  deletePostController,
  updatePostController,
};
