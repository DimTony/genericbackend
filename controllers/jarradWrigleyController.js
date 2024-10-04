const CustomError = require("../utils/customError");
const JarradWrigleyClient = require("../models/jarradWrigley");
const jarradWrigleyConfirmation = require("../models/jarradWrigleyConfirmation");

const saveClient = async (req, res, next) => {
  const {
    canPerformerSell,
    clientAddress,
    clientName,
    clientPhone,
    clientEmail,
    clientType,
    date,
    endTime,
    eventDescription,
    startTime,
    venueAddress,
    venueName,
  } = req.body;
  try {
    if (
      !canPerformerSell |
      !clientAddress |
      !clientName |
      !clientPhone |
      !clientEmail |
      !clientType |
      !date |
      !endTime |
      !eventDescription |
      !startTime |
      !venueAddress |
      !venueName
    ) {
      throw new CustomError(400, "Please provide all required fields", 400);
    }

    const newClient = new JarradWrigleyClient(req.body);

    await newClient.save();

    res.status(201).json({ client: newClient });
  } catch (error) {
    if (error instanceof CustomError) {
      next(error);
    } else {
      next(new CustomError(500, "Server Error"));
    }
  }
};

const saveConfirmation = async (req, res, next) => {
  console.log(req.body);
  const { signedContract, firstReceipt } = req.body;
  try {
    if (!signedContract | !firstReceipt) {
      throw new CustomError(400, "Please provide all required fields", 400);
    }

    const newConfirmation = new jarradWrigleyConfirmation(req.body);

    await newConfirmation.save();

    res.status(201);
  } catch (error) {
    if (error instanceof CustomError) {
      next(error);
    } else {
      next(new CustomError(500, "Server Error"));
    }
  }
};

module.exports = { saveClient, saveConfirmation };
