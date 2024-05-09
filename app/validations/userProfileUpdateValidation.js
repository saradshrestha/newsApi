const { check, validationResult } = require("express-validator");
const User = require("../../models/user");
const { Op } = require('sequelize');


exports.userProfileUpdateValidationRules = [
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
    .custom(async (value,req) => {
      const existingUser = await User.findOne( { 
                  where: { 
                    email: value,
                    id: { [Op.ne]: req.userId } 
                  }});

      if (existingUser) {
        throw new Error("Email address is already in use.", 422);
      }
    }),

    // check("profile_image")
    // .custom((value, { req }) => {
    //   console.log(req.files,req.body,'valiadtion');      
    //   if (!req.files) {
    //     throw new Error("Profile image is required.");
    //   }
    //   // You can add additional checks for file type, size, etc. here
    //   return true; // Validation passed
    // })

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
