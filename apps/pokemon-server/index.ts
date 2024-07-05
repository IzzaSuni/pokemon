if (process.env.NODE_ENV !== "production") {
  const path = require("path");

  require("dotenv").config({
    path: path.resolve(__dirname, "./.env"),
  });
}

import express from "express";
import helmet from "helmet";
import ConnectDB from "./db/db.config";
import router from "./api/route";

// setup
const app = express();

app.use(express.json());
app.use(helmet());

// connecting to DB
ConnectDB();

// route
app.use("/", router);

app.get("*", (req, res) => {
  return res.send("pokemon-api-server");
});

app.listen(3001, () => {
  console.log("server run on port 3001");
});
