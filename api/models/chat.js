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
     type:Schema.Types.String,
     require:true
   }
  ],
  users : 
      [
        {
        type:Schema.Types.String,
        require:true
        }
      ]
   , messages : 
      [
          {   
    
              username :{
                type:Schema.Types.String,
                require:true
              },
              message : Schema.Types.String
          }
      ]

})

module.exports = mongoose.model('Chat',chatSchema);