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
  admins : [
   {
     type:Schema.Types.ObjectId,
     ref : 'User'
   }
  ],
  users : 
      [
        {
        type:Schema.Types.ObjectId,
         ref : 'User'
        }
      ]
   , messages : 
      [
          {   
              userId :{
                type:Schema.Types.ObjectId,
                ref : 'User'
              },
              message : Schema.Types.String
          }
      ]

})

module.exports = mongoose.model('Chat',chatSchema);