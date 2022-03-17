/**
 * Everything in Mongoose starts with a Schema. Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.
 */
// Mongoose schema and model definitions
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Create the schema for the DATH database
const vaccinesSchema = new Schema({
    _id: Schema.Types.ObjectId,
    MaVacXin :{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    LoaiVacXin: {
        type: String,
        required: true,
        enum: ["GoiVaccine","Vaccine"],
        default: "Vaccine",
    },
    Ten: {
        type: String,
        required: true,
        unique: true,
        uppercase: true,
        trim: true,
        minlength: [10, "Vaccine's name needs to be at least 10 characters"]
    },
    Gia:{
        type: Number,
        default: 0,
        required:true
    },
    PhongBenh: {
        type: String, 
        required: true
    },
    ThongTinVeVacXin: {
        type: String, 
        required: true
    },
    LichTiemPhong: {
        type: String, 
        required: false
    },
    NguonGoc: {
        type: String, 
        required: false
    },
    DuongTiem: {
        type: String, 
        required: false
    },
    ChongChiDinh: {
        type: String, 
        required: false
    },
    ThanTrongKhiSuDung: {
        type: String, 
        required: false
    },
    PhanUngKhongMongMuon: {
        type: String, 
        required: false
    },
    BaoQuan: {
        type: String, 
        required: false
    },
    HinhAnhMinhHoa: {
        type: String,
        required: false
    },
    TongSoLieu:{
        type: Number,
        required: true,
        default: 0
    },
    LoaiDanhMuc: {
        type: Schema.Types.ObjectId, 
        ref: 'DanhMuc',
        required: false
    },
    DanhSachMuiTiem: [{ TenVaccineDon: String, NuocSanXuat: String, PhongBenh: String, SoMuiTiem: Number}]
});
// Create a model for the schema
const Vaccines = mongoose.model("Vaccines", vaccinesSchema);
module.exports = Vaccines;