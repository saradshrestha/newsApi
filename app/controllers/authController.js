// controllers/authController.js
const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const responseService = require('../../responseService/ResponseService');
const FileUploader = require('../../global/FileUploader');
const fileUploaderfn = new FileUploader();
const sendVerificationMail = require('../mail/userVerificationMail');

// Register a new user
exports.registerUser = async (req, res) => {
  try {   
    const { name, email, password} = req.body;
    
    const hash = await bcrypt.hash(password, saltRounds);
    const user = await User.create({ name, email, password:hash });
    if(user){
      // await sendVerificationMail(user.email);
      return res.json(responseService.success(user, 'User successfully registered.',200));
    } 
    return res.json(responseService.error("Something Went Wrong."));
  } catch (error) {
    console.error('Error in registerUser:', error); // Log the error
    return res.json(responseService.error('An unexpected error occurred.'));
  }
};



// Login an existing user
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ 
            where: { email }, 
            attributes: { exclude: ['createdAt', 'updatedAt'] } 
          });

    if (!user) {
      return res.json(responseService.error('Invalid Email Address.', 404));
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.json(responseService.error('Password Does Not Match', 401));
    }

    const secretKey = process.env.SECRET_KEY || 'fallback_secret_key';
    const token = jwt.sign({ 
                userId: user.id,
                userName: user.name 
              }, 
              secretKey, { expiresIn: '100h' }
            );

    return res.status(200).json(responseService.success({ user: user, token: token }, "Successfully Logged In."), 200);
  } catch (error) {
    return res.json(responseService.error('An unexpected error occurred.'));
  }
};
