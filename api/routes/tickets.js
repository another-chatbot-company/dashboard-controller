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
const freshdesk = new Freshdesk(config.freshDeskURL, config.freshdeskAPIKey);
/*************************************
 *              GET
 *************************************/
//Lista todos os tickets
router.get('/', (req, res, next) => {
    freshdesk.listAllTickets({

    }, function (err, data, extra) {
        console.log(err || data)

        res.status(200).json({
            message: 'Listar todos tickets',
            body: data
        });
    });
});

//Lista apenas um ticket especifico por ID
router.get('/:ticketId', (req, res, next) => {
    var ticketId = req.params.ticketId
    freshdesk.getTicket(ticketId, function (err, data, extra) {
        console.log(err || data)

        res.status(200).json({
            message: 'Ticket recuperado',
            body: data
        });
    })

});
/*************************************
 *              POST
 *************************************/
//Criar um Ticket
router.post('/', (req, res, next) => {
    let ticket = {
        name: 'Mongoose ticket',
        email: 'anotherchatbotco@test.com',
        subject: 'Criando Ticket com o Node.JS',
        description: 'Ticket a ser gravado no Mongo Atlas!',
        status: 2,
        priority: 4
    };

    //Gravando no Freshdesk
    freshdesk.createTicket(ticket, function (err, data) {
        console.log(err || data)

        res.status(200).json({
            message: 'Ticket criado',
            id: data.id
        });
    });

});

router.post('/:ticketId', (req, res, next) => {
    id = req.params.ticketId;

    if (id === '1')
        res.status(200).json({
            message: 'Esse ticket prioritario',
            id: ticketId
        });
    else {
        res.status(200).json({
            message: 'Ticket normal',
            id: id
        });
    }
}
);

/*************************************
 *              PATCH
 *************************************/
//Alteração de Ticket
router.patch('/:ticketId', (req, res, next) => {
    const ticketId = req.params.ticketId
    freshdesk.updateTicket(ticketId, {
        description: 'Feita uma alterção fez outra alteração',
        status: 2,
        priority: 3
    }, function (err, data, extra) {
        console.log(err || data)
    })
    res.status(200).json({
        message: 'Ticket atualizado'
    });
});

/*************************************
 *              DELETE
 *************************************/
router.delete('/:ticketId', (req, res, next) => {
    const ticketId = req.params.ticketId

    reshdesk.deleteTicket(ticketId, function (err, data, extra) {
        console.log(err || data)

        res.status(200).json({
            message: 'Ticket deletado'

        });
    })

});

module.exports = router;