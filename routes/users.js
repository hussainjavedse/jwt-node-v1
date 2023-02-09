const express = require("express");
const router = express.Router();
const userController = require('../app/api/controllers/users');
const { body } = require('express-validator');

router.post('/register', body('email').isEmail(), body('password').isLength({min: 5}),userController.create);
router.post('/authenticate', body('email').isEmail(), body('password').isLength({min: 5}), userController.authenticate);

module.exports = router;