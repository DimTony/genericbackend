const mongoose = require("mongoose");

const JarradWrigleyConfirmationSchema = new mongoose.Schema(
  {
    pdf: { type: String, required: true },
    picture: { type: String, required: true },
    secondReceipt: { type: String },
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model(
  "JarradWrigleyConfirmation",
  JarradWrigleyConfirmationSchema
);
