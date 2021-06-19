const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
{
    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
    },
    title : {
        type : String,
        required : true,
        min : 5
    },
    users : {
        type    : [mongoose.Schema.Types.ObjectId]
    }
},
{ timestamps: true }
);

module.exports = mongoose.model('Project',projectSchema);