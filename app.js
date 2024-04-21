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

const mongoose = require('mongoose');
const uri = 'mongodb+srv://arefintalukder5:SVDosbFQtNNsTd4J@cluster0.nlbvlxa.mongodb.net/';

mongoose.connect(uri)
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('MongoDB connection error:', error)); // More robust error handling

const db = mongoose.connection;
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
   console.log("every thing ok");
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
app.use('/api',require("./route/topRoute"));
app.use("/api/",require("./route/workRoute"));
app.use("/api/",require("./route/featcherRoute"));
app.use("/api/",require("./route/productivity"));
app.use("/api/",require("./route/reveiwRoute"));

const imageSchema = new mongoose.Schema({
  url: String,
  public_id: String,
});





// Define a route to get an image by public_id


app.use(express.json());
app.use(express.urlencoded({ extended: true }));




const { resolve } = require('path');
// Replace if using a different env file or config
const env = require('dotenv').config({ path: './.env' });
const calculateTax = false;

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
  appInfo: { // For sample support and debugging, not required for production:
    name: "stripe-samples/accept-a-payment/payment-element",
    version: "0.0.2",
    url: "https://github.com/stripe-samples"
  }
});

app.use(express.static(process.env.STATIC_DIR));
app.use(
  express.json({
    // We need the raw body to verify webhook signatures.
    // Let's compute it only when hitting the Stripe webhook endpoint.
    verify: function (req, res, buf) {
      if (req.originalUrl.startsWith('/webhook')) {
        req.rawBody = buf.toString();
      }
    },
  })
);

// app.get('/', (req, res) => {
//   const path = resolve(process.env.STATIC_DIR + '/index.html');
//   res.sendFile(path);
// });

app.get('/config', (req, res) => {
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});

const calculate_tax = async (orderAmount, currency) => {
  const taxCalculation = await stripe.tax.calculations.create({
    currency,
    customer_details: {
      address: {
        line1: "10709 Cleary Blvd",
        city: "Plantation",
        state: "FL",
        postal_code: "33322",
        country: "US",
      },
      address_source: "shipping",
    },
    line_items: [
      {
        amount: orderAmount,
        reference: "ProductRef",
        tax_behavior: "exclusive",
        tax_code: "txcd_30011000"
      }
    ],
  });

  return taxCalculation;
};

app.get('/create-payment-intent', async (req, res) => {
  // Create a PaymentIntent with the amount, currency, and a payment method type.
  //
  // See the documentation [0] for the full list of supported parameters.
  //
  // [0] https://stripe.com/docs/api/payment_intents/create
  let orderAmount = 1400;
  let paymentIntent;

  try {
    if (calculateTax) {
      let taxCalculation = await calculate_tax(orderAmount, "usd")

      paymentIntent = await stripe.paymentIntents.create({
        currency: 'usd',
        amount: taxCalculation.amount_total,
        automatic_payment_methods: { enabled: true },
        metadata: { tax_calculation: taxCalculation.id }
      });
    }
    else {
      paymentIntent = await stripe.paymentIntents.create({
        currency: 'usd',
        amount: orderAmount,
        automatic_payment_methods: { enabled: true }
      });
    }

    // Send publishable key and PaymentIntent details to client
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (e) {
    return res.status(400).send({
      error: {
        message: e.message,
      },
    });
  }
});

// Expose a endpoint as a webhook handler for asynchronous events.
// Configure your webhook in the stripe developer dashboard
// https://dashboard.stripe.com/test/webhooks
app.post('/webhook', async (req, res) => {
  let data, eventType;

  // Check if webhook signing is configured.
  if (process.env.STRIPE_WEBHOOK_SECRET) {
    // Retrieve the event by verifying the signature using the raw body and secret.
    let event;
    let signature = req.headers['stripe-signature'];
    try {
      event = stripe.webhooks.constructEvent(
        req.rawBody,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`);
      return res.sendStatus(400);
    }
    data = event.data;
    eventType = event.type;
  } else {
    // Webhook signing is recommended, but if the secret is not configured in `config.js`,
    // we can retrieve the event data directly from the request body.
    data = req.body.data;
    eventType = req.body.type;
  }

  if (eventType === 'payment_intent.succeeded') {
    // Funds have been captured
    // Fulfill any orders, e-mail receipts, etc
    // To cancel the payment after capture you will need to issue a Refund (https://stripe.com/docs/api/refunds)
    console.log('💰 Payment captured!');
  } else if (eventType === 'payment_intent.payment_failed') {
    console.log('❌ Payment failed.');
  }
  res.sendStatus(200);
});






app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


