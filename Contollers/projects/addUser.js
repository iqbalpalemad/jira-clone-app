const Project                       = require('../../Models/Project');
const { validationResult }          = require('express-validator');
const { clearRedisKey }             = require("../../utils/redis");


const addUser = async (req,res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({result : false, errors: errors.array() });
    }

    try{
        const project = await Project.findOne({_id : req.params.projectId}).cache()
        if(!project){
            return res.status(404).json({result : false,message : "Project not found"});
        }
        if(project.createdBy != req.userId){
            return res.status(400).json({result : false,message : "You are not the owner of the project"});
        }
        if(project.users.includes(req.body.userId)){
            return res.status(400).json({result : true, message : "User is already in this project"});
        }
        project.users.push(req.body.userId);
        const save = await project.save();
        clearRedisKey(Project.collection.collectionName);
        return res.status(201).json({result : true, message : "Project updated successfully"});
    }
    catch(err){
        return res.status(500).json({result : false, error : err.message});
    }
}

module.exports = addUser;