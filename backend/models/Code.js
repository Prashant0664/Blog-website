const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const codeSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  user: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
});
codeSchema.index({ createdAt: 1 }, { expireAfterSeconds: 1800 });
module.exports = mongoose.model("Code", codeSchema);
