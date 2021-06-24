const Ticket                        = require('../../Models/Ticket');

const getTicket = async (req,res) => {
    try{
        const tickets = await Ticket.find({projectId : req.params.projectId})
        res.status(200).json({result : true,tickets : tickets});
    }
    catch(err){
        res.status(500).json({result : false, error : err.message});
    }
    
}

module.exports = getTicket;