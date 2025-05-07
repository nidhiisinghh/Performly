const mongoose=require('mongoose')

const UserSchema=new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    phoneno:{
        type:Number
    },
    usertype:{
        type:String
    },
    password:{
        type:String
    },
    address:{
        type:String
    }
})

module.exports=mongoose.model("User",UserSchema)