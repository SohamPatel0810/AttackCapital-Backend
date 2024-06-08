const express = require("express");
const router = express.Router();
const { post: postValidator } = require("../Middleware/Validators");
const Authentication = require("../Middleware/authentication").authentication;
//CONTROLLERS
const PostController = new (require("./../Controller/post"))();

router.route("/app-constant").get(CommonController.getDefaultValues);

router
  .route("/post")
  .post(postValidator.create, Authentication, PostController.createPost);

router
  .route("/posts")
  .get(postValidator.getPost, Authentication, PostController.getPost);

router
  .route("/posts?author=/:userId")
  .get(postValidator.getPost, Authentication, PostController.getPostByUser);

module.exports = router;
