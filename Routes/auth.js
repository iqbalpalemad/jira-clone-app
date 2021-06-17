const express   = require('express');
const router    = express.Router();
const signup    = require('../Contollers/auth/signup');
const login     = require('../Contollers/auth/login');
const validate  = require('../Validation/auth');

router.post('/signup',validate.signupValidate(),signup);
router.post('/login',validate.loginValidate(),login);
module.exports = router;