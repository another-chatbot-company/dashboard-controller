const mongoose = require('mongoose');

const ticketSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    freshdesk_code: {
        type: String,
        required: true
    },
    creation_date: {
        type: Date,
        required: true
    },
    priority: {
        type: Number,
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
        name: {
            type: String
        },
        email: {
            type: String
        }
    },
    // agent: {
    //     id: {
    //         type: Number,
    //         required: true
    //     },
    //     name: {
    //         type: String
    //     },
    //     email: {
    //         type: String
    //     }
    // },
    company: {
        name: {
            type: String
        },
    },
    channel: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Ticket', ticketSchema);