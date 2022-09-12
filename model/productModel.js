const mongoose = require('mongoose')

const productSchema=new mongoose.Schema({
    imageUrl:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    ratings:{
        type:Number,
        required:true
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"categories"
    }
},{
    timestamps: true
})

module.exports=mongoose.model("products",productSchema)