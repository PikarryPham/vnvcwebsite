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
    QuyenLoi: [{ TenQuyenLoi: String, MoTaChiTiet: String}]
});

// Create a model for the schema
const TheThanhVien = mongoose.model("TheThanhVien", theThanhVienSchema);
module.exports = TheThanhVien;
