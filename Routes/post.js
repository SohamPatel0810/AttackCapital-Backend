const express = require("express");
const router = express.Router();
const { post: postValidator } = require("../Middleware/Validators");
const Authentication = require("../Middleware/authentication").authentication;
//CONTROLLERS
const PostController = new (require("./../Controller/post"))();

router
  .route("/post")
  .post(postValidator.create, Authentication, PostController.createPost);

router
  .route("/posts")
  .get(postValidator.getPost, PostController.getPost);

module.exports = router;
