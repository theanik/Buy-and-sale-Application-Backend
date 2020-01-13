const router = require('express').Router();
const express = require('express')
const UserController = require('../controller/userController');

const reject_invalid = require('../middelware/reject_invalid')
const { check } = require('express-validator')
const bp = require('body-parser')
const app = express()
app.use(bp.urlencoded({ extended: false }))
app.use(bp.json())

const registerValidator = [
    check('name').exists(),
    check('phone').exists()
]

router.post('/register_user', registerValidator, reject_invalid, UserController.register)


module.exports = router