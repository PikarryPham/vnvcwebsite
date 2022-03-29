// Mongoose schema and model definitions
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Create the schema for the DATH database
const ThongTinChiTietDangKyTiemSchema = new Schema({
    MaDatMua:{
        type:Schema.Types.ObjectId,
        //ref:'ThongTinDangKyTiem',
        required:true
    },
    NguoiTiem:[{
        TrungTamVNVC:{
            Ten:{typre:String,required:true}
        },
        KhachHang:{
            IDKhachHang:{type:Schema.Types.ObjectId, ref:'KhachHang',required:true},
            TenKhachHang:{type:String,required:true},
            MoiQuanHe:{type:String,required:true}
        },
        NgayMongMuonTiem: {
            type: Date,
            required: true
        },
        vaccine:{
            Vaccine: [{
                MaVaccine:{type:String},
                TenVaccine:{type:String},
                GiaVaccine:{type:Number}
            }],
            GoiVaccine:[{
                MaGoiVaccine:{type:String},
                TenGoiVaccine:{type:String},
                GiaGoi:{type:Number}
            }]
        },
    }]
});

// Create a model for the schema
const ThongTinChiTietDangKyTiem = mongoose.model("ThongTinChiTietDangKyTiem", ThongTinChiTietDangKyTiemSchema);
module.exports = ThongTinChiTietDangKyTiem;