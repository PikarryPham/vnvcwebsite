// Mongoose schema and model definitions
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Create the schema for the DATH database
const diaChiNhanTheQTSchema = new Schema({
    _id:Schema.Types.ObjectId,
    MaDiaChiNhanThe: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    SoNha_TenDuong: {
        type: String,
        required: true
    },
    Phuong: {
        type: String,
        required: true
    },
    Quan: {
        type: String,
        required: true
    },
    ThanhPho_Tinh: {
        type: String,
        required: true
    },
    SDT_KichHoat: {
        type: String,
        required: true,
        trim: true
    }
});

// Create a model for the schema
const DiaChiNhanTheQT = mongoose.model("DiaChiNhanTheQT", diaChiNhanTheQTSchema);
module.exports = DiaChiNhanTheQT;