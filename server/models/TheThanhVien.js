// Mongoose schema and model definitions
/**
 * Gộp thông tin của bảng Hạng Mục Thẻ và Quyền lợi vào trong Schema TheThanhVien
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Create the schema for the DATH database
const theThanhVienSchema = new Schema({
    _id:Schema.Types.ObjectId,
    MaTheThanhVien: {
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
        type: String,
        required: true,
        trim: true,
        maxlength: [
            13,
            "A phone number must have less or equal then 13 numeric characters",
        ],
        minlength: [9, "A phone number must have more or equal then 9 numeric characters"]
    }

    DiemTichLuyToiThieu:{
        type:Number,
        required:true
    },
    DiemTuongLuyToiThieu:{
        type:Number,
        required:true
    },

    //QuyenLoi: [{ TenQuyenLoi: String, MoTaChiTiet: String}]
    HangMucThe:{
        type: Schema.Types.ObjectId,
        ref:'HangMucThe',
        required:false
    }
});

// Create a model for the schema
const TheThanhVien = mongoose.model("TheThanhVien", theThanhVienSchema);
module.exports = TheThanhVien;
