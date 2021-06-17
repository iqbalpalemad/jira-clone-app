const Project                       = require('../../Models/Project');
const { validationResult }          = require('express-validator');



const addUser = async (req,res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({result : false, errors: errors.array() });
    }

    try{
        const project = await Project.findOne({_id : req.body.projectId})
        if(!project){
            res.status(404).json({result : false,message : "Project not found"});
        }
        if(project.createdBy != req.userId){
            res.status(400).json({result : false,message : "You are not the owner of the project"});
        }
        project.users.push(req.body.userId);
        const save = await project.save();
        res.status(201).json({result : true, message : "project updated successfully"});
    }
    catch(err){
        res.status(500).json({result : false, error : err.message});
    }
}

module.exports = addUser;