

const { requireAuth } = require("../midleware/auth")
const { checkAdmin } = require("../midleware/admin");
const express = require("express")
const router = express.Router();
// controllers
const {CreateTop ,upDateTop,getTop } = require("../controlar/topControlar");

// 
// router.put('/publised-single-blog/:id', requireAuth, checkAdmin, singleBlogconvert);
// 
// top
router.post("/create-Top",  CreateTop);
router.get("/get-top",getTop);
router.put('/update-top/:id',upDateTop);
// end-Top
// public route :

module.exports = router;