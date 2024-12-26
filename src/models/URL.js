const mongoose = require('mongoose');

const URLSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    longUrl: { type: String, required: true },
    shortCode: { type: String, required: true, unique: true },
    topic: { type: String },
    createdAt: { type: Date, default: Date.now },
    clicks: [{
        timestamp: { type: Date, default: Date.now },
        ipAddress: String,
        userAgent: String,
        osType: String,
        deviceType: String
    }]
});

module.exports = mongoose.model('URL', URLSchema);


