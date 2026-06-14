import dotenv from "dotenv";
import app from "./app.js";
import { connectDB } from "./config/db.js";
import logger from "./logger.js";

dotenv.config();

async function main() {
  await connectDB();

  app.listen(3000, () => {
    logger.info("Server running on http://localhost:3000");
  });
}

main();
