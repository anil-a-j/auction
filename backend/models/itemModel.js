import mongoose from "mongoose";

const responseSchema = mongoose.Schema(
  {
    email: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    username: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: false },
    price: { type: Number, required: true },
    expiration: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const ItemSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    itemRequest: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    itemType: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "ItemType",
    },
    country: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Location",
    },
    state: {
      type: String,
      required: true,
    },
    expiration: {
      type: String,
      required: true,
    },
    responses: [responseSchema],
  },
  {
    timestamps: true,
  }
);

const Item = mongoose.model("Item", ItemSchema);

export default Item;
