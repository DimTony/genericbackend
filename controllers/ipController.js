const { Ip, BlockedIp } = require('../models/ip');
const CustomError = require('../utils/customError');

const verifyIp = async (req, res, next) => {
  try {
    const { ip } = req.body;

    if (!ip) {
      throw new CustomError(400, 'IP address is required');
    }

    const ipAddress = new Ip({
      ipAddress: ip,
    });

    await ipAddress.save();

    const blockedIPs = await BlockedIp.find();

    const isBlocked = blockedIPs.some(
      (blockedIp) => blockedIp.ipAddress === ip
    );

    res.status(200).json({
      message: 'IP address stored successfully',
      ipAddress,
      blocked: isBlocked,
    });
  } catch (error) {
    console.log('Error saving IP to database', error);
    next(error);
  }
};

const blockIp = async (req, res, next) => {
  try {
    const { ip } = req.body;

    if (!ip) {
      throw new CustomError(400, 'IP address is required');
    }

    const ipAddress = new BlockedIp({
      ipAddress: ip,
    });

    await ipAddress.save();

    console.log(`Blocked IP: ${ipAddress}`);

    // Respond to the client
    res.status(200).send('IP address blocked successfully');
  } catch (error) {
    console.log('Error blocking IP', error);
    next(error);
  }
};

module.exports = { verifyIp, blockIp };
