const { post: PostSchema } = require("../Database/Schemas");
class PostModel {
  async addPost(post, userId) {
    let newPost = await PostSchema({
      authorId: userId,
      title: post?.title,
      content: post?.content,
    });
    return await newPost.save();
  }

  async getPosts(author,user_token) {
    let posts;
    if (author && user_token) {
      posts = await PostSchema.aggregate([
        {
          $match: {
            authorId: new mongoose.Types.ObjectId(author),
          },
        },
        {
          $project: {
            authorId: 1,
            title: 1,
            content: 1,
            created_at: 1,
          },
        },
        {
          $sort: {
            created_at: -1,
          },
        },
      ]);
    } else {
      posts = await PostSchema.aggregate([
        {
          $project: {
            authorId: 1,
            title: 1,
            content: 1,
            created_at: 1,
          },
        },
        {
          $sort: {
            created_at: -1,
          },
        },
      ]);
    }
    return posts;
  }
}

module.exports = PostModel;
