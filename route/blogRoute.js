

const { requireAuth } = require("../midleware/auth")
const { checkAdmin } = require("../midleware/admin");
const express = require("express")
const router = express.Router();
// controllers
const { createBlog, allPublishedBlog,
        deleteBlogById,
        allPendingBlog,
        singleBlog,
        singleBlogconvert,
        getCaruselDraft,
        deleteCaruselDraft,
        getCarusel,
        aprovedCarusel,
        singlgleBlogTags,
        allPublishedBlogBlogs,
        allPublishedBlogstudy,
        allPublishedBlogService,
        singleblogpublic,
        CreateCarusel } = require("../controlar/blogControlar");

router.post("/create-blog", requireAuth, createBlog);
router.get('/pending-blogs', requireAuth, checkAdmin, allPendingBlog);
router.get('/blog/:id', requireAuth, checkAdmin, singleBlog);
router.delete('/blog/:id', requireAuth, checkAdmin, deleteBlogById);
// 
router.put('/approve-blog/:id',singlgleBlogTags)
router.put('/publised-single-blog/:id', requireAuth, checkAdmin, singleBlogconvert);
// 
// 
router.post("/create-carusel",  CreateCarusel)
// public route :
router.get('/published-blogs', allPublishedBlog);
router.get("/draft-carusel", getCaruselDraft);
router.delete("/delete-carusel/:id", requireAuth, deleteCaruselDraft);
router.put("/aproved-carusel/:id", aprovedCarusel);

router.get("/published-carusels", getCarusel);
router.get("/blogs-published",allPublishedBlogBlogs);
router.get("/blogs-study",allPublishedBlogstudy)
router.get("/blogs-service",allPublishedBlogService)
router.get("/singleblogs/:id",singleblogpublic)

module.exports = router;