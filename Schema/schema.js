const mongoose = require("mongoose");

let firstSchema = new mongoose.Schema(
  {
    name: { type: String, uppercase: true },
    email: { type: String, unique: true },
    phone: { type: Number },
    password: { type: String },
  },
  { collection: "final" }
);
module.exports = mongoose.model("firstModel", firstSchema);
