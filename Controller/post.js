const { STATUS_CODES } = require("../Configs/constants");
const AuthenticationModel = new (require("../Model/authentication"))();
const PostModel = new (require("../Model/post"))();

class PostController {
  async createPost(req, res) {
    try {
      let userExists = await AuthenticationModel.findUserByEmail(
        req.body.email
      );
      if (!userExists) {
        return res.handler.custom(
          STATUS_CODES.CONFLICT,
          "VALIDATION.USER.DOESNTEXIST"
        );
      }
      let newPost = await PostModel.addPost(req.body, userExists);
      if (newPost) {
        return res.handler.success("CREATED.POST");
      }
    } catch (error) {
      console.log(error);
      return res.handler.serverError(error);
    }
  }

  async getPost(req, res) {
    try {
      let userExists = await AuthenticationModel.findUserByEmail(
        req.body.email
      );
      if (!userExists) {
        return res.handler.custom(
          STATUS_CODES.CONFLICT,
          "VALIDATION.USER.DOESNTEXIST"
        );
      }
      let posts = await PostModel.getPosts(req.body);
      if (posts) {
        return res.handler.custom(
          STATUS_CODES.SUCCESS,
          "STATUS.SUCCESS",
          posts
        );
      }
    } catch (error) {
      console.log(error);
      return res.handler.serverError(error);
    }
  }

  async getPostByUser(req, res) {
    try {
      let posts = await PostModel.getPost(req.headers.userId, req.body);
      if (posts) {
        return res.handler.custom(
          STATUS_CODES.SUCCESS,
          "STATUS.SUCCESS",
          posts
        );
      }
    } catch (error) {
      console.log(error);
      return res.handler.serverError(error);
    }
  }
}

module.exports = PostController;
