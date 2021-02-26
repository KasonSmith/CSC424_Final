const express = require('express')
const passport = require('passport')
const User = require('../models/user')

router.post('/login', function (req, res) {
    Users = new User({ username: req.body.username })

    User.register(Users, req.body.password, function (err, user) {
        if (err) {
            res.json({ success: false, message: "Your account could not be saved. Error: ", err })
        } else {
            res.json({ success: true, message: "Your account has been saved" })
        }
    })
})