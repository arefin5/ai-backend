const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const shortid = require('shortid');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require("dotenv").config();
var Fingerprint = require("express-fingerprint");
// const GridFsStorage=require("multer-grids-storage")
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://arefintalukder5:SVDosbFQtNNsTd4J@cluster0.nlbvlxa.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});
const app = express();
const port = 4000;
app.use(
  Fingerprint({
    parameters: [
      // Defaults
      Fingerprint.useragent,
      Fingerprint.acceptHeaders,
      Fingerprint.geoip,
    ],
  })
);
const corsOptions = {
  origin: "*",
};
app.use(cors(corsOptions));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

// Endpoint to get device fingerprint
app.get("/fingerprint", (req, res) => {
  const fingerprint = req.fingerprint;
  const clientIp = req.clientIp;
  res.json({ fingerprint, clientIp });
});


app.use(cors(corsOptions));

app.get('/',async(req,res)=>{
  // console.log("every thing ok");
  res.json({
    "serverName":"study app",
  "deveolper Name":"Arefin Talukder",
"developerEmail":"arefintalukder5@gmail.com"  })
})



// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const helmet = require('helmet');
app.use(helmet());

app.use('/api/', require('./route/userContactRoute'));
app.use('/api',require("./route/subscriber"))
app.use('/api',require("./route/blogRoute"));
app.use('/api',require("./route/data.js"));
app.use("/api",require("./route/questionRoute.js"))
app.use('/api',require("./route/userRoute"));

const imageSchema = new mongoose.Schema({
  url: String,
  public_id: String,
});





// Define a route to get an image by public_id


app.use(express.json());
app.use(express.urlencoded({ extended: true }));





// Example usage:

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


