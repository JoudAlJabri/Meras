const mongoose = require("mongoose");

const taxonomySchema = new mongoose.Schema(
  {
    universities: [{ type: String }],
    majors: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Taxonomy", taxonomySchema);