const mongoose = require("mongoose");

const TrackingEntrySchema = new mongoose.Schema({
  date: {
    type: String,
  },
  day: {
    type: String,
  },
  time: {
    type: String,
  },
  activity: {
    type: String,
  },
  location: {
    type: String,
  },
});

const TrackingSchema = new mongoose.Schema(
  {
    shipDate: {
      type: String,
    },
    from: {
      type: String,
    },
    sender: {
      type: String,
    },
    senderEmail: {
      type: String,
    },
    deliveryDate: {
      type: String,
    },
    to: {
      type: String,
    },
    receiver: {
      type: String,
    },
    receiverEmail: {
      type: String,
    },
    currentLocation: {
      type: String,
    },
    signedForBy: {
      type: String,
    },
    status: {
      type: String,
    },
    trackingData: [TrackingEntrySchema],
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model("Tracking", TrackingSchema);
