const express            = require('express');
const router             = express.Router();

const getProject         = require('../Contollers/projects/getProject')
const createProject      = require('../Contollers/projects/create');
const addUser            = require('../Contollers/projects/addUser')

const validate           = require('../Validation/projects');
const userAuth           = require("../Middleware/userAuth");

router.get('/',userAuth,getProject);
router.post('/project',userAuth,validate.CreateValidate(),createProject);
router.post('/:projectId/addUser',userAuth,validate.AddUserValidate(),addUser);


module.exports = router;