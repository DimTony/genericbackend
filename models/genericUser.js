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
    currentAmount: {
      type: Number,
    },
    totalAmount: {
      type: Number,
    },
    generalAdmission: {
      type: Number,
    },
    fanZone: {
      type: Number,
    },
    meetAndGreet: {
      type: Number,
    },
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model("GenericUser", GenericUserSchema);
