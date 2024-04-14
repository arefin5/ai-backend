// route/subscriberRoute.js
const express = require("express");

const { checkAdmin } = require("../midleware/admin");
const { requireAuth } = require("../midleware/auth");
const router = express.Router();

// controllers
const { subscriber, Allsubscriber } = require("../controlar/subscriber");

router.post("/subscriber",  subscriber);
router.get('/subscriber', requireAuth, checkAdmin, Allsubscriber);

module.exports = router;
