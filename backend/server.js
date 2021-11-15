///////////////////////////////
// DEPENDENCIES
////////////////////////////////
// get .env variables
require("dotenv").config();
// pull PORT from .env, give default value of 3000
// pull DATABASE_URL from .env
const { PORT = 3000, DATABASE_URL } = process.env;
// import express
const express = require("express");
// create application object
const app = express();
// import mongoose
const mongoose = require("mongoose");
// import middlware
const cors = require("cors");
const morgan = require("morgan");

///////////////////////////////
// DATABASE CONNECTION
////////////////////////////////
// Establish Connection
mongoose.connect(DATABASE_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
// Connection Events
mongoose.connection
  .on("open", () => console.log("Your are connected to mongoose"))
  .on("close", () => console.log("Your are disconnected from mongoose"))
  .on("error", (error) => console.log(error));

///////////////////////////////
// MODELS
////////////////////////////////
const BookmarkSchema = new mongoose.Schema({
  title: String,
  url: String,
  //countryOfOrigin: String,
});

const Bookmark = mongoose.model("Bookmark", BookmarkSchema);

///////////////////////////////
// MiddleWare
////////////////////////////////
app.use(cors()); // to prevent cors errors, open access to all origins
app.use(morgan("dev")); // logging
app.use(express.json()); // parse json bodies

///////////////////////////////
// ROUTES
////////////////////////////////
// create a test route
app.get("/", (req, res) => {
  res.send("hello world");
});

// Bookmark INDEX ROUTE
app.get("/bookmark", async (req, res) => {
  try {
    // send all bookmark
    res.json(await Bookmark.find({}));
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
});

// Bookmark create route
// post request to /bookmark, uses request body to make new bookmark
app.post("/bookmark", async (req, res) => {
  try {
    // screate a new bookmark
    res.json(await Bookmark.create(req.body));
  } catch (error) {
    res.status(400).json({ error });
  }
});

// Bookmark Update ROUTE
app.put("/bookmark/:id", async (req, res) => {
  try {
    // send all bookmark
    res.json(
      await Bookmark.findByIdAndUpdate(req.params.id, req.body, { new: true })
    );
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
});

// Bookmark CDestroy ROUTE
app.delete("/bookmark/:id", async (req, res) => {
  try {
    // send all bookmark
    res.json(await Bookmark.findByIdAndRemove(req.params.id));
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
});

///////////////////////////////
// LISTENER
////////////////////////////////
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));