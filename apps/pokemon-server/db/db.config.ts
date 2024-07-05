import mongoose from "mongoose";

export default async function ConnectDB() {
  mongoose
    .connect("mongodb://localhost:27017/pokemon")
    .then((e) => console.log("db connected"))
    .catch((err) => console.log("db connection error", err?.message));
}
