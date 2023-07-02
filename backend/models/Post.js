const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: { 
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true,
      enum: ["food", "travelling", "lifestyle", "tech"]
    },
    image: {
      type: String,
      required: true,
    },
    user: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true
    },
    comments: [
      {
        comment: {
          type: String,
        }, 
        image: {
          type: String,
        },
        commentBy: {
          type: ObjectId,
          ref: "User",
        },
        commentAt: {
          type: Date,
          required: true,
        },
        name:{
          type:String,
          default:"An User"
        }

      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);
