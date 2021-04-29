const express = require('express');
const router = express.Router();
const { body } = require('express-validator/check');
const chatController = require('../controllers/chat');
const isAuth = require('../middleware/isAuth');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const fileStorage = multer.diskStorage({
       destination: function(req, file, cb) {
           cb(null, 'images/group/');
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

   
router.post('/create-group'
      ,isAuth,
      multer({ storage : fileStorage,fileFilter:fileFilter}).single('image'),
      [body('name').trim().isLength({min:5}),
       body('description').trim()], 
       chatController.createGroup);

router.get('/getJoinedgroups',isAuth,chatController.getJoinedGroups);       
module.exports = router;