import "dotenv/config";
import { MongoClient, Collection, ObjectId } from "mongodb";
import {
  games,
  actionId,
  puzzleId,
  sandboxId,
  survivalId,
  actionAdventureId,
  sportsId,
  racingId,
  battleRoyaleId,
  shooterId,
  adventureId,
  rpgId,
  openWorldId,
  platformId,
  mmorpgId,
  mobaId,
  actionRpgId,
  simulationId,
  horrorId,
  fightingId,
} from "./seedData.js";
import { Game } from "../types/gameType.js";

const genreDocs = [
  { _id: actionId, name: "Action", slug: "action" },
  { _id: puzzleId, name: "Puzzle", slug: "puzzle" },
  { _id: sandboxId, name: "Sandbox", slug: "sandbox" },
  { _id: survivalId, name: "Survival", slug: "survival" },
  {
    _id: actionAdventureId,
    name: "Action-adventure",
    slug: "action-adventure",
  },
  { _id: sportsId, name: "Sports", slug: "sports" },
  { _id: racingId, name: "Racing", slug: "racing" },
  { _id: battleRoyaleId, name: "Battle Royale", slug: "battle-royale" },
  { _id: shooterId, name: "Shooter", slug: "shooter" },
  { _id: adventureId, name: "Adventure", slug: "adventure" },
  { _id: rpgId, name: "RPG", slug: "rpg" },
  { _id: openWorldId, name: "Open World", slug: "open-world" },
  { _id: platformId, name: "Platform", slug: "platform" },
  { _id: mmorpgId, name: "MMORPG", slug: "mmorpg" },
  { _id: mobaId, name: "MOBA", slug: "moba" },
  { _id: actionRpgId, name: "Action RPG", slug: "action-rpg" },
  { _id: simulationId, name: "Simulation", slug: "simulation" },
  { _id: horrorId, name: "Horror", slug: "horror" },
  { _id: fightingId, name: "Fighting", slug: "fighting" },
];

async function seedGames(): Promise<void> {
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error("MONGO_URI is not defined");
  const client = new MongoClient(uri);

  try {
    await client.connect();

    const db = client.db("GameHive");
    const gamesCollection: Collection<Game> = db.collection("games");
    const genresCollection = db.collection("genres");

    for (const genre of genreDocs) {
      await genresCollection.updateOne(
        { _id: genre._id },
        { $setOnInsert: genre },
        { upsert: true },
      );
    }

    console.log("genres seeded");

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
