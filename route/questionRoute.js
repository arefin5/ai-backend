const express = require("express");
const { requireAuth } = require("../midleware/auth")

const { checkAdmin } = require("../midleware/admin");
const {
    createQuestion,
    getAllQuestions,
    updateQuestion,
    deleteQuestion,
    totalPosts,
    singleQuestion,
    getQuestionByVocabulary,
    getQuestionByGrammer,
    getQuestionByKanji,
    getQuestionByReading,
    getQuestionByFullOne,
    getQuestionByFullTwo
}
    = require('../controlar/questonControlar');
const router = express.Router();
router.post("/create-question",requireAuth, checkAdmin,createQuestion);
router.get("/get-all-question", getAllQuestions);
router.get('/total-posts', totalPosts);
// single post:
router.get("/single-post/:_id", singleQuestion)

// get question by catagory:
router.get("/catagories/vocabulary/", getQuestionByVocabulary);
router.get("/catagories/grammar/", getQuestionByGrammer);
router.get("/catagories/kanji/", getQuestionByKanji);
router.get("catagories/reading", getQuestionByReading);
router.get("catagories/one", getQuestionByFullOne);
router.get("catagories/two", getQuestionByFullTwo);
// 

router.put("/update-question/:_id", updateQuestion)
router.delete("/delete-question/:_id", deleteQuestion);
module.exports = router;
