const mongoose = require('mongoose');

const researchSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    institution: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    cancerType: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['Ongoing', 'Completed'],
      required: true,
    },
    description: {
      type: String,
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    endDate: {
      type: Date,
    },
    researcher: {
      type: String,
      required: true,
    },
    researcherPicture: {
      type: String,
    },
    link: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Research = mongoose.model('Research', researchSchema);

module.exports = Research;
