import AsyncHandler from "express-async-handler";
import Location from "../models/locationModel.js";

// @desc send country names
// @route GET /api/location/countries
// @access public
const countries = AsyncHandler(async (req, res) => {
  const countries = await Location.find({}).select(["_id", "country"]);

  if (countries) {
    res.status(200).json(countries);
  } else {
    res.status(400);
    throw new Error("No countries");
  }
});

// @desc send state names
// @route GET /api/location/states/:id
// @access public
const states = AsyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await Location.findById(id).select(["-_id", "states"]);

  if (result) {
    res.status(200).json(result.states);
  } else {
    res.status(400);
    throw new Error("No states");
  }
});

export { countries, states };
