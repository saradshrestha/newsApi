// routes/index.js
const express = require('express');
const router = express.Router();
const userController = require('../app/controllers/userController');
const authMiddleware = require('../app/middlewares/authMiddleware');
const { userProfileUpdateValidationRules, validate } = require('../app/validations/userProfileUpdateValidation');
const upload =  require('../global/imageUpload');



router.post('/profile-update',
        [
                authMiddleware,
                upload.single('profile_image'), // Add file uploading middleware here
                userProfileUpdateValidationRules,
                validate,
        ],
        userController.profileUpdate);
        
module.exports = router;
