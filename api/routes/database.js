/*************************************
 *              IMPORTS
 *************************************/
const express = require('express');
const Freshdesk = require('freshdesk-api');
const config = require('../../config');
const env = require('dotEnv').config();
const mongoose = require('mongoose');
//Entidades
const Ticket = require('../models/Ticket');
const User = require('../models/User');
const Company = require('../models/Company');
/*************************************
 *              INIT
 *************************************/
const router = express.Router();

// ENDPOINT para gravação do ticket
router.post('/', (req, res, next) => {
    console.log("Entrou no post");
    // Gravando no Atlas
    const ticket = new Ticket({
        _id: new mongoose.Types.ObjectId(),
        freshdeskCode: req.params.ticketId,
        description: req.body.description_text,
        createdAt: req.body.created_at,
        severity: req.body.priority,
        status: req.body.status,
        rating: -1,
        user: req.body.requester_id,
        agent: req.body.responder_id,
        company: req.body.company_id,
        channel: req.body.source
    });

    ticket
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });

});

router.get('/', (req, res, next) => {
    console.log("Entrou no get");
    
    Ticket.find().exec().then(docs => {
        console.log(docs);
        res.status(200).json(docs);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/:ticketId', (req, res, next) => {
    let ticketId = req.params.ticketId;
    console.log("Entrou no get");
    
    Ticket.findById(ticketId).exec().then(docs => {
        console.log(docs);
        res.status(200).json(docs);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;