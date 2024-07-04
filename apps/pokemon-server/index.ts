import express, { Request, Response } from "express";

const app = express();

app.listen(3001, () => {
  console.log("server run");
});
