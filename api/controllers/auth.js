const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator/check');
const path = require('path');
const fs = require('fs');

// function for user signup
exports.userSignup = async (req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        const error = new Error('Validation failed,entered data is incorrect');
        error.statusCode = 422;
        return next(error);
    }
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    try {
        const hashedPw = await bcrypt.hash(password, 12);
        const user = new  User({
            username:username,
            email:email,
            password:hashedPw
        })
       await user.save();
       res.status(200).json({
           message:"User Signup Successfully"
       })
    }catch (err) {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      }
}

// function for user login
exports.userLogin = async (req,res,next) => {
 const username = req.body.username;
 const password = req.body.password;
 let loadedUser;
 try {
 const user = await User.findOne({username:username});
 if (!user) {
     const error = new Error('No user found.');
     error.statusCode = 422;
     return next(error);
 }
 loadedUser = user;
 const isEqual = await bcrypt.compare(password, user.password);
 if (!isEqual) {
   const error = new Error('Wrong password!');
   error.statusCode = 401;
   return next(error);
 }
 const token = jwt.sign(
   {
     email: loadedUser.email,
     username: loadedUser.username
   },
   // a super secret secret key
   'rEOcWGOm29lRwrHharJvzWTV7VCJ92Qv',
   { expiresIn: '1h' }
 );

 res.status(200).json({ token: token, username: loadedUser.username});
 } catch (err) {
    if(! err.statusCode) {
        err.statusCode = 500
    }
     next(err);
   }
}


// function for getting the information about the profile for user
exports.getUserProfile = async (req,res,next) => {
  const userId = req.params.userId;

  try {
    let user = await User.findById(userId);
    if(!user) {
      const error = new Error('No user found.');
      error.statusCode = 422;
      return next(error); 
    }
    res.status(200).json({username:user.username,fullname:user.fullname,email:user.email,
      profileImage:user.profileImage})
    
  } catch (err) {
    if(! err.statusCode) {
        err.statusCode = 500
    }
     next(err);
   }
}

// function for editing the information about the user profile
exports.editUserProfile = async (req,res,next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    clearImage(req.file.path.replace(/\\/g ,"/"));
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    return next(error);
  }
  const fullname = req.body.fullname;
  const mobileno = req.body.mobileno;
  const about = req.body.about;
  const userId = req.params.userId;
  let imageUrl = req.body.image;
  if (req.file) {
   imageUrl = req.file.path.replace(/\\/g ,"/");
 }
  if (!imageUrl) {
   const error = new Error("No file picked");
   error.statusCode = 422;
   return next(error); 
 }

 try {
   const user = await User.findById(userId);
   if (user._id.toString() !== userId) {
     const error = new Error('Not authorized!');
     error.statusCode = 403;
     return next(error);
   }
   if (imageUrl !== user.imageUrl) {
     clearImage(user.imageUrl);
   }
   user.imageUrl = imageUrl;
   user.fullname = fullname;
   user.mobileno = mobileno;
   user.about = about;
   await user.save();
   res.status(200).json({message:"User Updated Sucessfully"}) 
   
 }catch (err) {
   if(! err.statusCode) {
       err.statusCode = 500
   }
    next(err);
  }
  
}


// function for clear image
const clearImage = filePath => {
  if(filePath === "") {
    return;
  }
  filePath = path.join(__dirname,'..',filePath);
  fs.unlink(filePath,err => {
      console.log(err);
  })
}
