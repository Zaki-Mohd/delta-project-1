require("dotenv").config(); // make sure this is at the top

const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = process.env.ATLASDB_URL;


main()
  .then(() => {
    console.log("connected to DB");
    initDB(); // only call initDB after successful connection
  })
  .catch((err) => {
    console.log("MongoDB connection error:", err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "6783f3853b6d6932a7931364",
  }));
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};
