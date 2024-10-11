const Tracking = require("../models/tracking");
const CustomError = require("../utils/customError");

const createTracking = async (req, res, next) => {
  try {
    const trackingData = req.body;
    const newTracking = new Tracking(trackingData);
    await newTracking.save();
    res.status(201).json(newTracking);
  } catch (error) {
    console.error(error);
    if (error instanceof CustomError) {
      next(error);
    } else {
      next(new CustomError(500, "Server Error"));
    }
  }
};

const updateTracking = async (req, res, next) => {
  try {
    const { id } = req.params;
    const trackingData = req.body;

    const updatedTracking = await Tracking.findByIdAndUpdate(id, trackingData, {
      new: true,
      runValidators: true,
    });

    if (!updatedTracking) {
      throw new CustomError(404, "Tracking document not found");
    }

    res.status(200).json(updatedTracking);
  } catch (error) {
    console.error(error);
    if (error instanceof CustomError) {
      next(error);
    } else {
      next(new CustomError(500, "Server Error"));
    }
  }
};

const deleteTracking = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedTracking = await Tracking.findByIdAndDelete(id);

    if (!deletedTracking) {
      throw new CustomError(404, "Tracking document not found");
    }

    res.status(200).json({ message: "Tracking document deleted successfully" });
  } catch (error) {
    console.error(error);
    if (error instanceof CustomError) {
      next(error);
    } else {
      next(new CustomError(500, "Server Error"));
    }
  }
};

const getTracking = async (req, res, next) => {
  try {
    const { id } = req.params;
    const trackingDocument = await Tracking.findById(id);

    if (!trackingDocument) {
      throw new CustomError(404, "Tracking document not found");
    }

    res.status(200).json(trackingDocument);
  } catch (error) {
    console.error(error);
    if (error instanceof CustomError) {
      next(error);
    } else {
      next(new CustomError(500, "Server Error"));
    }
  }
};

const getTrackingByReference = async (req, res, next) => {
  try {
    const { id, country } = req.params;

    const trackingDocument = await Tracking.findById(id);

    if (!trackingDocument) {
      throw new CustomError(404, "Tracking document not found");
    }

    const toAddress = trackingDocument.to;
    const toCountry = toAddress.split(",").pop().trim(); // Extract last part after the comma

    if (toCountry.toLowerCase() !== country.toLowerCase()) {
      throw new CustomError(404, "Tracking document not found");
    }

    res.status(200).json(trackingDocument);
  } catch (error) {
    console.error(error);
    if (error instanceof CustomError) {
      next(error);
    } else {
      next(new CustomError(500, "Server Error"));
    }
  }
};

const getTrackingByTCN = async (req, res, next) => {
  try {
    const { id, date } = req.params;

    const trackingDocument = await Tracking.findOne({
      _id: id,
      shipDate: date,
    });

    if (!trackingDocument) {
      throw new CustomError(404, "Tracking document not found");
    }

    res.status(200).json(trackingDocument);
  } catch (error) {
    console.error(error);
    if (error instanceof CustomError) {
      next(error);
    } else {
      next(new CustomError(500, "Server Error"));
    }
  }
};

module.exports = {
  createTracking,
  updateTracking,
  deleteTracking,
  getTracking,
  getTrackingByReference,
  getTrackingByTCN,
};
