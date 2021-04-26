const express = require('express');
const { body } = require('express-validator/check');
const User = require('../models/user');
const router = express.Router();
const authController = require('../controllers/auth');
const isAuth = require('../middleware/isAuth');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const fileStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'images/users/');
    },
    filename: function(req, file, cb) {
        cb(null, uuidv4() + "-" + file.originalname)
    }
});

const fileFilter = (req,file,cb) => {
    if (file.mimetype === 'image/png' ||file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
    cb(null,true);
    }else{
        cb(null,false);
    }
}

router.put('/signup',[
    body('email').isEmail().withMessage("Please enter a valid email").bail().custom((value,{ req }) => {
        return User.findOne({email : value}).then(userDoc => {
            if (userDoc) {
                return Promise.reject('E-mail address already exists!');
            }
        })
    }).normalizeEmail(),
    body('password').trim().isLength({min : 5}),
    body('username').trim().isLength({min : 5}).bail().custom((value,{ req }) => {
        return User.findOne({username : value}).then(userDoc => {
            if (userDoc) {
                return Promise.reject('username already taken!');
            }
        })
    })
],authController.userSignup);
router.post('/login',authController.userLogin);
router.post('/profile/:userId',isAuth,
 multer({ storage : fileStorage,fileFilter:fileFilter}).single('image'),
 body('fullname').trim().isLength({min:3}),
 authController.editUserProfile)

router.get('/profile/:userId',isAuth,authController.getUserProfile);

module.exports = router;