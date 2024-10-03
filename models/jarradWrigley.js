const mongoose = require("mongoose");

const JarradWrigleySchema = new mongoose.Schema(
  {
    clientType: { type: String, required: true },
    clientName: { type: String, required: true },
    clientAddress: { type: String, required: true },
    clientPhone: { type: String, required: true },
    clientEmail: { type: String },
    venueName: { type: String, required: true },
    venueAddress: { type: String, required: true },
    eventDescription: { type: String, required: true },
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    canPerformerSell: { type: String, required: true },
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model("JarradWrigleyClient", JarradWrigleySchema);
