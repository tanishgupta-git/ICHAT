const express = require('express');
const router = express.Router();
const { body } = require('express-validator/check');
const chatController = require('../controllers/chat');
const isAuth = require('../middleware/isAuth');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const Chat = require('../models/chat');

router.post('/create-group',[
       body('name').trim().isLength({min:5}),
       body('description').trim()],
       chatController.createGroup);
