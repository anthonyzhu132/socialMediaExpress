const User = require('../models/user');
const _ = require('lodash')

exports.userById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if(err || !user) {
            return res.status(400).json({
                error: "User not found"
            })
        }
        req.profile =  user // adds profile object in req with user info
        next()
    })
}

exports.hasAuthorization = (req, res, next) => {
    const authorized = req.profile && req.auth && req.profile._id === req.auth._id
    if(!authorized) {
        return res.status(403).json({
            error: "User is not authorized"
        })
    }
}

exports.allUsers = (req, res) => {
    User.find((err, users) => {
        if(err) {
            return res.status(400).json({
                error: err
            })
        }
        res.json({users})
    }).select("name email updated created")
}

exports.getuser = (req, res) => {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile);
}

exports.updateUser = (req, res, next) => {
    let user = req.profile
    user = _.extend(user, req.body) // extend method will take the user object and edit with the request body for any changes made
    user.updated = Date.now();
    user.save((err) => {
        if(err) {
            return res.status(400).json({
                error: "You are not authorized to perform this action, please try again and check."
            })
        }
        user.hashed_password = undefined;
        user.salt = undefined;
        res.json({user})
    });
}