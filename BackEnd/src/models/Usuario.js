import mongoose from "mongoose";
const { Schema } = mongoose;
const user = new mongoose.Schema({
    name:{
        required: true,
        unique: true,
        type: String
    },
    pass:{
        required: true,
        type: String
    },
    contacts:[{ 
        type: String, 
        ref: 'User'
    }],
    proyects:[{ 
        type: String, 
        ref: 'Proyect'
    }],
    skills:[{ 
        type: String, 
        ref: 'Skill'
    }]
});

export default mongoose.model('User',user)