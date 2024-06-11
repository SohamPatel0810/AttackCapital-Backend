const { header, body } = require("express-validator");

exports.create = [
  header("auth_token", "Please send auth_token").trim().notEmpty(),
  body("title", "Please enter valid email id!").notEmpty(),
  body("content", "Please enter content").trim().notEmpty(),
];

exports.getPost = [
  header("auth_token", "Please send auth_token").trim().notEmpty(),
];
