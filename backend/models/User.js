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
    }
  },
  { timestamps: true }
);

module.exports = model("User", userSchema);

