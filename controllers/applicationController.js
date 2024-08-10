const Applicant = require('../models/fwawApplication');

const registerApplicant = async (req, res, next) => {
  try {
    console.log('Received request body:', JSON.stringify(req.body, null, 2));

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

    console.log('File URLs from req.body:');
    console.log('introVideo:', introVideo);
    console.log('fullBodyPhoto:', fullBodyPhoto);
    console.log('headShotPhoto:', headShotPhoto);
    console.log('receiptPhoto:', receiptPhoto);

    // Validate that all required files are present
    if (!introVideo || !fullBodyPhoto || !headShotPhoto || !receiptPhoto) {
      console.log('Missing required files. Sending 400 response.');
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

    console.log(
      'New application object:',
      JSON.stringify(newApplication, null, 2)
    );

    const savedApplication = await newApplication.save();
    console.log(
      'Saved application:',
      JSON.stringify(savedApplication, null, 2)
    );

    res
      .status(201)
      .json({
        message: 'Application submitted successfully',
        application: savedApplication,
      });
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
