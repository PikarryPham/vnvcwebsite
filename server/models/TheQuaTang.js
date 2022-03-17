// Mongoose schema and model definitions
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Create the schema for the DATH database
const theQuaTangSchema = new Schema({
    _id:Schema.Types.ObjectId,
    MaSeriTheQuaTang: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    HinhAnhMinhHoa: {
        type: String,
        required: true
    },
    GiaTien: {
        type: Number,
        required: true
    }
});

// Create a model for the schema
const TheQuaTang = mongoose.model("TheQuaTang", theQuaTangSchema);
module.exports = TheQuaTang;