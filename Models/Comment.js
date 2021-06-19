const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
{
    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
    },
    updatedBy : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
    },
    projectId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
    },
    ticketId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
    },
    comment : {
        type : String,
        required : true
    }
},
{ timestamps: true }
);

module.exports = mongoose.model('Comment',commentSchema);