const Subscriber = require('../models/mailingList');
const moment = require('moment');

const signup = async (req, res) => {
  try {
    const { email, preferences } = req.body;

    let subscriber = await Subscriber.findOne({ email });

    if (subscriber) {
      subscriber.preferences = preferences;
      await subscriber.save();
      return res
        .status(200)
        .json({ message: 'Preferences updated successfully' });
    }

    subscriber = new Subscriber({ email, preferences });
    await subscriber.save();

    res.status(201).json({ message: 'Signed up successfully' });
  } catch (error) {
    console.error('Signup error:', error);
    next(error);
  }
};

const convertToISO = async (req, res) => {
  const { dateString } = req.body;

  // Remove the ordinal suffix from the day
  const day = dateString.replace(/(\d+)(st|nd|rd|th)/, '$1');

  // Parse the date string using moment
  const date = moment(day, 'ddd MMM DD hh:mma');

  // Add one hour to the parsed date
  const adjustedDate = date.add(1, 'hour');

  // Format the date in ISO 8601 format
  const isoDate = adjustedDate.toISOString();

  res.status(200).json(isoDate);
};

module.exports = { signup, convertToISO };
