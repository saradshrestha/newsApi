// routes/index.js
const express = require('express');
const router = express.Router();
const categoryController = require('../app/controllers/categoryController');
const authMiddleware = require('../app/middlewares/authMiddleware');
const { userProfileUpdateValidationRules, validate } = require('../app/validations/userProfileUpdateValidation');
const upload =  require('../global/imageUpload');



router.post('/post/create',
        [
                // authMiddleware,
                upload.single('image'), // Add file uploading middleware here
                // userProfileUpdateValidationRules,
                // validate,
        ],
        categoryController.storeCategory);
        
module.exports = router;
