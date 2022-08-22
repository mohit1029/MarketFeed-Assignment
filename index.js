// import express from "express";
// import {projectrouter} from './routes/projectroutes';

//import { getData } from "./controllers/controller";

const express = require('express');
const projectrouter = require('./routes/projectroutes');
const controller = require('./controllers/controller');

const port = 5000;
const app = express();

app.use('/',projectrouter);


app.listen(process.env.PORT || port,'0.0.0.0');
