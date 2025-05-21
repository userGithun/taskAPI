const mongoose = require('mongoose')

const phoneSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    image: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
    },
    condition: {
        type: String,
        require: true
    },
    storage: {
        type: String,
        required: true
    },
    color: {
        type: String,
        require: true
    },
    price: {
        type: String,
        require: true
    }
}, { timestamps: true });

const phoneModel = mongoose.model("phone", phoneSchema);
module.exports = phoneModel;