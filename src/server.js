//const express = require('express')
import express from "express";
import configViewEinggine from "./configs/viewEngine";
import initWebRoute from "./route/web";
import cookieParser from 'cookie-parser';
//import connection from './configs/connectDB';

require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;

// data form

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// cookie
app.use(cookieParser());

// set up viewengine
configViewEinggine(app);


initWebRoute(app);




// app.get('/', (req, res) => {
//     return res.render('index.ejs')
// })

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
})
