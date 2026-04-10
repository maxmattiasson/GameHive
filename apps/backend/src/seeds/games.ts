import "dotenv/config";
import { MongoClient, Collection } from "mongodb";
import { games } from "./seedData.js";
import { Game } from "../types/game.js";

async function seedGames(): Promise<void> {
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error("MONGO_URI is not defined");
  const client = new MongoClient(uri);

  try {
    await client.connect();

    const db = client.db("GameHive");
    const gamesCollection: Collection<Game> = db.collection("test.games");

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
