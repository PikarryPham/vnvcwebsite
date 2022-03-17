const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Create the schema for the DATH database
const trungtamVNVCSchema = new Schema({
    _id: Schema.Types.ObjectId,
    MaTrungTamVNVC: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    TenTrungTam: {
        type: String,
        required: true,
        unique: true
    },
    DiaChi:{
        type:String,
        required: true
    },
    SDT:{
        type: String,
        required: true,
        trim: true,
        maxlength: [
            12,
            "A phone number must have less or equal then 12 numeric characters",
        ],
        minlength: [9, "A phone number must have more or equal then 9 numeric characters"]
    }
});


// Create a model for the schema
const TrungTam = mongoose.model("TrungTam", trungtamVNVCSchema);
module.exports = TrungTam;