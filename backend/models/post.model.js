import mongoose from "mongoose";

const postSchema=new mongoose.Schema({
    userId:{type:String},
    description:{type:String},
    postDate:{type:String},
    postTime:{type:String},
    photos:{type:Array}
})

export default mongoose.model.Posts|| mongoose.model("Post",postSchema)