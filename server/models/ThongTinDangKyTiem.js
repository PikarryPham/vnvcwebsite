// Mongoose schema and model definitions
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Create the schema for the DATH database
const ThongTinDangKyTiemSchema = new Schema({
   // _id:Schema.Types.ObjectId,

    MaDatMua: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    /*
    SoNguoiDangKy:{
        type: Number,
        required:true
    },
    TongSoTienCanThanhToan:{
        type:Number,
        required:true
    },*/

    HoTenNguoiMua: {
        type: String,
        required: true,
        unique: false,
        trim: true
    },
    SDTNguoiMua:{
        type: String,
        required: true,
        trim: true,
        maxlength: [
            13,
            "A phone number must have less or equal then 13 numeric characters",
        ],
        minlength: [9, "A phone number must have more or equal then 9 numeric characters"]
    },
    EmailNguoiMua:{
        type:String,
        required:true
    },
    CMND_CCCD_NguoiMua: {
        type: String,
        required: true,
        minlength:9
    },
    SoNha_NguoiMua:{
        type:String,
        required:true
    },
    Tinh_Thanh_NguoiMua:{
        type:String,
        required:true
    },
    Quan_Huyen_NguoiMua:{
        type:String,
        required:true
    },
    Phuong_Xa_NguoiMua:{
        type:String,
        required:true
    },
    PhuongThucThanhToan:{
        type:String,
        required:true
    },
    /*MatKhauDangNhap:{
        type:String,
        required:true
    },
    */
    TinhTrangThanhToan:{
        type:String,
        required:true,
        default: "Chưa thanh toán"
    },
    ThoiHanCanThanhToan:{
        type:String,
        required:true,
        default: () => Date.now() + 7*24*60*60*1000
    }
});

// Create a model for the schema
const ThongTinDangKyTiem = mongoose.model("ThongTinDangKyTiem", ThongTinDangKyTiemSchema);
module.exports = ThongTinDangKyTiem;