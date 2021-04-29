const Chat = require('../models/chat');
const User = require('../models/user');
const { validationResult } = require('express-validator/check');

// function for creating the group
exports.createGroup = async (req,res,next) => {
   const errors = validationResult(req);
   if(!errors.isEmpty()) {
      const error = new Error('Validation failed,entered data is incorrect');
      error.statusCode = 422;
      return next(error);
   }
    const name = req.body.name;
    const description = req.body.description;
    let imageUrl = req.body.image;
    if (req.file) {
      imageUrl = req.file.path.replace(/\\/g ,"/");
    }else {
      imageUrl = ""
    }
    try {
     const user = await User.findById(req.userId);
     const group = new Chat({ name : name,description:description,imageUrl:imageUrl});
     group.users.push(req.userId);
     group.admins.push(req.userId);
     await group.save();
     user.chats.push(group);
     await user.save();
     res.status(200).json({
         name:name,
         message:"Group Created Succesfully",
         group:group 
     })
    }catch (err) {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      }
}

// function for join the group
exports.joingroup = async (req,res,next) => {
  const grpName = req.params.grpName;
  try {
    const group = await Chat.findOne({ name : grpName});
    if (!group) {
      const error = new Error('No Group found.');
      error.statusCode = 422;
      return next(error); 
    }
   const user = await User.findById(req.userId);
   user.chats.push(group);
   await user.save();
   res.status(200).json({
     messsge : "Group Joined Succesfully"
   })
  }catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

// function for getting all groups joined by the user
exports.getJoinedGroups = async (req,res,next) => {
  try{
   const user =await User.findById(req.userId).populate('chats');
   
   res.status(200).json({ chats : user.chats})
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);    
  }
  
}