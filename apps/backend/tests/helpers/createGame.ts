import Game from "../../src/models/Game.js";

export async function createTestGame() {
    return Game.create({
      title: "Test Game",
      release: 2024,
      dev: "Test Dev",
      multiplayer: false,
      thumb: "test.jpg",
    });
  }