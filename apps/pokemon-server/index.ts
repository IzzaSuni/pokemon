import express, { Request, Response } from "express";

const app = express();

app.get("/api", (req, res) => {
  return res.send("ahoy");
});

app.listen(3001, () => {
  console.log("server run");
});
