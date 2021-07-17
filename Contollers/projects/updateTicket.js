const Ticket                                   = require('../../Models/Ticket');
const Project                                  = require('../../Models/Project');
const { validationResult }                     = require('express-validator');
const { clearRedisHashSet,clearRedisHashKey }  = require("../../utils/redis");

const updateTicket = async (req,res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({result : false, errors: errors.array() });
    }
    try{
        const ticket = await Ticket.findOne({_id : req.params.ticketId}).cache()
        const project = await Project.findOne({_id : ticket.projectId}).cache()
        if(!project.users.includes(req.userId)){
            return res.status(400).json({result : false,message : "You are not the owner of the project"});
        }
        ticket.updatedBy = req.userId;
        ticket.title     = req.body.title;
        const save = await ticket.save();
        clearRedisHashSet(Ticket.collection.collectionName);
        clearRedisHashKey(Ticket.collection.collectionName,save._id);
        res.status(201).json({result : true,message : "Ticket updated successfully", _id : save._id});
    }
    catch(err){
        res.status(500).json({result : false, error : err.message});
    }
}

module.exports = updateTicket;