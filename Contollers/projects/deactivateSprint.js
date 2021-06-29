const Sprint                        = require('../../Models/Sprint');
const deactivateSprint = async (req,res) => {
    try{
        const sprint = await Sprint.findOne({_id : req.params.sprintId})
        
        if(!sprint){
            return res.status(400).json({result : false, message : "Sprint not found"});
        }

        if(!sprint.active){
            return res.status(400).json({result : false, message : "this sprint is aleady inactive",});
        }

        sprint.active = false;
        const update  = await sprint.save();

        return res.status(201).json({result : true,message : "Sprint updated successfully", _id : sprint._id, active : sprint.active});

    }
    catch(err){
        return res.status(500).json({result : false, error : err.message});
    }

}

module.exports = deactivateSprint;