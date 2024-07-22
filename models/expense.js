const mongoose = require("mongoose");

const data = new mongoose.Schema({
    amount: Number,
    remark: String,
    category: String,
    paymentmode: {
        type: String,
        enum: ["cash","upi","cheque"]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }
});

module.exports = mongoose.model("expense",data)