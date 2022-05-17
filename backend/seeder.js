import dotenv from "dotenv";
import itemTypes from "./data/itemTypes.js";
import locationData from "./data/locationData.js";
import itemType from "./models/ItemTypeModel.js";
import location from "./models/locationModel.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await itemType.deleteMany();
    await location.deleteMany();
    await itemType.insertMany(itemTypes);
    await location.insertMany(locationData);
    console.log("Data imported");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await itemType.deleteMany();
    await location.deleteMany();
  } catch (error) {
    console.error(error);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
