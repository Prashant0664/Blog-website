const express = require("express");
const { newPost,allPost, postcomment, getcomment } = require("../controllers/post");
const { authUser } = require('../middleware/auth');

const router = express.Router();

router.post("/post", authUser, newPost);
router.get("/getallpost", allPost);
router.post("/postcomment",postcomment)
router.post("/getcomment",getcomment)
module.exports = router;
