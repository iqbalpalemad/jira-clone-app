const mongoose = require('mongoose');

const sprintSchema = new mongoose.Schema(
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
    title : {
        type : String,
        required : true
    },
    active : {
        type : Boolean,
        default : false
    },
    tickets : {
        type    : [mongoose.Schema.Types.ObjectId]
    }
},
{ timestamps: true }
);

module.exports = mongoose.model('Sprint',sprintSchema);