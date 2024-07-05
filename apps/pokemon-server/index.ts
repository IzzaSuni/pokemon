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
import morgan from "morgan";
import pokemonValidator from "./api/middleware/pokemonValidator";

// setup
const app = express();

// middleware

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(pokemonValidator);

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
