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

    let parsedDateOfBirth;
    try {
      if (typeof dateOfBirth === 'string') {
        const dateObj = JSON.parse(dateOfBirth);
        // Create date in UTC to avoid timezone issues
        parsedDateOfBirth = new Date(
          Date.UTC(dateObj.year, dateObj.month - 1, dateObj.day)
        );
      } else {
        parsedDateOfBirth = new Date(
          Date.UTC(
            dateOfBirth.getFullYear(),
            dateOfBirth.getMonth(),
            dateOfBirth.getDate()
          )
        );
      }

      if (isNaN(parsedDateOfBirth.getTime())) {
        throw new Error('Invalid date');
      }
    } catch (error) {
      console.error('Error parsing dateOfBirth:', error);
      return res.status(400).json({ message: 'Invalid date of birth format' });
    }

    const newApplication = new Applicant({
      firstName,
      lastName,
      emailAddress,
      dateOfBirth: parsedDateOfBirth,
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

    const savedApplication = await newApplication.save();

    res.status(201).json({
      message: 'Application submitted successfully',
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
