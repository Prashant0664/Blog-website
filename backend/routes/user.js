
const express = require("express");
const keys = require("../config/keys");

const { generateToken } = require("../helper/token");
const {
  getallLikes,
  register,
  login,
  getallBookmarks,
  uploadprofile,
  getUser,
  findOutUser,
  sendResetPasswordCode,
  validateResetCode,
  changePassword,
  bookmark,
  deletebookmark,
  checkbookmark,
  sendreportmails,
  followercount,
  followingcount,
  showbookmark,
  fetchprof,
  showmyposts,
  deletepost,
  fetchfollowing,
  follow,
  checkfollowing,
  unfollow,
  searchresult,
  changeabout,
  likes,
  checklikes,
  deletelikes,
  showLikemark
} = require("../controllers/user");
const {
  sendmail,
  checkifverify,
  verifycode,
  checkotpv
} = require("../controllers/verifyemail")

const {
  google_auth,
  google_auth_callback,
} = require("../controllers/Auth")

var passport = require('passport')
const OAuthStrategy = require('passport-oauth').OAuthStrategy;
var GoogleStrategy = require('passport-google-oidc');

const router = express.Router();
const app = express();
const { authUser } = require("../middleware/auth");
// app.use(passport.initialize());
// app.use(passport.session());
router.post("/register", register);
router.post("/checkotpv", checkotpv);

router.post("/checkifverify", checkifverify);
router.post("/login", login);
router.post("/sendmail", sendmail);
router.post("/verifycode", verifycode);
router.put("/uploadprofile", authUser, uploadprofile);
router.get("/getUser/:userId", getUser);
router.post("/findOutUser", findOutUser);
router.post("/getallBookmarks", getallBookmarks);
router.post("/sendResetPasswordCode", sendResetPasswordCode);
router.post("/validateResetCode", validateResetCode);
router.post("/changePassword", changePassword);
router.post("/setbookmark", bookmark);
router.post("/setlikes", likes);
router.post("/getallLikes", getallLikes);
router.post("/deletelikes", deletelikes);
router.post("/checklikes", checklikes);
router.post("/deletebookmark", deletebookmark);
router.post("/checkbookmark", checkbookmark);
router.post("/reportcontent", sendreportmails);
router.post("/countfollower", followercount);
router.post("/countfollowing", followingcount);
router.post("/showbookmarks", showbookmark);
router.post("/showLikemarks", showLikemark);
router.post("/fetchprof", fetchprof);
router.post("/showmyposts", showmyposts);
router.post("/deletepost", deletepost);
router.post("/fetchfollowing", fetchfollowing);
router.post("/startfollow", follow);
router.post("/unfollow", unfollow);
router.post("/searchresult", searchresult);
router.post("/checkfollow", checkfollowing);
router.post("/changeabout", changeabout);


const register_google = async (req) => {
  try {
    const { name, temail, password, image } = req.body;

    const check = await User.findOne({ temail });
    if (check) {
      return res.status(400).json({
        message:
          "This email already exists,try again with a different email",
      });
    }

    const hashed_password = await bcrypt.hash(password, 10);
    const user = await new User({
      name: name,
      email: temail,
      password: hashed_password,
      verify: true,
      picture: image
    }).save();
    const token = generateToken({ id: user._id.toString() }, "15d");
    res.send({
      id: user._id,
      name: user.name,
      picture: user.picture,
      token: token,
      message: "Register Success !",
    });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({ message: error.message });
  }
}

// passport.use(new GoogleStrategy({
//   clientID: process.env.GOOGLE_CLIENT,
//   clientSecret: process.env.GOOGLE_SECRET,
//   callbackURL: `${process.env.REACT_APP_FRONTEND_URL}`,
//   passReqToCallback: true
// },
//   function (req, acc, ref, profile, done) {
//     CSSConditionRule.log(profile)
//     return done(null, profile)
//   }
// ))

// router.get(
//   "/auth/google",
//   passport.authenticate("google", { scope: ['profile', 'email'] }, { failureRedirect: '/login/failed', failureMessage: true }),
//   google_auth
// );

// router.get(
//   "/auth/google/callback",
//   passport.authenticate("google", {
//     failureRedirect: "/login/failed"
//   }), 
//   google_auth_callback
// );

router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/auth/google/callback", passport.authenticate("google", {
  successRedirect: `${keys.FRONTEND_URL}/`,
  failureRedirect: `${keys.FRONTEND_URL}/login`
}))


router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: " Authentication has been failded ! ",
  });
});

router.post("/login/success", async (req, res) => {
  if (req.isAuthenticated()) {
    const token = generateToken({ id: req.user._id.toString() }, "15d");
    return res.status(201).send({
      id: req.user._id,
      name: req.user.name,
      picture: req.user.picture,
      token: token,
      likes: req.user.likes,
      bookmarks: req.user.bookmarks,
    });
    // res.status(200).json({
    //   success: true,
    //   message: "successfull",
    //   user: { id: req.user._id, name: req.user.name, email: req.user.email, googleId: req.user.googleId, picture: req.user.picture }
    // });
  } else {
    // console.log("failed");
    return res.status(401).json({
      success: false,
      message: "Un-successfull",
      user: null,
    });
  }
});
//Logout
router.get("/logout", async (req, res) => {
  try {
    req.logout((err) => {
      if (err) {
        return res.status(400).json("Couldn't logout");
      }
    });
    res.cookie('session', '', { expires: new Date(0), });
    res.clearCookie("sessionId");
    res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});



module.exports = router;
