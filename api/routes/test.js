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
    console.log("Entrou no /test via POST");
    let ticket = req.body.ticket;
    let requester = ticket.requester;
    let company = ticket.company;

    console.log('Logando TICKET');
    console.log(ticket);
    // Gravando no Atlas
    const ticketEntity = new Ticket({
        _id: new mongoose.Types.ObjectId(),
        freshdesk_code: ticket.id,
        creation_date: new Date(),
        priority: ticket.priority,
        status: ticket.status,
        rating: null,
        user: {
            name: requester.name,
            email: requester.from_email
        },
        company: {
            name: company.name
        },
        channel: ticket.source
    });

    ticketEntity
        .save()
        .then(result => {
            console.log('POST no /test retornou com sucesso!');
            console.log(result);
            res.status(201).json(result);
        })
        .catch(err => {
            console.log('POST no /test retornou com erro!');
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