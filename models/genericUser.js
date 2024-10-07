const mongoose = require("mongoose");

const GenericUserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    address: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model("GenericUser", GenericUserSchema);
