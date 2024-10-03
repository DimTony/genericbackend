const mongoose = require("mongoose");

const JarradWrigleyConfirmationSchema = new mongoose.Schema(
  {
    signedContract: { type: String, required: true },
    firstReceipt: { type: String, required: true },
    secondReceipt: { type: String, required: true },
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model(
  "JarradWrigleyConfirmation",
  JarradWrigleyConfirmationSchema
);
