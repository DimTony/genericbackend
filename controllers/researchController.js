const Research = require('../models/research');

const getResearches = async (req, res, next) => {
  try {
    const researches = await Research.find();
    res.status(200).json(researches);
  } catch (err) {
    next(err);
  }
};

const createResearch = async (req, res, next) => {
  try {
    const newResearch = new Research(req.body);
    const savedResearch = await newResearch.save();
    res.status(201).json(savedResearch);
  } catch (err) {
    next(err);
  }
};

const searchResearch = async (req, res, next) => {
  try {
    const { searchTerm, institution, country, cancerType, status } = req.body;

    // Start building the query
    let query = {};

    // Add filters only if the value is not "-Any-"
    if (searchTerm && searchTerm !== '-Any-') {
      query.$or = [
        { title: { $regex: searchTerm, $options: 'i' } },
        { researcher: { $regex: searchTerm, $options: 'i' } },
      ];
    }

    if (institution && institution !== '-Any-') {
      query.institution = institution;
    }

    if (country && country !== '-Any-') {
      query.country = country;
    }

    if (cancerType && cancerType !== '-Any-') {
      query.cancerType = cancerType;
    }

    if (status && status !== '-Any-') {
      query.status = status;
    }

    // Execute the query
    const results = await Research.find(query);

    res.status(200).json(results);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getResearches,
  createResearch,
  searchResearch,
};
