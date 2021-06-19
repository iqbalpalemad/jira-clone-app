const express                       = require('express');
const jwt                           = require('jsonwebtoken');
const bcrypt                        = require('bcrypt');
const User                          = require('../../Models/User')
const { validationResult }          = require('express-validator')

const login = async (req,res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({result : false, errors: errors.array() })
    }

    try{
        const user = await User.findOne({email:req.body.email});
        if(!user){
            return res.status(400).json({result : false, message : "Email address not found"});
        }

        const passwordMatch = await bcrypt.compare(req.body.password,user.password);
        if(!passwordMatch){
            return res.status(400).json({result : false, message : "Password doesn't match"});
        }

        const jwtSecret = process.env.JWT_SECRET;
        const jwtToken  = jwt.sign({id:user._id},jwtSecret,{expiresIn:'1d'})
        return res.status(200).json({result : true, message : "Logged in successfully",token : jwtToken});
    }
    catch(err){
        res.status(500).json({result : false, error : err.message});
    }
}

module.exports = login;