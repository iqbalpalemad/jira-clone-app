const Project                       = require('../../Models/Project');

const getProject = async (req,res) => {
    try{
        const projects = await Project.find()
        res.status(201).json({result : true,projects : projects});
    }
    catch(err){
        res.status(500).json({result : false, error : err.message});
    }
    
}

module.exports = getProject;