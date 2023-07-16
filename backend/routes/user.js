const express = require("express");

const {
  register,
  login,
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
  searchresult
} = require("../controllers/user");
const {
  sendmail,
  checkifverify,
  verifycode,
  checkotpv
} = require("../controllers/verifyemail")
var passport = require('passport')
const OAuthStrategy = require('passport-oauth').OAuthStrategy;
var GoogleStrategy = require('passport-google-oidc');

const router = express.Router();
const { authUser } = require("../middleware/auth");
const CLIENT_URL = "https://allblogapp-project.vercel.app";
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
router.post("/sendResetPasswordCode", sendResetPasswordCode);
router.post("/validateResetCode", validateResetCode);
router.post("/changePassword", changePassword);
router.post("/setbookmark", bookmark);
router.post("/deletebookmark", deletebookmark);
router.post("/checkbookmark", checkbookmark);
router.post("/reportcontent", sendreportmails);
router.post("/countfollower", followercount);
router.post("/countfollowing", followingcount);
router.post("/showbookmarks", showbookmark);
router.post("/fetchprof", fetchprof);
router.post("/showmyposts", showmyposts);
router.post("/deletepost", deletepost);
router.post("/fetchfollowing", fetchfollowing);
router.post("/startfollow", follow);
router.post("/unfollow", unfollow);
router.post("/searchresult", searchresult);
router.post("/checkfollow", checkfollowing);



passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT,
  clientSecret: process.env.GOOGLE_SECRET,
  callbackURL: 'https://allblogapp-project.vercel.app',
  passReqToCallback: true
},
  function (req, acc, ref, profile, done) {
    CSSConditionRule.log(profile)
    return done(null, profile)
  }
))
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ['profile', 'email'] }, { failureRedirect: '/login/failed', failureMessage: true }),
  function (req, res) {
    res.redirect('/');
  }
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login/failed"
  }), (req, res) => {
    res.redirect(CLIENT_URL);
  }
);

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: " Authentication hasbeen failded ! ",
  });
});

router.get("/login/success", async (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json({
      success: true,
      message: "successfull",
      user: { id: req.user._id, name: req.user.name, email: req.user.email, googleId: req.user.googleId, picture: req.user.picture }
    });
  } else {
    res.status(200).json({
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
