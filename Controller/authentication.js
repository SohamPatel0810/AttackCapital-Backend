const AuthenticationModel = new (require("../Model/authentication"))();
const { STATUS_CODES } = require("../Configs/constants");
const Encrypt = new (require("../Configs/encryption"))();

class AuthenticationController {
  async signUp(req, res) {
    try {
      let userExists = await AuthenticationModel.findUserByEmail(
        req.body.email
      );
      if (userExists) {
        return res.handler.custom(
          STATUS_CODES.CONFLICT,
          "VALIDATION.EXISTS.EMAIL"
        );
      }
      let newUser = await AuthenticationModel.addNewUser(req.body);
      if (newUser) {
        return res.handler.success("CREATED.USER");
      }
    } catch (error) {
      console.log(error);
      return res.handler.serverError(error);
    }
  }

  async logIn(req, res) {
    try {
      let userDetails = await AuthenticationModel.findUserByEmail(req.body?.email);

      if (!userDetails)
        return res.handler.custom(
          STATUS_CODES.CONFLICT,
          "VALIDATION.INCORRECT.EMAIL"
        );

      let isValidPass = await Encrypt.compareBcrypt(
        req.body.password,
        userDetails.passwordHash
      );
      if (!isValidPass)
        return res.handler.custom(
          STATUS_CODES.CONFLICT,
          "VALIDATION.INCORRECT.PASSWORD"
        );
      const authToken = await Encrypt.generateAuthToken();
      await AuthenticationModel.updateUserToken(userDetails,authToken);

      return res.handler.custom(STATUS_CODES.SUCCESS, "CREATED.LOGIN", {token:authToken,user : userDetails});
    } catch (error) {
      res.handler.serverError(error);
    }
  }
}

module.exports = AuthenticationController;
