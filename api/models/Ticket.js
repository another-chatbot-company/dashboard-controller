const mongoose = require('mongoose');

const companySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    isChatbotEnabled: {
        type: Boolean,
        required: true
    }
});

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true
    }
});

const ticketSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    freshdeskCode: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    },
    severity: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        min: -1,
        max: 5
    },
    user: {
        type: userSchema,
        required: true
    },
    agent: {
        type: String,
        required: true
    },
    company: {
        type: companySchema,
        required: true
    },
    channel: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Ticket', ticketSchema);