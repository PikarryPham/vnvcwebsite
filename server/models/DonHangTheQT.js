// Mongoose schema and model definitions
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Create the schema for the DATH database
const donHangTheQTSchema = new Schema({
    _id:Schema.Types.ObjectId,
    MaDonHang: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    HoTenNguoiMua: {
        type: String,
        required: true,
    },
    Email_NguoiMua: {
        type: String,
        required: true,
    },
    SDT_NguoiMua: {
        type: String,
        required: true,
        trim: true
    },
    CMND_CCCD_NguoiMua: {
        type: String,
        required: true,
        trim: true
    },
    GhiChu: {
        type: String,
        required: false
    },
    TongTien: {
        type: Number,
        default: 0
    },
    SoLuongTheMua: {
        type: Number,
        default: 0
    },
    HoTenNguoiNhan: {
        type: String,
        required: true
    },
    Email_NguoiNhan: {
        type: String, 
        required: true
    },
    SDT_NguoiNhan: {
        type: String,
        required: true,
        trim: true
    },
    CMND_CCCD_NguoiNhan: {
        type: String,
        required: true,
        trim: true
    },
    PhuongThucGiaoHang: {
        type: String,
        required: true
    },
    ChiTietDonHang: [
        HinhAnhMinhHoa: {
        type: String,
        required: true
        },
        GiaTien: {
            type: Number,
            required: true
        },
        TrangThaiKichHoat: {
            type: String,
            required: true
        },
        SoLuong: {
            type: Number,
            required: true
        }
    ]
    ,
    DiaChiNhanTheQT: {
        [ DiaChiNhanTheQT ]
    },
    TrungTamVNVC: {
        type: Schema.Types.ObjectId, 
        ref: 'TrungTam'
    }
});

// Create a model for the schema
const DonHangTheQT = mongoose.model("DonHangTheQT", donHangTheQTSchema);
module.exports = DonHangTheQT;
