import mongoose from "mongoose";
const { Schema } = mongoose;
const skill = new mongoose.Schema({
    ability:{
        required: true,
        unique: true,
        type: String
    },
    focus:{
        required: true,
        type: String
    },
    users:[{ 
        type: String, 
        ref: 'User'
    }]
});

export default mongoose.model('Skill',skill)