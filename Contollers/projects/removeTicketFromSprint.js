const Sprint                        = require('../../Models/Sprint');
const { validationResult }          = require('express-validator');

const removerTickerFromSprint = async (req,res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({result : false, errors: errors.array() });
    }
    try{

        const sprint = await Sprint.findOne({_id : req.params.sprintId})
        if(!sprint.tickets.includes(req.body.ticketId)){
            return res.status(400).json({result : true,message : "Ticket is not a part of the sprint"});
        }
        sprint.tickets.pop(req.body.ticketId)
        const update = await sprint.save();
        return res.status(201).json({result : true,message : "Sprint updated successfully", _id : update._id});
    }
    catch(err){
        return res.status(500).json({result : false, error : err.message});
    }
}



module.exports = removerTickerFromSprint;