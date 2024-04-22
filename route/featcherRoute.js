

const { requireAuth } = require("../midleware/auth")
const { checkAdmin } = require("../midleware/admin");
const express = require("express")
const router = express.Router();
// controllers
const {
    CreatefeatcherTop,
    CreatefeatcherCard,
    getfeatcherTop,
    getfeatcherCard,
    upDatefeatcherTop,
    upDatefeatcherCard
}  = require("../controlar/featcherControlar");

// 
// router.put('/publised-single-blog/:id', requireAuth, checkAdmin, singleBlogconvert);
// 
// top
router.post("/create-featcher-top",  CreatefeatcherTop);
router.post("/create-featcher-card",  CreatefeatcherCard);

router.get("/get-featcher-top",getfeatcherTop);
router.get("/get-featcher-card",getfeatcherCard);

router.put('/update-featcher-top/:id',upDatefeatcherTop);
router.put('/update-featcher-card/:id',upDatefeatcherCard);

// end-Top
// public route :

module.exports = router;