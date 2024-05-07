

const { requireAuth } = require("../midleware/auth")
const { checkAdmin } = require("../midleware/admin");
const express = require("express")
const router = express.Router();
// controllers
const {
    CreateanswareTop,
    CreateanswareCard,
    getanswareTop,
    getanswareCard,
    upDateanswareTop,
    upDateanswareCard
}  = require("../controlar/answareControlar");

// 
// router.put('/publised-single-blog/:id', requireAuth, checkAdmin, singleBlogconvert);
// 
// top
router.post("/create-answare-top",  CreateanswareTop);
router.post("/create-answare-card", CreateanswareCard );

router.get("/get-answare-top",getanswareTop);
router.get("/get-answare-card",getanswareCard);

router.put('/update-answare-top/:id',upDateanswareTop);
router.put('/update-answare-card/:id',upDateanswareCard);

// end-Top
// public route :

module.exports = router;