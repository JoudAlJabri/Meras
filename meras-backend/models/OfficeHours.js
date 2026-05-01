const mongoose = require("mongoose");

const officeHoursSchema = new mongoose.Schema(
  {
    slots: [
      {
        id:        { type: String, required: true },
        day:       { type: String, required: true },
        time:      { type: String, required: true },
        available: { type: Boolean, default: false },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("OfficeHours", officeHoursSchema);