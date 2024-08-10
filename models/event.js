const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema(
  {
    title: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    description: { type: String, required: true },
    image: { type: String, required: true },
    location: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
