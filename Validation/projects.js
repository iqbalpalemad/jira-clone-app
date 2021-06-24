const { body } = require('express-validator');


exports.CreateValidate = () => {
    return [
        body('title').exists().isLength({ min: 5 })
    ]
}


exports.AddUserValidate = () => {
    return [
        body('userId').exists().isLength({ min: 24 , max:24})
    ]
}



exports.ticketCreateValidate = () => {
    return [
        body('projectId').exists().isLength({ min: 24 , max:24}),
        body('title').exists().isLength({ min: 5 }),
        body('description').optional().isLength({ min: 5 })
    ]
}

exports.ticketUpdateValidate = () => {
    return [
        body('title').exists().isLength({ min: 5 })
    ]
}




exports.commentCreateValidate = () => {
    
    return [
        body('ticketId').exists().isLength({ min: 24 , max:24}),
        body('comment').exists().isLength({ min: 5 })
    ]
}


exports.commentUpdateValidate = () => {
    return [
        body('comment').exists().isLength({ min: 5 })
    ]
}



exports.createSprintValidate  = () => {
    return [
        body('projectId').exists().isLength({ min: 24 , max:24}),
        body('title').exists().isLength({ min: 5 })
    ]
}


exports.addTickerToSprintValidate  = () => {
    return [
        body('ticketId').exists().isLength({ min: 24 , max:24})
    ]
}