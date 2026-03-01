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
    company: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'companies'
      },
    Role :{
        type: String,
        required : [true,"Please provide a Role"],
    },
    Assignee :{
        // type: mongoose.Schema.Types.ObjectId,
        // ref: 'User',
        type: String,
        required : [true,"Please provide a Role"],
    },
    Status:{
        type: String,
        required: true,
        enum: ['Active', 'In Progress', 'Completed'], // Example vehicle types
    },
    DueDate:{
        type:String,
    },
    TeamMembers:[{
        // type: mongoose.Schema.Types.ObjectId,
        // ref: 'User',
        type: String,
        required : [true,"Please provide a Role"],
    }],
    department:[{
        // type: mongoose.Schema.Types.ObjectId,
        // ref: 'User',
        type: String,
        required : [true,"Please provide a Role"],
    }],
}, { timestamps: true })
const project = mongoose.models.projects || mongoose.model("projects",projectsSchema);

export default project