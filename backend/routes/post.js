const express = require("express");

const { getarticle, getLikes, decreastLike, increaseLike, getallpostdata, newPost, allPost, postcomment, getcomment, increaseView, getView, editPost, } = require("../controllers/post");
const { authUser } = require('../middleware/auth');

const router = express.Router();

router.post("/post", authUser, newPost);
router.post("/editPost", authUser, editPost);
router.post("/getarticle", getarticle);
router.post("/getallpost", allPost);
router.post("/postcomment", postcomment)
router.post("/getcomment", getcomment)
router.post("/increaseView", increaseView)
router.post("/getView", getView)
router.post("/getallpostdata", getallpostdata)
router.post("/increaseLike", increaseLike)
router.post("/decreastLike", decreastLike)
router.post("/getLikes", getLikes)
module.exports = router;
 