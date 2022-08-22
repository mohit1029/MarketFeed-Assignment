const express = require('express');
const controller = require('../controllers/controller');

const projectrouter = express.Router();

projectrouter.use((req,res,next) =>{
    console.log("IP address : " + req.ip);
    next();
});


projectrouter.get('/:n/:m',controller.getData);

module.exports = projectrouter;