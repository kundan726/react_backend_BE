const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({
    email : {
        type : String,
        required: true,
        unique: true
    },
    mobile : {
        type : String,
        required: false
    },
    username : {
        type: String,
        required: true,
        unique: false
    },
    password : {
        type : String,
        required: true
    },
    role : {
        type : String,
        required: true
    }
},{
    timestamps: true
}
);

const loginModel = mongoose.model('loginModel',loginSchema);
module.exports = loginModel;