

const { requireAuth } = require("../midleware/auth")
const { checkAdmin } = require("../midleware/admin");
const express = require("express")
const router = express.Router();
// controllers
const {
    CreateWorkTop,
    CreateWorkCard,
    getWorkTop,
    getWorkCard,
    upDateWorkTop,
    upDateWorkCard
}  = require("../controlar/workControlar");

// 
// router.put('/publised-single-blog/:id', requireAuth, checkAdmin, singleBlogconvert);
// 
// top
router.post("/create-work-top",  CreateWorkTop);
router.post("/create-work-card",  CreateWorkCard);

router.get("/get-work-top",getWorkTop);
router.get("/get-work-card",getWorkCard);

router.put('/update-work-top/:id',upDateWorkTop);
router.put('/update-work-card/:id',upDateWorkCard);

// end-Top
// public route :

module.exports = router;