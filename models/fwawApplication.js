const mongoose = require('mongoose');

const applicantSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    emailAddress: String,
    dateOfBirth: {
      month: String,
      day: String,
      year: String,
    },
    mobilePhone: String,
    socialHandles: String,
    currentCity: String,
    currentState: String,
    hometownCity: String,
    hometownState: String,
    occupation: String,
    height: String,
    relationshipStatus: String,
    noOfChildren: String,
    whyApply: String,
    cityGirlOrCountryGirl: String,
    howYouHeard: String,
    appliedBefore: String,
    introVideoUrl: String,
    fullBodyPhotoUrl: String,
    headShotPhotoUrl: String,
    receiptPhotoUrl: String,
    consent: Boolean,
  },
  { timestamps: true, versionKey: false }
);

const Applicant = mongoose.model('Applicant', applicantSchema);

module.exports = Applicant;
