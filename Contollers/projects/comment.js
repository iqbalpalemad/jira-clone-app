const Ticket                        = require('../../Models/Ticket');
const Comment                       = require('../../Models/Comment');
const { validationResult }          = require('express-validator');
const Project                       = require('../../Models/Project');
const { clearRedisHashSet }         = require("../../utils/redis");



const createComment = async (req,res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({result : false, errors: errors.array() });
    }
    try{
        const ticket  = await Ticket.findOne({_id : req.body.ticketId}).cache();
        if(!ticket){
            return res.status(400).json({result : false,message : "Invalid Ticket"});
        }
        const project = await Project.findOne({_id : ticket.projectId}).cache();
        if(!project.users.includes(req.userId)){
            return res.status(400).json({result : false,message : "You are not the owner of the project"});
        }
        const comment = new Comment({
            createdBy   : req.userId,
            updatedBy   : req.userId,
            projectId   : ticket.projectId,
            ticketId    : req.body.ticketId,
            comment     : req.body.comment
        });

        const save = await comment.save();
        clearRedisHashSet(Comment.collection.collectionName);
        res.status(201).json({result : true,message : "Comment created successfully", _id : save._id});
    }
    catch(err){
        res.status(500).json({result : false, error : err.message});
    }
}

module.exports = createComment;