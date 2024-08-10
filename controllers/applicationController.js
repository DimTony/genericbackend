const Applicant = require('../models/fwawApplication');

const registerApplicant = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      emailAddress,
      dateOfBirth,
      mobilePhone,
      socialHandles,
      currentCity,
      currentState,
      hometownCity,
      hometownState,
      occupation,
      height,
      relationshipStatus,
      noOfChildren,
      whyApply,
      cityGirlOrCountryGirl,
      howYouHeard,
      appliedBefore,
      consent,
      introVideo,
      fullBodyPhoto,
      headShotPhoto,
      receiptPhoto,
    } = req.body;

    // Validate that all required files are present
    if (!introVideo || !fullBodyPhoto || !headShotPhoto || !receiptPhoto) {
      return res.status(400).json({
        message:
          'All required files (intro video, full body photo, headshot photo and receipt photo) must be uploaded.',
        missingFiles: {
          introVideo: !introVideo,
          fullBodyPhoto: !fullBodyPhoto,
          headShotPhoto: !headShotPhoto,
          receiptPhoto: !receiptPhoto,
        },
      });
    }

    const newApplication = new Applicant({
      firstName,
      lastName,
      emailAddress,
      dateOfBirth: new Date(dateOfBirth),
      mobilePhone,
      socialHandles,
      currentCity,
      currentState,
      hometownCity,
      hometownState,
      occupation,
      height,
      relationshipStatus,
      noOfChildren,
      whyApply,
      cityGirlOrCountryGirl,
      howYouHeard,
      appliedBefore,
      introVideo,
      fullBodyPhoto,
      headShotPhoto,
      receiptPhoto,
      consent: consent === 'true',
    });

    await newApplication.save();

    res.status(201).json({ message: 'Application submitted successfully' });
  } catch (error) {
    console.error('Error submitting application:', error);
    res.status(500).json({
      message: 'Error submitting application',
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    });
  }
};

module.exports = {
  registerApplicant,
};
