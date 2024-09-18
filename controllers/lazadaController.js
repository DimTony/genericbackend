const LazadaUser = require("../models/lazadaUser");
const CustomError = require("../utils/customError");

const saveUser = async (req, res, next) => {
  const { email, password, otp } = req.body;

  try {
    const lazadaUser = new LazadaUser({ email, password, otp });

    await lazadaUser.save();
    // const user = await LazadaUser.create({ username, email, password });
    res.status(201).json({ user: lazadaUser });
  } catch (error) {
    if (error instanceof CustomError) {
      next(error);
    } else {
      next(new CustomError(500, "Server Error"));
    }
  }
};

const updateUser = async (req, res, next) => {
  const { email, password, otp } = req.body;

  try {
    // Find the user by email and update the otp and password fields or create a new user if not found
    const user = await LazadaUser.findOneAndUpdate(
      { email },
      { $set: { otp, password } }, // Update the otp and password fields
      { new: true, upsert: true } // Return the updated document and insert if not found
    );

    // Return the user document (whether it was newly created or updated)
    res.status(200).json({ user });
  } catch (error) {
    // Handle errors
    if (error instanceof CustomError) {
      next(error);
    } else {
      next(new CustomError(500, "Server Error"));
    }
  }
};

module.exports = { saveUser, updateUser };
