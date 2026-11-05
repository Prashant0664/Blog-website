const dotenv = require("dotenv").config();
const keys = require("./config/keys");
const Port = keys.PORT || 5002;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
// const session = require('cookie-session');
const cors = require("cors");
const fileUpload = require("express-fileupload");
const userRoutes = require("./routes/user.js");
const uploadRoutes = require("./routes/upload.js");
const postRoutes = require("./routes/post.js");
var cookieParser = require('cookie-parser')
var cookieSession = require("cookie-session");
var MongoDBStore = require("connect-mongodb-session")(session);
require('dotenv').config();
app.use(
  cors({
    origin: [keys.BACKEND_URL, keys.FRONTEND_URL],
    // origin: [keys.REACT_APP_BACKEND_URL, keys.REACT_APP_FRONTEND_URL],
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

mongoose.set("strictQuery", false);
let sessionStore;
if (keys.MONGO_URI) {
  mongoose
    .connect(keys.MONGO_URI, { serverSelectionTimeoutMS: 10000 })
    .then((conn) => {
      console.log(`MongoDB connected: ${conn.connection.host}/${conn.connection.name}`);
    })
    .catch((error) => {
      console.error("MongoDB connection failed:", error.message);
      if (/auth|parse|URL/i.test(error.message)) {
        console.error("  -> Check the database user/password in MONGO_URI (URL-encode special characters like @ : / ? # %).");
      } else if (/whitelist|ENOTFOUND|timed out|Server selection/i.test(error.message)) {
        console.error("  -> Check the cluster host in MONGO_URI and that your IP is allowed in Atlas > Network Access.");
      }
    });
  mongoose.connection.on("disconnected", () => console.warn("MongoDB disconnected"));

  try {
    sessionStore = new MongoDBStore({
      uri: keys.MONGO_URI,
      collection: "mySessions",
    });
    sessionStore.on("error", (error) => {
      console.error("Session store error:", error.message);
    });
  } catch (error) {
    // Invalid connection string: the store throws synchronously. Fall back to memory sessions.
    sessionStore = undefined;
  }
} else {
  console.warn("MONGO_URI is not set - copy backend/.env.example to backend/.env and fill it in.");
}

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));


app.set("trust proxy", 1)
app.use(cookieParser())
app.use(session({
  proxy: true,
  secret: keys.COOKIE_KEY || "local-development-secret",
  resave: false,
  saveUninitialized: true,
  store: sessionStore, // undefined -> falls back to in-memory store
  cookie: {
    maxAge: 15 * 24 * 60 * 60 * 1000, // Uncomment if needed for cookie lifespan
    sameSite: process.env.NODE_ENV === 'production' ? "none" : "lax", // "none" for cross-site cookies in production
    secure: process.env.NODE_ENV === 'production', // Secure should be true in production (HTTPS)
  },
}))

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
