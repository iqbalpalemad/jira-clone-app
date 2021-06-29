const Sprint                       = require('../../Models/Sprint');
const { validationResult }          = require('express-validator');

const createSprint = async (req,res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({result : false, errors: errors.array() });
    }
    try{
        let activateSprint = false;
        const activeSprint  = await Sprint.findOne({projectId : req.body.projectId, active : true});
        if(!activeSprint){
            activateSprint = true;
        }

        const sprint = new Sprint({
            createdBy   : req.userId,
            updatedBy   : req.userId,
            projectId   : req.body.projectId,
            title       : req.body.title,
            active      : activateSprint
        });

        const save = await sprint.save();
        res.status(201).json({result : true,message : "Sprint created successfully", _id : save._id, active : activateSprint});
    }
    catch(err){
        res.status(500).json({result : false, error : err.message});
    }
}

module.exports = createSprint;