const randomstring = require("randomstring");
const bcrypt = require("bcryptjs");
const saltRounds = parseInt(process.env.ENCRYPTION_SALT_ROUNDS);
const jwt = require("jsonwebtoken");

class EncryptionHandler {
  bcrypt(data) {
    return bcrypt.hashSync(
      data.toString(),
      bcrypt.genSaltSync(saltRounds),
      null
    );
  }

  compareBcrypt(entity, encryptEntity) {
    return bcrypt.compareSync(entity, encryptEntity);
  }

  generateAuthToken() {
    var token = jwt.sign(data, process.env.JWT_KEY, {
      expiresIn: "5h",
    });
    return token;
  }
}

module.exports = EncryptionHandler;
