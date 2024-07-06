import express from "express";
import helmet from "helmet";
import ConnectDB from "./db/db.config";
import router from "./api/route";
import morgan from "morgan";
import { rateLimit } from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  limit: 100,
  standardHeaders: "draft-7",
  legacyHeaders: false,
});

// setup
const app = express();

// middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(limiter);

// connecting to DB
ConnectDB();

// route
app.use("/", router);
app.get("*", (req, res) => res.redirect("https://pokemon-discover.vercel.app"));
app.listen(3001, () => console.log("server run on port 3001"));
