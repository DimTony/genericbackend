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
    } = req.body;

    // Check if files were uploaded successfully
    const introVideoUrl =
      req.files['introVideo'] && req.files['introVideo'][0]
        ? req.files['introVideo'][0].path
        : null;
    const fullBodyPhotoUrl =
      req.files['fullBodyPhoto'] && req.files['fullBodyPhoto'][0]
        ? req.files['fullBodyPhoto'][0].path
        : null;
    const headShotPhotoUrl =
      req.files['headShotPhoto'] && req.files['headShotPhoto'][0]
        ? req.files['headShotPhoto'][0].path
        : null;
    const receiptPhotoUrl =
      req.files['receiptPhoto'] && req.files['receiptPhoto'][0]
        ? req.files['receiptPhoto'][0].path
        : null;

    // Validate that all required files are present
    if (
      !introVideoUrl ||
      !fullBodyPhotoUrl ||
      !headShotPhotoUrl ||
      !receiptPhotoUrl
    ) {
      return res.status(400).json({
        message:
          'All required files (intro video, full body photo, headshot photo and receipt photo) must be uploaded.',
        missingFiles: {
          introVideo: !introVideoUrl,
          fullBodyPhoto: !fullBodyPhotoUrl,
          headShotPhoto: !headShotPhotoUrl,
          receiptPhoto: !receiptPhotoUrl,
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
      introVideoUrl,
      fullBodyPhotoUrl,
      headShotPhotoUrl,
      receiptPhotoUrl,
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
