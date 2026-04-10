import "dotenv/config";
import { MongoClient } from "mongodb";
import { games } from "./seedData.js";

async function seedGames() {
  const client = new MongoClient(process.env.MONGO_URI);

  try {
    await client.connect();

    const db = client.db("GameHive");
    const gamesCollection = db.collection("test.games");

    for (const game of games) {
      await gamesCollection.updateOne(
        {
          title: game.title,
          release: game.release,
        },
        {
          $setOnInsert: game,
        },
        {
          upsert: true,
        },
      );
    }

    console.log("Seeding complete");
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

seedGames();
