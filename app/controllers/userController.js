// controllers/userController.js
const User = require('../../models/user');
const { json } = require('body-parser');
const responseService = require('../../responseService/ResponseService');


exports.profileUpdate = async (req, res) => {
  try {
    const user = await User.findOne({ 
            where: { id: req.user_id }, 
            attributes: { exclude: ['createdAt', 'updatedAt'] } 
          });
    console.log(user);
    if (!user) return res.status(404).json(responseService.error('User Not Found', 404));
    // const { name, email } = req.body;
    // user.name = name;
    console.log(req.body);
    
      // console.log(uploaded,'uploaded');
      // return res.json(uploaded);
      // const uploadedImageId = req.file.id; 
      // user.profile_image_id = uploadedImageId;
    

    await user.save();
    return res.json(responseService.success(user,'Successfully Updated',200));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
