const { post: PostSchema } = require("../Database/Schemas");
class PostModel {
  async addPost(post, userDetails) {
    let newPost = await PostSchema({
      authorId: userDetails?._id,
      title: post?.title,
      content: post?.content,
    });
    return await newPost.save();
  }

  async getPosts(body) {
    const limit = parseInt(body.per_page);
    const offset = body.per_page * (body.current_page - 1);

    const posts = await PostSchema.aggregate([
      {
        _id: 1,
        title: 1,
        content: 1,
        authorId: 1,
      },
      {
        $lookup: {
          from: "user",
          localField: "authorId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        skip: offset,
        limit: limit,
      },
    ]);
    let count = await PostSchema.countDocuments({});
    return {
      rows: posts,
      count,
    };
  }

  async getPost(userId, body) {
    const limit = parseInt(body.per_page);
    const offset = body.per_page * (body.current_page - 1);

    const posts = await PostSchema.aggregate([
      {
        $match: {
          authorId: userId,
        },
      },
      {
        _id: 1,
        title: 1,
        content: 1,
        authorId: 1,
      },
      {
        $lookup: {
          from: "user",
          localField: "authorId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        skip: offset,
        limit: limit,
      },
    ]);
    let count = await PostSchema.countDocuments({});
    return {
      rows: posts,
      count,
    };
  }
}

module.exports = PostModel;
