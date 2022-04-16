import mongoose from "mongoose";

const itemTypeSchema = mongoose.Schema(
  {
    itemGroup: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ItemType = mongoose.model("ItemType", itemTypeSchema);

export default ItemType;
