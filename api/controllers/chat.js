const Chat = require('../models/chat');
const User = require('../models/user');

// function for creating the group
exports.createGroup = async (req,res,next) => {
    const name = req.body.name;
    const description = req.body.description;
    const imageUrl = req.body.imageUrl; 
    try {
     const group = new Chat({ name : name,description:description,imageUrl:imageUrl});
     await group.save();
     res.status(200).json({
         name:name,
         message:"Group Created Succesfully" 
     })
    }catch (err) {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      }
}