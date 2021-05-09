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
     const user = await User.findOne({username:req.username});
     const group = new Chat({ name : name,description:description,imageUrl:imageUrl});
     group.users.push(req.username);
     group.admins.push(req.username);
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
   const user = await User.findOne({username:req.username});
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
   const user =await User.findOne({username:req.username}).populate('chats');
   res.status(200).json({ chats : user.chats})
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);    
  }
  
}

// funtion for getting groups that need to explored 
exports.getExploreGroups = async (req,res,next) => {
  try {
    const user = await User.findOne({username:req.username}).populate('chats');
    const groups = await Chat.find();
    let userGroups = user.chats.map( chat => chat.name);
    const exploreGroups = groups.filter( group => (userGroups.indexOf(group.name) === -1) )
    res.status(200).json({ groups : exploreGroups});
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);    
  }
}

// function for joining the group
exports.joinGroup = async (req,res,next) => {
  const grpId = req.params.grpId;
  try {
   const user = await  User.findOne({username:req.username});
   const group = await Chat.findById(grpId);
   if (!group) {
    const error = new Error('No Group found.');
    error.statusCode = 422;
    return next(error); 
  }
  group.users.push(user);
  await group.save();
  user.chats.push(group);
  await user.save();
  res.status(200).json({ message : "Group Joined Successfully"});
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);    
  }
}

// function for adding the messages
exports.addMessage = async (req,res,next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
     const error = new Error('Validation failed,entered data is incorrect');
     error.statusCode = 422;
     return next(error);
  }
  const grpId = req.params.grpId;
  const message  = req.body.message;
  try {
    const user = await User.findOne({username:req.username}); 
    const chat =await Chat.findById(grpId);
    chat.messages.push({ username:user.username,message:message});
    await chat.save();
    res.json({ message:"Added Successfully"});
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);    
  }
}

// function for getting the messages of a group
exports.getGroupMessages = async (req,res,next) => {
  const grpId = req.params.grpId;
  try {
   const chat = await Chat.findById(grpId);
   res.status(200).json({ messages : chat.messages })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);    
  }

}