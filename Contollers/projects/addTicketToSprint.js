const Sprint                        = require('../../Models/Sprint');
const { validationResult }          = require('express-validator');
const mongoose                      = require('mongoose');

const addTicketToSprint = async (req,res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({result : false, errors: errors.array() });
    }
    try{
        const ticketInsprint = await Sprint.findOne({ tickets : { $in : [mongoose.Types.ObjectId(req.body.ticketId)]}});
        if(ticketInsprint){
            return res.status(400).json({result : false,message : "This ticket is already in a sprint", sprint : ticketInsprint});
        }

        const sprint = await Sprint.findOne({_id : req.params.sprintId})
        sprint.tickets.push(req.body.ticketId)
        const update = await sprint.save();
        return res.status(201).json({result : true,message : "Sprint updated successfully", _id : update._id});
    }
    catch(err){
        return res.status(500).json({result : false, error : err.message});
    }
}



module.exports = addTicketToSprint;