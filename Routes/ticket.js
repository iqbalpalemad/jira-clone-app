const express            = require('express');
const router             = express.Router();


const getTicket          = require('../Contollers/projects/getTicket')
const createTicket       = require('../Contollers/projects/ticket');
const updateTicket       = require('../Contollers/projects/updateTicket');
const assignTicket       = require('../Contollers/projects/reassignTicket');

const validate           = require('../Validation/projects');
const userAuth           = require("../Middleware/userAuth");


router.post('/',userAuth,validate.ticketCreateValidate(),createTicket);
router.get('/:projectId',userAuth,getTicket);
router.post('/:ticketId/update',userAuth,validate.ticketUpdateValidate(),updateTicket);
router.post('/:ticketId/assign',userAuth,validate.AddUserValidate(),assignTicket);




module.exports = router;