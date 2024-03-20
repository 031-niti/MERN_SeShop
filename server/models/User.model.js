const mongoose = require("mongoose");

const UserModle = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        unique: true
    },
    photoURL: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
    },
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('User', UserModle)