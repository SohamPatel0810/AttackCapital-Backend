const { STATUS_CODES } = require("../Configs/constants");
const AuthenticationModel = new (require("../Model/authentication"))();
const PostModel = new (require("../Model/post"))();

class PostController {
  async createPost(req, res) {
    try {
      let newPost = await PostModel.addPost(req.body,req.headers.userId);
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
      const author = req?.query?.authorId
      const userId = req?.headers?.token
      let posts = await PostModel.getPosts(author,userId);
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
