const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema(
{
    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
    },
    currentUser : {
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
    sprintId : {
        type : mongoose.Schema.Types.ObjectId
    },
    title : {
        type : String,
        required : true,
        min : 5
    },
    description  : {
        type : String,
        min : 5
    }
},
{ timestamps: true }
);

module.exports = mongoose.model('Ticket',ticketSchema);