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
      user.password = Encrypt.bcrypt(user.password);
    }
    let newUser = await UserSchema(user);
    return await newUser.save();
  }

  async updateUserToken(user) {
    const data = {
      email: user?.email,
      userId: user?._id,
    };
    const authToken = await Encrypt.generateAuthToken(data);
    return await UserSchema.update(
      {
        user_id: user?._id,
      },
      {
        $set: {
          passwordHash: authToken,
        },
      }
    );
  }
}

module.exports = AuthenticationModel;
