const Volunteer = require('../models/volunteer');

const getAllVolunteers = async (req, res, next) => {
  try {
    const volunteers = await Volunteer.find();
    res.status(200).json(volunteers);
  } catch (err) {
    console.log('Error fetching volunteers', err);
    next(err);
  }
};

const getVolunteerById = async (req, res, next) => {
  try {
    const volunteer = await Volunteer.findById(req.params.id);
    if (!volunteer) {
      return res.status(404).json({ error: 'Volunteer not found' });
    }
    res.status(200).json(volunteer);
  } catch (err) {
    console.log('Error fetching volunteers', err);
    next(err);
  }
};

const createVolunteer = async (req, res, next) => {
  try {
    const newVolunteer = new Volunteer(req.body);
    await newVolunteer.save();
    res.status(201).json(newVolunteer);
  } catch (err) {
    console.log('Error fetching volunteers', err);
    next(err);
  }
};

const updateVolunteer = async (req, res, next) => {
  try {
    const updatedVolunteer = await Volunteer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedVolunteer) {
      return res.status(404).json({ error: 'Volunteer not found' });
    }
    res.status(200).json(updatedVolunteer);
  } catch (err) {
    console.log('Error fetching volunteers', err);
    next(err);
  }
};

const deleteVolunteer = async (req, res, next) => {
  try {
    const deletedVolunteer = await Volunteer.findByIdAndDelete(req.params.id);
    if (!deletedVolunteer) {
      return res.status(404).json({ error: 'Volunteer not found' });
    }
    res.status(200).json({ message: 'Volunteer deleted successfully' });
  } catch (err) {
    console.log('Error fetching volunteers', err);
    next(err);
  }
};

module.exports = {
  getAllVolunteers,
  getVolunteerById,
  createVolunteer,
  updateVolunteer,
  deleteVolunteer,
};
