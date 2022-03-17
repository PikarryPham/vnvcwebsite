// Mongoose schema and model definitions
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Create the schema for the DATH database
const KhachHangSchema = new Schema({
    _id:Schema.Types.ObjectId,
    MaKhachHang_VNVC: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    HoTen: {
        type: String,
        required: true,
        unique: false,
        trim: true
    },
    NgayThangNamSinh: {
        type: Date,
        required: true
    },
    GioiTinh:{
        type: String,
        required:true
    },
    Email:{
        type:String
    },
    SoNha:{
        type:String,
        required:true
    },
    Tinh_Thanh:{
        type:String,
        required:true
    },
    Quan_Huyen:{
        type:String,
        required:true
    },
    Phuong_Xa:{
        type:String,
        required:true
    },
    SDT:{
        type:String,
        required:true,
        minlength:10
    },
    TheThanhVien:{
        type: String,
        ref:'TheThanhVien',
        required:false
    }
});

// Create a model for the schema
const KhachHang = mongoose.model("KhachHang", KhachHangSchema);
module.exports = KhachHang;