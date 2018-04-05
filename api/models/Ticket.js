const mongoose = require('mongoose');

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
        type: Number,
        ref: 'User',
        required: true
    },
    agent: {
        type: String,
        //voltar o required
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
         //voltar o required
    },
    channel: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Ticket', ticketSchema);