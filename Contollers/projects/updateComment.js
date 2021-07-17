const Ticket                                     = require('../../Models/Ticket');
const Comment                                    = require('../../Models/Comment');
const { validationResult }                       = require('express-validator');
const Project                                    = require('../../Models/Project');
const { clearRedisHashSet,clearRedisHashKey }    = require("../../utils/redis");


const updateComment = async (req,res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({result : false, errors: errors.array() });
    }
    try{
        const comment  = await Comment.findOne({_id : req.params.commentId}).cache();
        if(!comment){
            return res.status(400).json({result : false,message : "Invalid Comment ID"});
        }
        const project = await Project.findOne({_id : comment.projectId}).cache()
        if(!project.users.includes(req.userId)){
            return res.status(400).json({result : false,message : "You are not the owner of the project"});
        }
        comment.updatedBy   = req.userId,
        comment.comment     = req.body.comment

        const save = await comment.save();
        clearRedisHashSet(Comment.collection.collectionName);
        clearRedisHashKey(Comment.collection.collectionName,save._id);
        res.status(201).json({result : true,message : "Comment Updated successfully", _id : save._id});
    }
    catch(err){
        res.status(500).json({result : false, error : err.message});
    }
}

module.exports = updateComment;