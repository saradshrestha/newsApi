const { check, validationResult } = require("express-validator");
const User = require("../../models/user");

exports.userStoreValidationRules = [
  check("name")
    .notEmpty()
    .withMessage("Please enter your name")
    .not()
    .isInt()
    .withMessage("Name should be string."),

  check("email")
    .isEmail()
    .withMessage("Please enter a valid email")
    .notEmpty()
    .withMessage("Please enter email")
    .custom(async (value) => {
      const existingUser = await User.findOne({ where: { email: value } });
      console.log(existingUser);
      if (existingUser) {
        throw new Error("Email address is already in use.", 422);
      }
    }),

  check("password")
    .notEmpty()
    .withMessage("Please enter your password")
    .isLength({ min: 6 })
    .withMessage("Please enter your password"),

  check("confirm_password")
    .notEmpty()
    .withMessage("Please enter your comfirm password")
    .isLength({ min: 6 })
    .withMessage("Please enter your comfirm password")
    .custom((value, { req }) => {
      return value === req.body.password;
    }).withMessage('Password and Confirm Password Must Be Same')
];

exports.validate = (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const formattedErrors = errors.array().map((error) => ({
        field: error.path, 
        message: error.msg,
      }));

      return res.status(422).json({ errors: formattedErrors });
    }
    return next();
  } catch (error) {
    return res
      .status(422)
      .json({ errors: [{ field: error.path, message: error.message }] });
  }
};
