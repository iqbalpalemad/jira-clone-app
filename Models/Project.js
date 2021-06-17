const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
{
    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
    },
    currentUser : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
    },
    title : {
        type : String,
        required : true,
        min : 5
    },
    deleted : {
        type : Boolean ,
        default : false
    },
    deletedOn : {
        type    : Date
    },
    users : {
        type    : [mongoose.Schema.Types.ObjectId]
    }
},
{ timestamps: true }
);

module.exports = mongoose.model('Project',projectSchema);