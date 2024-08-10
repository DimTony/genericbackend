const Event = require('../models/event');

const createEvent = async (req, res, next) => {
  const { title, startDate, endDate, description, image, location } = req.body;

  // Create a new event instance
  const newEvent = new Event({
    title,
    startDate,
    endDate,
    description,
    image,
    location,
  });

  try {
    // Save the event to the database
    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    console.log('Failed to create event', error);
    next(error);
  }
};

const getEvents = async (req, res, next) => {
  try {
    const events = await Event.find();

    res.status(200).json(events);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createEvent,
  getEvents,
};
