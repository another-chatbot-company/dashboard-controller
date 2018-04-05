const mongoose = require('mongoose');

const companySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    isChatbotEnabled: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('Company', companySchema);