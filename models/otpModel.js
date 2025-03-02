const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    otp: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    emailMessageId: {
        type: String,
        required: false
    },
    isVerified: {
        type: Boolean,
        required: true
    },
    expiresAt: {
        type: Date,
        required: true
    },
    isExpired: {
        type: Boolean,
        required: false
    }
},{
    timestamps: true,
})

const otpModel = mongoose.model('otpModel',otpSchema);

module.exports = {otpModel}
