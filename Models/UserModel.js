const mongoose = require('mongoose');

const instance = mongoose.Schema({
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    displayName:String,
    createdAt: {
      type: Date,
      default: Date.now()
    }
});
module.exports = mongoose.model("UserDb",instance)