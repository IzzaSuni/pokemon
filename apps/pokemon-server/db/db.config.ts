import mongoose from "mongoose";
import { getEnv } from "../utils/env";

export default async function ConnectDB() {
  mongoose
    .connect(
      getEnv().isDev
        ? "mongodb://localhost:27017/pokemon"
        : process.env.DB_URL || ""
    )
    .then((e) => console.log("db connected"))
    .catch((err) => console.log("db connection error", err?.message));
}
