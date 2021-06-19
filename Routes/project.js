const express        = require('express');
const router         = express.Router();
const createProject  = require('../Contollers/projects/create');
const addUser        = require('../Contollers/projects/addUser')

const createTicket   = require('../Contollers/projects/ticket');
const updateTicket   = require('../Contollers/projects/updateTicket');
const assignTicket   = require('../Contollers/projects/reassignTicket');

const createComment  = require('../Contollers/projects/comment');
const updateComment  = require('../Contollers/projects/updateComment');

const validate       = require('../Validation/projects');
const userAuth       = require("../Middleware/userAuth");

router.post('/project',userAuth,validate.CreateValidate(),createProject);
router.post('/ticket',userAuth,validate.ticketCreateValidate(),createTicket);
router.post('/:projectId/addUser',userAuth,validate.AddUserValidate(),addUser);
router.post('/ticket/:ticketId/update',userAuth,validate.ticketUpdateValidate(),updateTicket);
router.post('/ticket/:ticketId/assign',userAuth,validate.AddUserValidate(),assignTicket);
router.post('/comment',userAuth,validate.commentCreateValidate(),createComment);
router.post('/comment/:commentId',userAuth,validate.commentUpdateValidate(),updateComment);
module.exports = router;