import dotenv from "dotenv";
dotenv.config();

import { env } from "node:process";

const mode = process.env.NODE_ENV || "development";

export const getEnv = () => {
  return {
    ...(env as any),
    isDev: mode === "development",
  };
};
