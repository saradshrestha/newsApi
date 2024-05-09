// controllers/categoryController.js
const Category = require('../../models/category');
const { json } = require('body-parser');
const { createSlug } = require('../../global/slugGenerator');
const responseService = require('../../responseService/ResponseService');


exports.storeCategory = async (req, res) => {
  try {   
    const { title,description} = req.body;
    const slug = createSlug(title);
    const user = await User.create({ title, slug:slug, description});
    if(user){
      // await sendVerificationMail(user.email);
      return responseService.success(user, 'User successfully registered.',200);
    } 
    return responseService.error("Something Went Wrong.",400);
  } catch (error) {
    console.error('Error in registerUser:', error); // Log the error
    return responseService.error(error);
  }
};

