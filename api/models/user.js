const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username:{
     type:String,
     require:true
    },
    fullname : {
        type:String,
        default:""
    },
    password:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    imageUrl:{
        type:String,
        default:""
    },
    mobileno:{
     type :String,
     default : ""
    },
    about : {
        type:String,
        default:""
    },
    chats : [
        {
        type:Schema.Types.ObjectId,
        ref : 'Chat'
        }
    ]
})

module.exports = mongoose.model('User', userSchema);