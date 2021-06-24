const express        = require('express');
const router         = express.Router();

const getProject     = require('../Contollers/projects/getProject')
const createProject  = require('../Contollers/projects/create');
const addUser        = require('../Contollers/projects/addUser')

const getTicket      = require('../Contollers/projects/getTicket')
const createTicket   = require('../Contollers/projects/ticket');
const updateTicket   = require('../Contollers/projects/updateTicket');
const assignTicket   = require('../Contollers/projects/reassignTicket');

const getComment     = require('../Contollers/projects/getComment');
const createComment  = require('../Contollers/projects/comment');
const updateComment  = require('../Contollers/projects/updateComment');

const createSprint   = require('../Contollers/projects/createSprint');
const getSprint      = require('../Contollers/projects/getSprint');
const activateSprint = require('../Contollers/projects/activateSprint');
const deactivateSprint = require('../Contollers/projects/deactivateSprint');

const validate       = require('../Validation/projects');
const userAuth       = require("../Middleware/userAuth");

router.get('/',userAuth,getProject);
router.post('/project',userAuth,validate.CreateValidate(),createProject);
router.post('/:projectId/addUser',userAuth,validate.AddUserValidate(),addUser);



router.post('/ticket',userAuth,validate.ticketCreateValidate(),createTicket);
router.get('/ticket/:projectId',userAuth,getTicket);
router.post('/ticket/:ticketId/update',userAuth,validate.ticketUpdateValidate(),updateTicket);
router.post('/ticket/:ticketId/assign',userAuth,validate.AddUserValidate(),assignTicket);


router.get('/comment/:ticketId',userAuth,getComment);
router.post('/comment',userAuth,validate.commentCreateValidate(),createComment);
router.post('/comment/:commentId',userAuth,validate.commentUpdateValidate(),updateComment);


router.post('/sprint',userAuth,validate.createSprintValidate(),createSprint);
router.get('/sprint/:projectId',userAuth,getSprint);
router.post('/sprint/:sprintId/activate',userAuth,activateSprint)
router.post('/sprint/:sprintId/deactivate',userAuth,deactivateSprint)

module.exports = router;