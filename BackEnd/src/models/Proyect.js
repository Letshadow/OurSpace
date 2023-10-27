import mongoose from "mongoose";
const { Schema } = mongoose;
const proyect = new mongoose.Schema({
    title:{
        required: true,
        unique: true,
        type: String
    },
    description:{
        required: true,
        type: String
    },
    URLHTML:{
        required: true,
        type: String
    },
    URLJS:{
        required: true,
        type: String
    },

    // topic:[{ 
    //     type: String, 
    //     ref: 'Skill'
    // }],
    topic:{        
        type: String,
    },
    user:{ 
        type: String, 
        ref: 'User'
    }
});

export default mongoose.model('Proyect',proyect)