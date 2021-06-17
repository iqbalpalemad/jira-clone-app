const jwt   = require('jsonwebtoken');
const User  = require("../Models/User");

const userAuth = async (req, res, next) => {
    const header = req.headers['authorization'];
    if(header){
        const headerArray = header.split(' ');
        const token       = headerArray[1];
        req.token         = token;
        const jwtSecret   = process.env.JWT_SECRET;
        try{
            const decoded = await jwt.verify(token,jwtSecret);
            const user    = await User.findById(decoded.id);
            if(!user){
                res.status(400).json({result : false, message : "authorization failed"});
            }
            req.userId = decoded.id
            next();
        }
        catch(err){
            res.status(400).json({result : false, message : "authorization failed"});
        }
        
    }
    else{
        res.status(400).json({result : false, message : "authorization failed"});
    }
    
}

module.exports = userAuth;