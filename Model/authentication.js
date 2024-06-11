const { user: UserSchema } = require("./../Database/Schemas");
const Encrypt = new (require("../Configs/encryption"))();
class AuthenticationModel {
  async findUserByEmail(emailId) {
    return await UserSchema.findOne({
      email: emailId,
    });
  }

  async addNewUser(user) {
    if (user.password) {
      user.passwordHash = Encrypt.bcrypt(user.password);
    }
    user.token = null;
    let newUser = await UserSchema(user);
    return await newUser.save();
  }

  async updateUserToken(user,authToken) {
    return await UserSchema.updateOne(
      {
        _id: user?._id,
      },

      {
        $set: {
          token: authToken,
        },
      }
    );
  }
}

module.exports = AuthenticationModel;
