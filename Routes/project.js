const express        = require('express');
const router         = express.Router();
const createProject  = require('../Contollers/projects/create');
const addUser        = require('../Contollers/projects/addUser')
const validate       = require('../Validation/projects');
const userAuth       = require("../Middleware/userAuth");

router.post('/create',userAuth,validate.CreateValidate(),createProject);
router.post('/addUser',userAuth,validate.AddUserValidate(),addUser);
module.exports = router;