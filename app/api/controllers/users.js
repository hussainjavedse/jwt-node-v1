'use strict';
const userModel = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require('express-validator');

module.exports = {
    async create(req, res) {
        var errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        var userFound = await userModel.findOne({email: req.body.email});
        console.log(userFound)
        if (userFound) {
            res.json({status: "error", message: "user already exists", data: userFound})
        } else {
            var result = await userModel.create({name: req.body.name, email: req.body.email, password: req.body.password});
            if (!result) {
                res.json({status: "error", message: "cannot create user this time", data: null})
            } else {
                res.json({status: "success", message: "user added successfully", data: null})
            }
        }
    },

    async authenticate(req, res, next) {
        var errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        var userInfo = await userModel.findOne({email: req.body.email});
        if (!userInfo) {
            res.json({status: 404, "message": "something went wrong"})
        } else {
            if (bcrypt.compareSync(req.body.password, userInfo.password)) {
                const token = jwt.sign({id: userInfo.id}, req.app.get("secretKey"), {expiresIn: '1h'});
                res.json({status: 200, "message": "user found", data: {user: userInfo, token: token}})
            } else {
                res.json({status: 404, "message": "invalid email/password !!!!"})
            }
        }
    }
}