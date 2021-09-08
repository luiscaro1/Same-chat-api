import { resolve } from "path";
import { config } from "dotenv";

config({
  path: resolve(
    __dirname,
    process.env.production === "production" ? "prod.env" : "dev.env"
  ),
});
