const { body } = require('express-validator');


exports.CreateValidate = () => {
    return [
        body('title').exists().isLength({ min: 5 })
    ]
}


exports.AddUserValidate = () => {
    return [
        body('projectId').exists(),
        body('userId').exists()
    ]
}