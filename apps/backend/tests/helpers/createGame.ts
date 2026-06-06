import Game from "../../src/models/Game.js";

export async function createTestGame() {
  return Game.create({
    title: "Test Game",
    release: new Date("2024-01-01"),
    dev: "Test Dev",
    multiplayer: false,
    thumb: "test.jpg",
    platforms: ["PC"],
    genres: [],
  });
  }