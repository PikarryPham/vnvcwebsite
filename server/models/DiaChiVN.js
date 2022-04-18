const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Create the schema for the DATH database
const diaChiVNSchema = new Schema({
    Tinh_Thanh: {
        type: String,
        required: true,
        unique: true
    },
    Quan_Huyen: {
        type:String,
        required: true
    },
    Phuong_Xa:{
        type:String,
        required: true
    }
});

// Create a model for the schema
const DiaChiVN = mongoose.model("DiaChiVN", diaChiVNSchema);
module.exports = DiaChiVN;