const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const transactionSchema = new Schema (

{
    name: {
        type : String,
        trim: true, 
        required: "Enter a name for a tranaction"
    },
    value:{
        type: Number,
        required : "Enter an Amount"
    },
    date: {
        type: Date,
        default : Date.now
    }
}
);

const transaction = mongoose.model("transaction", transactionSchema);

module.exports = transaction