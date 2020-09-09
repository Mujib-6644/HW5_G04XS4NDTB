// With Mongo CLient

const express = require("express");
const app = express();
const port = 5000;
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

const connectMe =
  "mongodb+srv://Rafik:rafikrafik@cluster0.7exdr.mongodb.net/Ghana_Covid";

// DB Name
const dbName = "Ghana_Covid";

// Creating new MongoClient
const client = new MongoClient(connectMe);

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.get("/", (req, res) => {
  // Stating the constants needed
  const db = client.db(dbName, { useUnifiedTopology: true });
  const collection = db.collection("GhanaCovid_data");

  // Finding all the cases
  collection.find({}).toArray(async function (err, cases_list) {
    assert.equal(err, null);
    let cases = await cases_list;
    res.render("index.ejs", { stories: cases });
  });
});

// Connecting to server
client.connect(function (err) {
  assert.equal(null, err);
  console.log("====================================");
  console.log("Connected successfully to DB ");
  console.log("====================================");

  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
});
