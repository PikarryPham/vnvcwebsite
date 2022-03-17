// Mongoose schema and model definitions
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Create the schema for the DATH database
const danhmucSchema = new Schema({
    _id:Schema.Types.ObjectId,
    MaDanhMuc: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    TenDanhMuc: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    DanhMucCha: {
        type: Schema.Types.ObjectId, 
        ref: 'DanhMuc',
        required: false
    }
});

// Create a model for the schema
const DanhMuc = mongoose.model("DanhMuc", danhmucSchema);
module.exports = DanhMuc;