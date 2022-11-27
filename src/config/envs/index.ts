import {config} from "dotenv"

export const envs = {
  ...process.env,
  ...config().parsed
};
export const isProduction = process.env.NODE_ENV === "production";
