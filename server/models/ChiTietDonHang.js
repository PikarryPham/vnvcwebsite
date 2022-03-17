// Mongoose schema and model definitions
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Create the schema for the DATH database
const chiTietDonHangSchema = new Schema({
    _id:Schema.Types.ObjectId,
    MaSeriTheQuaTang: {
        type: Schema.Types.ObjectId, 
        ref: 'TheQuaTang',
        required: true,
        unique: true
    },
    TrangThaiKichHoat: {
        type: String,
        required: true
    },
    SoLuong: {
        type: Number,
        required: true
    }
});

// Create a model for the schema
const ChiTietDonHang = mongoose.model("ChiTietDonHang", chiTietDonHangSchema);
module.exports = ChiTietDonHang;