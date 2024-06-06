// routes/categoriesRoutes.js
const express = require('express');
const router = express.Router();
const categoryController = require('../app/controllers/categoryController');
const authMiddleware = require('../app/middlewares/authMiddleware');
const { userProfileUpdateValidationRules, validate } = require('../app/validations/userProfileUpdateValidation');
const upload =  require('../global/FileUpload');


router.get('/index',categoryController.index);

router.post('/store',
        [
                upload.single('image'), // Add file uploading middleware here
                // userProfileUpdateValidationRules, validate,
        ],
        categoryController.store);

router.put('/update/:id',
        [
                upload.single('image'), // Add file uploading middleware here
                // userProfileUpdateValidationRules, validate,
        ],
        categoryController.update);


router.delete('/delete',
        categoryController.delete);


module.exports = router;
