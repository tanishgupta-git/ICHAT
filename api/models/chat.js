const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = Schema({
  name : {
    type: Schema.Types.String,
    require :true
  },
  description:{
    type : Schema.Types.String,
    default : ""
  },
  imageUrl : {
   type : Schema.Types.String,
   default : ""
  },
  users : 
      [
        {
          user : {
         type:Schema.Types.ObjectId,
         ref : 'User'
        },
        isAdmin : {
          type : Schema.Types.Boolean,
          default : false
        }
        }
      ]
   , messages : 
      [
          {   
              username :"",
              msg : ""
          }
      ]

})

module.exports = mongoose.model('Chat',chatSchema);