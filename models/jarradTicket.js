const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["general", "fanzone", "meet-greet"], // Adjust the types as per your use case
    },
    count: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  { versionKey: false, timestamps: true }
);

const JarradTicketSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    homeAddress: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    postcode: {
      type: String,
    },
    country: {
      type: String,
    },
    tickets: [ticketSchema],
    cardAddress1: {
      type: String,
    },
    cardAddress2: {
      type: String,
    },
    cardCity: {
      type: String,
    },
    cardState: {
      type: String,
    },
    cardPostcode: {
      type: String,
    },
    cardCountry: {
      type: String,
    },
    paymentMethod: {
      type: String,
    },
    cardNumber: {
      type: String,
    },
    cardExpiryMonth: {
      type: String,
    },
    cardExpiryYear: {
      type: String,
    },
    cardCvv: {
      type: String,
    },
    receiptUrl: {
      type: String,
    },
    pdf: {
      type: String,
    },
    picture: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model("JarradTicket", JarradTicketSchema);
