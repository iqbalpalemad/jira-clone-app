const Project                       = require('../../Models/Project');
const { validationResult }          = require('express-validator');
const { clearRedisHashSet }         = require("../../utils/redis");



const createProject = async (req,res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({result : false, errors: errors.array() });
    }
    try{
        const project = new Project({
            createdBy   : req.userId,
            title       : req.body.title,
            users       : [req.userId],
            currentUser : req.userId
        });

        const save = await project.save();
        clearRedisHashSet(Project.collection.collectionName);
        res.status(201).json({result : true,message : "Project created successfully", _id : save._id});
    }
    catch(err){
        res.status(500).json({result : false, error : err.message});
    }
}

module.exports = createProject;