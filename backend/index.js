const dotenv = require("dotenv").config();
const Port = process.env.PORT || 5000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const keys = require("./config/keys");
const passport = require("passport");
const session = require("express-session");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const userRoutes = require("./routes/user.js");
const uploadRoutes = require("./routes/upload.js");
const postRoutes = require("./routes/post.js");
var MongoDBStore = require("connect-mongodb-session")(session);
require('dotenv').config();

app.use(
  cors({
    // origin: ["http://localhost:5000", "http://localhost:3000"],
    origin: ["https://allblogwebsiteapi.onrender.com", "https://allblogapp-project.vercel.app"],
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

mongoose.set("strictQuery", false);
mongoose.connect(keys.mongoURI, () => {
});

var store = new MongoDBStore(
  {
    uri: keys.mongoURI,
    collection: "mySessions",
  },
  function (error) {
    if (error) {
      // console.log("err", error);
    }
  }
);

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', "Backend url"); 
//   res.setHeader('Access-Control-Allow-Credentials', 'true'); 
//   next();
// });

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));


app.set("trust proxy", 1)
app.use(
  session({
    name: "sessionId",
    secret: keys.cookieKey,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: false,
      sameSite: "none",
      secure: true,
    },
    store: store,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  fileUpload({
    useTempFiles: true,
  })
);


app.use("/", userRoutes);
require("./servises/passport");
app.use("/", uploadRoutes);
app.use("/", postRoutes);

app.listen(Port, () => {
  console.log(`server running ${Port}`);
});
