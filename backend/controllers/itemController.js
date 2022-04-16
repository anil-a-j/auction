import AsyncHandler from "express-async-handler";
import ItemType from "../models/ItemTypeModel.js";
import fs from "fs";
import User from "../models/userModel.js";
import Item from "../models/itemModel.js";

// @desc get all item types
// @route GET /api/item/itemTypes
// @access public
const getItemTypes = AsyncHandler(async (req, res) => {
  const types = await ItemType.find({}).select(["_id", "itemGroup"]);

  if (types) {
    res.status(200).json(types);
  } else {
    res.status(400);
    throw new Error("No Types");
  }
});

// @desc ask item
// @route POST /api/item/askItem
// @access private
const askItem = AsyncHandler(async (req, res) => {
  const { itemRequest, description, itemType, country, state, expireDate } =
    req.body;

  const item = await Item.create({
    user: req.user._id,
    itemRequest,
    description,
    itemType,
    country,
    state,
    expiration: expireDate,
  });

  if (item) {
    res.json({
      _id: item.id,
      itemRequest: item.itemRequest,
      description: item.description,
      type: item.itemType,
      expireDate: item.expiration,
    });
  } else {
    res.status(400);
    throw new Error("Invalid item data");
  }
});

// @desc searchItems
// @route POST /api/item/searchItems
// @access public
const searchItems = AsyncHandler(async (req, res) => {
  const {
    searchQuery,
    type,
    country: searchCountry,
    state: searchState,
  } = req.body;

  const items = await Item.find({
    itemRequest: { $regex: searchQuery, $options: "i" },
    itemType: type,
    country: searchCountry,
    state: searchState,
  }).select("_id user itemRequest description itemType country state");
  //shortcut without match .populate("country","country state")

  if (items) {
    res.status(200).json(items);
  } else {
    res.status(400);
    throw new Error("No Items");
  }
});

export { getItemTypes, askItem, searchItems };
