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
app.get("*", (req, res) => res.redirect("https://pokemon-discover.vercel.app"));
app.listen(3001, () => console.log("server run on port 3001"));
