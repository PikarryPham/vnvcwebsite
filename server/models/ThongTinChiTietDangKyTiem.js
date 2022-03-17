// Mongoose schema and model definitions
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Create the schema for the DATH database
const ThongTinChiTietDangKyTiemSchema = new Schema({
    MaDatMua:{
        type:String,
        ref:'ThongTinDangKyTiem',
        required:true
    },
    NguoiTiem:[{
        TrungTamVNVC:{
            Ten:{typre:String,required:true}
        },
        KhachHang:{
            MaKhachHang_VNVC:{type:String, ref:'KhachHang',required:true},
            TenKhachHang:{type:String,required:true}
        },
        NgayMongMuonTiem: {
            type: Date,
            required: true
        },
        vaccine:{
            vaccine: {
                MaVaccine:{type:String},
                Tenvaccine:{type:String},
                GiaVaccine:{type:Number},
            },
            GoiVaccine:{
                MaGoiVaccine:{type:String},
                TenGoiVaccine:{type:String},
                GiaGoi:{type:Number},
            }
        },
    }]
});

// Create a model for the schema
const ThongTinChiTietDangKyTiem = mongoose.model("ThongTinChiTietDangKyTiem", ThongTinChiTietDangKyTiemSchema);
module.exports = ThongTinChiTietDangKyTiem;