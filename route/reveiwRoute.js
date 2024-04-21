

const { requireAuth } = require("../midleware/auth")
const { checkAdmin } = require("../midleware/admin");
const express = require("express")
const router = express.Router();
// controllers
const {
    CreatereveiwTop,
    CreatereveiwCard,
    getreveiwTop,
    getreveiwCard,
    upDatereveiwTop,
    upDatereveiwCard
}  = require("../controlar/reveiwControlar");

// 
// router.put('/publised-single-blog/:id', requireAuth, checkAdmin, singleBlogconvert);
// 
// top
router.post("/create-reveiw-top",  CreatereveiwTop);
router.post("/create-reveiw-card",  CreatereveiwCard);

router.get("/get-reveiw-top",getreveiwTop);
router.get("/get-reveiw-card",getreveiwCard);

router.put('/update-reveiw-top/:id',upDatereveiwTop);
router.put('/update-reveiw-card/:id',upDatereveiwCard);

// end-Top
// public route :

module.exports = router;