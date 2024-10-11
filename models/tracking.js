const mongoose = require("mongoose");

const ShipmentDataSchema = new mongoose.Schema({
  trackingNumber: {
    type: String,
  },
  deliveredTo: {
    type: String,
  },
  shipDate: {
    type: Date,
  },
  standardTransit: {
    type: String,
  },

  delivered: {
    type: String,
  },
});

const ServiceDataSchema = new mongoose.Schema({
  service: {
    type: String,
  },
  specialHandlingSection: {
    type: String,
  },
});

const PackageDetailsSchema = new mongoose.Schema({
  weight: {
    type: String,
  },
  dimensions: {
    type: String,
  },
  totalPieces: {
    type: Number,
  },
  totalShipmentWeight: {
    type: String,
  },
  packaging: {
    type: String,
  },
});

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
    currentStep: {
      type: Number,
    },
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
    receiverPhoneNumber: {
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
    shipmentData: ShipmentDataSchema,
    serviceData: ServiceDataSchema,
    packageData: PackageDetailsSchema,
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model("Tracking", TrackingSchema);
