const Ticket                        = require('../../Models/Ticket');
const { validationResult }          = require('express-validator');

const removerTickerFromSprint = async (req,res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({result : false, errors: errors.array() });
    }
    try{

        const ticket = await Ticket.findOne({_id : req.params.ticketId})
        if(!ticket.sprintId){
            return res.status(400).json({result : true,message : "Ticket is not a part of any sprint"});
        }
        ticket.sprintId = null;
        const update = await ticket.save();
        return res.status(201).json({result : true,message : "ticket remove from sprint successfully"});
    }
    catch(err){
        return res.status(500).json({result : false, error : err.message});
    }
}



module.exports = removerTickerFromSprint;