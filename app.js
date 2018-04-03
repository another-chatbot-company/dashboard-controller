
/*************************************
 *              IMPORTS
 *************************************/
const express = require('express'); //Facilita fazer o controller
const Freshdesk = require('freshdesk-api');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const config = require('./config');

/*************************************
 *              INIT
 *************************************/
const routesRootDir = './api/routes/'
const app = express();
const freshdesk = new Freshdesk(stringConnection, apiKey);

/*************************************
 *              ROTAS
 *************************************/
const contactsRoutes = require(routesRootDir + 'contacts.js');
const ticketsRoutes = require(routesRootDir + 'tickets.js');

app.use('/tickets', ticketsRoutes);
app.use('/contacts', contactsRoutes);
/*************************************
 *           UTILIDADES
 *************************************/
// Para log no terminal
app.use(morgan('dev'));
// Para formatar o conteudo do "body" para ser transmitido pela Internet
app.use(bodyParser.urlencoded({ extended: false }));
// Definindo qual o Content-Type esperado
app.use(bodyParser.json());

/*************************************
 *       FUNCOES DE FALLBACK
 *************************************/
//Resposta do Server OK
app.use((req, res, next) => {
    res.status(200).json({
        message: 'Oba! Servidor funcionando, mas não existem recursos nesse diretório!'
    });
});

//Resposta do Server não encontrado
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

//Resposta do Server qualquer outro erro
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        erro: {
            message: error.message
        }
    })
});

module.exports = app;