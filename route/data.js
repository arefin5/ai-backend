
const mongoose = require('mongoose');



const express = require("express");
const { requireAuth } = require("../midleware/auth")

const { checkAdmin } = require("../midleware/admin");
const router = express.Router();

// controllers
const { contacpageCreate,
     contacpageData,
     createTeam,
     allTeam,
     deleteSingeteam,
     ReviewCreate, Review
     , createSeminar,
     allSeminer,
     deleteSingeSeminer,
     AddVideoPlaylist,
     getAllPlaylist,
     AllBrand,
     getAllBrand,
     deleteSingeBrandByID,
     
} = require("../controlar/data.js");

// router.post("/homepage",HomePageCarusel);
router.post("/contacpage", contacpageCreate)
router.get("/conctact-page", contacpageData);
router.post("/team-create", requireAuth, checkAdmin, createTeam);
router.get("/team-member", allTeam);
router.delete("/team-member-delete/:_id", requireAuth, checkAdmin, deleteSingeteam);
router.post("//create-review", requireAuth, ReviewCreate);
router.get("/review", Review);
// sesion create:
router.post("/seminar-create", requireAuth, checkAdmin, createSeminar);
router.get("/seminar", allSeminer);
router.delete("/seminar-delete/:_id", requireAuth, checkAdmin, deleteSingeSeminer);
// video add
router.post("/add-video", requireAuth, checkAdmin,AddVideoPlaylist);
router.get("/video-playlist",getAllPlaylist);
router.post("/brand",requireAuth, checkAdmin,AllBrand);
router.get("/all-brand",getAllBrand)
router.delete("/brand-delete/:is",requireAuth, checkAdmin,deleteSingeBrandByID)
module.exports = router;
