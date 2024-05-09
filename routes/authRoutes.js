// routes/index.js
const express = require('express');
const router = express.Router();
const { userStoreValidationRules, validate } = require('../app/validations/userStoreValidation');
const authController = require('../app/controllers/authController');

const authMiddleware = require('../app/middlewares/authMiddleware');


router.post('/register', userStoreValidationRules,validate,authController.registerUser);

router.post('/login', authController.loginUser);

module.exports = router;
