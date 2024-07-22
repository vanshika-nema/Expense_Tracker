const mongoose = require("mongoose");
const plm = require("passport-local-mongoose")

const data = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    token: {
        type: Number,
        default: -1
    },
    expenses:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "expense"
    }]

})
data.plugin(plm)
module.exports = mongoose.model("user", data);