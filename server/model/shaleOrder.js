const mongoose = require("mongoose");

const newUserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: String,
        required: true
    },
    Price: {
        type: String,
        required: true
    },
    work: {
        type: String,
        required: true
    },
    add: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'active', // 'active' or 'complete'
        required: true
      },
}, {
    timestamps: true // This will add createdAt and updatedAt fields
});

const orders = mongoose.model("orders", newUserSchema);

module.exports = orders;
