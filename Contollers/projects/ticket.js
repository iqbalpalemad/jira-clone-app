const Ticket                        = require('../../Models/Ticket');
const { validationResult }          = require('express-validator');
const Project                       = require('../../Models/Project');
const createTicket = async (req,res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({result : false, errors: errors.array() });
    }
    try{
        const project = await Project.findOne({_id : req.body.projectId})
        if(!project.users.includes(req.userId)){
            return res.status(400).json({result : false,message : "You are not the owner of the project"});
        }
        const ticket = new Ticket({
            createdBy   : req.userId,
            currentUser : req.userId,
            updatedBy   : req.userId,
            projectId   : req.body.projectId,
            title       : req.body.title,
            description : req.body.description
        });

        const save = await ticket.save();
        res.status(201).json({result : true,message : "Ticket created successfully", _id : save._id});
    }
    catch(err){
        res.status(500).json({result : false, error : err.message});
    }
}

module.exports = createTicket;