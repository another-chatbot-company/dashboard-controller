
/*************************************
 *              IMPORTS
 *************************************/
const express = require('express'); //Facilita fazer o controller
const Freshdesk = require('freshdesk-api');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const config = require('./config');
const mongoose = require('mongoose');
const env = require('dotEnv').config();
/*************************************
 *              INIT
 *************************************/
const routesRootDir = './api/routes/'
const app = express();
const freshdesk = new Freshdesk(config.freshDeskURL, config.freshdeskAPIKey);
mongoose.connect(config.mongoDBURL);

/*************************************
 *              ROTAS
 *************************************/
const contactsRoutes = require(routesRootDir + 'contacts.js');
const ticketsRoutes = require(routesRootDir + 'tickets.js');
const databaseRoutes = require(routesRootDir + 'database.js');

/*************************************
 *           UTILIDADES
 *************************************/
// Para log no terminal
app.use(morgan('dev'));
// Para formatar o conteudo do "body" para ser transmitido pela Internet
app.use(bodyParser.urlencoded({ extended: false }));
// Definindo qual o Content-Type esperado
app.use(bodyParser.json());

app.use('/tickets', ticketsRoutes);
app.use('/contacts', contactsRoutes);
app.use('/database', databaseRoutes);

// Definindo headers para problemas de CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        req.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

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