const { validationResult } = require("express-validator");
exports.authentication = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.handler.validationError(undefined, errors.array());

  // USED FOR WHEN AUTHENTICATION IS OPTIONAL
  if (!req.headers.auth_token) return next();

  let data = await UserSchema.findOne({
    passwordHash: req.headers.auth_token,
  });

  if (data.length < 1) return res.handler.unauthorized();

  req.headers.userId = data[0]._id;

  next();
};
