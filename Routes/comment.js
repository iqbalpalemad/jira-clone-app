const express            = require('express');
const router             = express.Router();


const getComment         = require('../Contollers/projects/getComment');
const createComment      = require('../Contollers/projects/comment');
const updateComment      = require('../Contollers/projects/updateComment');

const validate           = require('../Validation/projects');
const userAuth           = require("../Middleware/userAuth");

router.get('/:ticketId',userAuth,getComment);
router.post('/',userAuth,validate.commentCreateValidate(),createComment);
router.post('/:commentId',userAuth,validate.commentUpdateValidate(),updateComment);



module.exports = router;