const { model, Schema } = require("mongoose");
const userSchema = new Schema(
  {
    name: {
      type: String,
      // required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: function () { return !this.googleId },
    },
    verify: {
      type: Boolean,
      default: false
    },
    googleId: {
      type: String,
      required: function () { return !this.password },
    },
    picture: {
      type: String,
      trim: true,
      default:
        "https://res.cloudinary.com/dmhcnhtng/image/upload/v1643044376/avatars/default_pic_jeaybr.png",
    },
    about: {
      type: String
    },
    bookmarks: {
      type: Array,
      default: []
    },
    likes: {
      type: Array,
      default: []
    },
    posts: {
      type: Array,
      default: []
    },
    following: {
      type: Array,
      default: [],
    },
    followerscount: {
      type: Number,
      default: 0,
    },
    followingcount: {
      type: Number,
      default: 0,
    },
    likeslist: {
      type: Map,
      of: Boolean,
    },
    bookmarkslist: {
      type: Map,
      of: Boolean,
    }

  },
  { timestamps: true }
);

module.exports = model("User", userSchema);

