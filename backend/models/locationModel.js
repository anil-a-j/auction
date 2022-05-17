import mongoose from "mongoose";

const locationSchema = mongoose.Schema(
  {
    country: {
      type: String,
      required: true,
    },
    states: [{ type: String, required: true }],
  },
  { timestamps: true }
);

const Location = mongoose.model("Location", locationSchema);

export default Location;
