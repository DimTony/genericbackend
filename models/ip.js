const mongoose = require('mongoose');

const IpSchema = new mongoose.Schema(
  {
    ipAddress: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const BlockedIpSchema = new mongoose.Schema(
  {
    ipAddress: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const Ip = mongoose.model('Ip', IpSchema);
const BlockedIp = mongoose.model('BlockedIp', BlockedIpSchema);

module.exports = { Ip, BlockedIp };
