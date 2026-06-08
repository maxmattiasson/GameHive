import dotenv from "dotenv";
import app from "./app.js"
import { connectDB } from "./config/db.js";

dotenv.config();

async function main() {
  await connectDB();

  app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
  });
}

main();
