const Sprint                        = require('../../Models/Sprint');
const activateSprint = async (req,res) => {
    try{
        const sprint = await Sprint.findOne({_id : req.params.sprintId})
        if(!sprint){
            return res.status(400).json({result : false, message : "Sprint not found"});
        }
        if(sprint.active){
            return res.status(400).json({result : false, message : "this is already an active sprint",});
        }
        const activeSprint = await Sprint.findOne({projectId : sprint.projectId , active : true})
        if(activeSprint){
            return res.status(400).json({result : false, message : "a sprint is already active in this project", sprint : activeSprint});
        }

        sprint.active = true;
        const update  = await sprint.save();

        return res.status(201).json({result : true,message : "Sprint updated successfully", _id : sprint._id, active : sprint.active});

    }
    catch(err){
        return res.status(500).json({result : false, error : err.message});
    }

}

module.exports = activateSprint;