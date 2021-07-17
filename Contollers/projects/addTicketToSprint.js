const Sprint                                      = require('../../Models/Sprint');
const Ticket                                      = require('../../Models/Ticket');
const { validationResult }                        = require('express-validator');
const { clearRedisHashSet,clearRedisHashKey }     = require("../../utils/redis");


const addTicketToSprint = async (req,res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({result : false, errors: errors.array() });
    }
    try{
        const ticket  =  await Ticket.findOne( {_id : req.body.ticketId}).cache()
        if(!ticket){
            return res.status(400).json({result : false,message : "This ticket is not found"});
        }
        if(ticket.sprintId){
            return res.status(400).json({result : false,message : "This ticket is already in a sprint", sprintId : ticket.sprintId});
        }

        ticket.sprintId = req.params.sprintId;
        const update = await ticket.save();
        clearRedisHashSet(Ticket.collection.collectionName);
        clearRedisHashKey(Ticket.collection.collectionName,update._id);
        return res.status(201).json({result : true,message : "ticket added to sprint succesfully"});
    }
    catch(err){
        return res.status(500).json({result : false, error : err.message});
    }
}



module.exports = addTicketToSprint;