/*************************************
 *              IMPORTS
 *************************************/
const express = require('express');
const config = require('../../config');
const Freshdesk = require('freshdesk-api');
const env = require('dotEnv').config();
/*************************************
 *              INIT
 *************************************/
const router = express.Router();
const freshdesk = new Freshdesk(config.freshDeskURL, config.freshdeskAPIKey);

/*************************************
 *              GET
 *************************************/
// Lista todos os contatos
router.get('/', (req, res, next) => {
    freshdesk.listAllContacts({
        //email: 'norman.jones@freshdesk.com'
    }, function (err, data, extra) {
        console.log(err || data);
        if (err) {
            res.status(500).json({
                message: 'Ocorreu um erro ao tentar recuperar os contatos'
            });
        } else {
            res.status(200).json({
                message: 'Contato recuperado',
                //id: data[0]['id']
                id: data
            });
        }
    });
});

router.get('/:contactId', (req, res, next) => {
    var contactId = req.params.contactId
    freshdesk.getContact(contactId, function (err, data, extra) {
        console.log(err || data);
        if (err) {
            res.status(500).json({
                message: 'Ocorreu um erro ao tentar recuperar o contato!'
            });
        } else {
            res.status(200).json({
                message: 'Contato recuperado',
                //id: data[0]['id']
                id: data
            });
        }
    });
});

/*************************************
 *              POST
 *************************************/
/*************************************
 *              PATCH
 *************************************/
// Precisa implementar!
router.patch('/:contactId', (req, res, next) => {
    var contactId = req.params.contactId
    freshdesk.getContact(contactId, function (err, data, extra) {
        console.log(err || data);
        if (err) {
            res.status(500).json({
                message: 'Ocorreu um erro ao tentar recuperar o contato!'
            });
        } else {
            res.status(200).json({
                message: 'Contato recuperado',
                //id: data[0]['id']
                id: data
            });
        }
    });
});
/*************************************
 *              DELETE
 *************************************/

module.exports = router;