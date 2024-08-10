const mongoose = require('mongoose');

const applicantSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    emailAddress: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    mobilePhone: { type: String, required: true },
    socialHandles: { type: String },
    currentCity: { type: String, required: true },
    currentState: { type: String, required: true },
    hometownCity: { type: String },
    hometownState: { type: String },
    occupation: { type: String, required: true },
    height: { type: String, required: true },
    relationshipStatus: { type: String, required: true },
    noOfChildren: { type: String, required: true },
    whyApply: { type: String, required: true },
    cityGirlOrCountryGirl: { type: String, required: true },
    howYouHeard: { type: String, required: true },
    appliedBefore: { type: String, required: true },
    consent: { type: Boolean, required: true },
    introVideo: { type: String, required: true },
    fullBodyPhoto: { type: String, required: true },
    headShotPhoto: { type: String, required: true },
    receiptPhoto: { type: String, required: true },
  },
  { timestamps: true }
);

const Applicant = mongoose.model('Applicant', applicantSchema);

module.exports = Applicant;
