const mongoose = require("mongoose");

const CartModle = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        require: true
    },
    email: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    quantity: {
        type: Number,
        require: true
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Cart', CartModle)