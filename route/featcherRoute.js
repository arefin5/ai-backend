

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
}  = require("../controlar/featcher");

// 
// router.put('/publised-single-blog/:id', requireAuth, checkAdmin, singleBlogconvert);
// 
// top
router.post("/create-featcher-top",  CreateWorkTop);
router.post("/create-featcher-card",  CreateWorkCard);

router.get("/get-featcher-top",getWorkTop);
router.get("/get-featcher-card",getWorkCard);

router.put('/update-featcher-top/:id',upDateWorkTop);
router.put('/update-featcher-card/:id',upDateWorkCard);

// end-Top
// public route :

module.exports = router;