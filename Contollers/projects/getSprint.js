const Sprint                        = require('../../Models/Sprint');

const getSprint = async (req,res) => {
    try{
        const sprint = await Sprint.find({projectId : req.params.projectId})
        res.status(200).json({result : true,sprint : sprint});
    }
    catch(err){
        res.status(500).json({result : false, error : err.message});
    }
    
}

module.exports = getSprint;