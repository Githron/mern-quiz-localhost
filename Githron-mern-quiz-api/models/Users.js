const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    score: {
        type: String,
    },

    totalquiz: {
        type: String,
    }
});

const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;
