const express = require("express");

const {getallpostdata, newPost,allPost, postcomment, getcomment } = require("../controllers/post");
const { authUser } = require('../middleware/auth');

const router = express.Router();

router.post("/post", authUser, newPost);
router.get("/getallpost", allPost);
router.post("/postcomment",postcomment)
router.post("/getcomment",getcomment)
router.post("/getallpostdata",getallpostdata)
module.exports = router;
