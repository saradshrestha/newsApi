// newsRoutes.js

const express = require('express');
const router = express.Router();
const newsController = require('../app/controllers/newsController');
const authMiddleware = require('../app/middlewares/authMiddleware');
const { userProfileUpdateValidationRules, validate } = require('../app/validations/userProfileUpdateValidation');
const upload = require('../global/FileUpload');


router.get('/index',
        newsController.index);

router.post('/store',
[
        upload.fields([
                { name: 'feature_image', maxCount: 1 }, 
                { name: 'images', maxCount: 10 }
                ]), 
                    

                // Add file uploading middleware here
                // userProfileUpdateValidationRules,
                // validate,
        ],
        newsController.store);

router.put('/update/:id',
        [
                upload.single('image'), // Add file uploading middleware here
                // userProfileUpdateValidationRules,
                // validate,
        ],
        newsController.update);


router.delete('/delete',
        newsController.delete);


module.exports = router;