const Comment      = require('../../Models/Comment');

const getComment = async (req,res) => {
    try{
        const page       = parseInt(req.body.page);
        const limit      = parseInt(req.body.limit);
        const skipIndex  = (page - 1) * limit;
        let comments;
        if(page == NaN || limit == NaN){
            comments = await Comment.find({ticketId : req.params.ticketId})
                                    .sort({ _id: 1 })
                                    .exec().cache()
        }
        else{
            comments = await Comment.find({ticketId : req.params.ticketId})
                                        .sort({ _id: 1 })
                                        .limit(limit)
                                        .skip(skipIndex)
                                        .exec().cache()
        }
        res.status(200).json({result : true,comments : comments});
    }
    catch(err){
        res.status(500).json({result : false, error : err.message});
    }
    
}

module.exports = getComment;