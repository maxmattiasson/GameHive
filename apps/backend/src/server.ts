import dotenv from "dotenv";
import app from "./app.js";
import { connectDB } from "./config/db.js";
import logger from "./logger.js";

dotenv.config();

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

async function main() {
  await connectDB();

  app.listen(PORT, () => {
    logger.info(`Server running on http://localhost:${PORT}`);
  });
}

main();
