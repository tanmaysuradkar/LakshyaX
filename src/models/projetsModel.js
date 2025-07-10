import mongoose from "mongoose";

const projectsSchema = new mongoose.Schema({
    projectName:{
        type: String,
        required : [true,"Please provide a username"],
        trim: true
    },
    Description:{
        type: String,
        required : [true,"Please provide a Description"]
    },
    Role :{
        type: String,
        required : [true,"Please provide a Role"],
    },
    Assignee :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required : [true,"Please provide a Assignee"],
    },
    Status:{
        type: String,
        required: true,
        enum: ['', '', ''], // Example vehicle types
    },
    DueDate:{
        type:String,
    },
    TeamMembers:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    department:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
}, { timestamps: true })
const User = mongoose.models.projects || mongoose.model("projects",projectsSchema);

export default User