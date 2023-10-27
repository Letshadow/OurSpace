import mongoose from "mongoose";
const { Schema } = mongoose;
const topic = new mongoose.Schema({
    theme:{
        required: true,
        unique: true,
        type: String
    },
    area:{
        required: true,
        type: String
    },
    users:[{ 
        type: String, 
        ref: 'User'
    }]
});

export default mongoose.model('Topic',topic)