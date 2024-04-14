const express = require('express');
const router = express.Router();
const { contact, getAllContact, changeAnswerStatus ,singleContact} = require('../controlar/UserContact');
const {checkAdmin}=require("../midleware/admin") ;
router.post('/contact', contact);
router.get('/all-contact-request', getAllContact);
router.get('/single-contact/:id',checkAdmin,singleContact)
router.put('/answare-contact/:id', checkAdmin,changeAnswerStatus);

module.exports = router;
