const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Create the schema for the DATH database
const hangMucTheSchema = new Schema({
    _id:Schema.Types.ObjectId,
    MaHangMuc: {
        type: String,
        required: true,
        trim: true,
        unique: true

    },
    TenHangMucThe: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    DiemTichLuyToiThieu:{
        type:Number,
        required:true
    },
    DiemTuongLuyToiThieu:{
        type:Numberok,
        required:true
    },
    
    QuyenLoi: [{ TenQuyenLoi: String, MoTaChiTiet: String}]
});

// Create a model for the schema
const HangMucThe = mongoose.model("HangMucThe", hangMucTheSchema);
module.exports = HangMucThe;
