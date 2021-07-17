const Project                       = require('../../Models/Project');

const getProject = async (req,res) => {
    try{
        const projects = await Project.find().cache("multiple")
        res.status(200).json({result : true,projects : projects});
    }
    catch(err){
        res.status(500).json({result : false, error : err.message});
    }
    
}

module.exports = getProject;