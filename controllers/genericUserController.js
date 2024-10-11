const GenericUser = require("../models/genericUser");
const CustomError = require("../utils/customError");

const saveUser = async (req, res, next) => {
  const {
    username,
    firstName,
    lastName,
    address,
    email,
    password,
    currentAmount,
    totalAmount,
    generalAdmission,
    fanZone,
    meetAndGreet,
  } = req.body;

  try {
    const genericUser = new GenericUser({
      username,
      firstName,
      lastName,
      address,
      email,
      password,
      currentAmount,
      totalAmount,
      generalAdmission,
      fanZone,
      meetAndGreet,
    });

    await genericUser.save();

    res.status(201).json({
      user: genericUser,
      prices: {
        generalAdmission: genericUser.generalAdmission,
        fanZone: genericUser.fanZone,
        meetAndGreet: genericUser.meetAndGreet,
      },
    });
  } catch (error) {
    if (error instanceof CustomError) {
      next(error);
    } else {
      next(new CustomError(500, "Server Error"));
    }
  }
};

const getUserById = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const genericUser = await GenericUser.findById(userId);

    res.status(200).json({ user: genericUser });
  } catch (error) {
    console.log("Error Caught: ", error);
    if (error instanceof CustomError) {
      next(error);
    } else {
      next(new CustomError(500, "Server Error"));
    }
  }
};

module.exports = { saveUser, getUserById };
