const mongoose = require('mongoose');

const applicantSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    emailAddress: { type: String, required: true },
    dateOfBirth: {
      type: Date,
      required: true,
      set: function (value) {
        if (typeof value === 'string') {
          try {
            const dateObj = JSON.parse(value);
            // Create date without timezone offset
            return new Date(
              Date.UTC(dateObj.year, dateObj.month - 1, dateObj.day)
            );
          } catch (e) {
            return new Date(value);
          }
        }
        return value;
      },
      get: function (value) {
        // Return date in YYYY-MM-DD format
        return value ? value.toISOString().split('T')[0] : null;
      },
    },
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
  { timestamps: true, versionKey: false }
);

const Applicant = mongoose.model('Applicant', applicantSchema);

module.exports = Applicant;
