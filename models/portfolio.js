const mongoose = require("mongoose");

const PortfolioSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model("Portfolio", PortfolioSchema);
