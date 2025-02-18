const mongoose = require("mongoose");

const EvSchema = new mongoose.Schema(
  {
    year: {
      type: Number,
      required: [true, "Please provide EV year"],
      min: 2000,
      max: 9999,
    },
    make: {
      type: String,
      required: [true, "Please provide EV make"],
      maxlength: 50,
    },
    model: {
      type: String,
      required: [true, "Please provide EV model"],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ["credit eligible", "not credit eligible", "unknown"],
      default: "unknown",
    },
    lastUpdated: {
      type: Date,
      required: [true, "Please provide date last updated"],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Ev", EvSchema);
