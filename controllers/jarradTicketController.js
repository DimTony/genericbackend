const JarradTicket = require("../models/jarradTicket");
const CustomError = require("../utils/customError");

const saveTicket = async (req, res, next) => {
  try {
    const newTicket = new JarradTicket(req.body);

    await newTicket.save();

    res.status(201).json({ ticket: newTicket });
  } catch (error) {
    console.log("saveTicket Error:", error);
    if (error instanceof CustomError) {
      next(error);
    } else {
      next(new CustomError(500, "Server Error"));
    }
  }
};

const updateTicket = async (req, res, next) => {
  const { id } = req.params; // Get the ticket ID from the request parameters
  const updatedData = req.body; // Get the updated data from the request body

  try {
    // Find the ticket by ID and update it with the new data
    const updatedTicket = await JarradTicket.findByIdAndUpdate(
      id,
      updatedData,
      {
        new: true,
      }
    );

    if (!updatedTicket) {
      throw new CustomError(404, "Ticket not found");
    }

    return res.status(200).json({
      message: "Ticket updated successfully",
      ticket: updatedTicket,
    });
  } catch (error) {
    console.log("UpdateTicket Error:", error);
    if (error instanceof CustomError) {
      next(error);
    } else {
      next(new CustomError(500, "Server Error"));
    }
  }
};

const updateWithReceipt = async (req, res, next) => {
  try {
    console.log("body", req.body);
    const { id } = req.params;
    const updatedData = req.body; // Get the updated data from the request body

    const updatedTicket = await JarradTicket.findByIdAndUpdate(
      id,
      updatedData,
      { new: true }
    );

    if (!updatedTicket) {
      throw new CustomError(404, "Ticket not found");
    }

    return res.status(200).json({
      message: "Ticket updated successfully",
      ticket: updatedTicket,
    });
  } catch (error) {
    console.log("UpdateWithReceiptTicket Error:", error);
    if (error instanceof CustomError) {
      next(error);
    } else {
      next(new CustomError(500, "Server Error"));
    }
  }
};

module.exports = { saveTicket, updateTicket, updateWithReceipt };
