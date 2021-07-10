const Sprint                        = require('../../Models/Sprint');
const Ticket                        = require('../../Models/Ticket');

const getTicketsInSprint = async (req,res) => {
    try{
        const tickets = await Ticket.find({sprintId : req.params.sprintId}).cache()
        res.status(200).json({result : true,tickets : tickets});
    }
    catch(err){
        res.status(500).json({result : false, error : err.message});
    }
    
}

module.exports = getTicketsInSprint;