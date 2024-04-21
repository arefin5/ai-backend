

const { requireAuth } = require("../midleware/auth")
const { checkAdmin } = require("../midleware/admin");
const express = require("express")
const router = express.Router();
// controllers
const {
    CreateProductivity,
    getProductivity,
    upDateProductivity
}  = require("../controlar/productivityControlar");

// 
// router.put('/publised-single-blog/:id', requireAuth, checkAdmin, singleBlogconvert);
// 
// top
router.post("/create-productivity",  CreateProductivity);
// router.post("/create-featcher-card",  CreatefeatcherCard);

router.get("/get-productivity",getProductivity);
// router.get("/get-featcher-card",getfeatcherCard);

router.put('/update-productivity/:id',upDateProductivity);
// router.put('/update-featcher-card/:id',upDatefeatcherCard);

// end-Top
// public route :

module.exports = router;