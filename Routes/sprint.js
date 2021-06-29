const express                  = require('express');
const router                   = express.Router();

const createSprint             = require('../Contollers/projects/createSprint');
const getSprint                = require('../Contollers/projects/getSprint');
const activateSprint           = require('../Contollers/projects/activateSprint');
const deactivateSprint         = require('../Contollers/projects/deactivateSprint');
const addTicketToSprint        = require('../Contollers/projects/addTicketToSprint');
const getTicketsInSprint       = require('../Contollers/projects/getTicketsInSprint');
const removerTicketFromSprint  = require('../Contollers/projects/removeTicketFromSprint');

const validate                 = require('../Validation/projects');
const userAuth                 = require("../Middleware/userAuth");

router.post('/',userAuth,validate.createSprintValidate(),createSprint);
router.get('/:projectId',userAuth,getSprint);
router.post('/:sprintId/activate',userAuth,activateSprint)
router.post('/:sprintId/deactivate',userAuth,deactivateSprint)
router.post('/:sprintId/add',userAuth,validate.addTicketToSprintValidate(),addTicketToSprint)
router.get('/:sprintId/tickets',userAuth,getTicketsInSprint);
router.delete('/:ticketId/delete',userAuth,removerTicketFromSprint)



module.exports = router;