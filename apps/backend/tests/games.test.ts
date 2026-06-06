import request from "supertest"
import app from "../src/app.js";
import { createTestGame } from "./helpers/createGame.js";
import mongoose from "mongoose";

describe("Game routes", () => {
    test("GET /api/games returns games", async () => {
      await createTestGame();
  
      const res = await request(app).get("/api/games");
  
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(1);
      expect(res.body[0].title).toBe("Test Game");
    });
  
    test("GET /api/games/:id returns one game", async () => {
      const game = await createTestGame();
  
      const res = await request(app).get(`/api/games/${game._id}`);
  
      expect(res.status).toBe(200);
      expect(res.body.title).toBe("Test Game");
    });
  
    test("GET /api/games/:id returns 404 for missing game", async () => {
      const fakeId = new mongoose.Types.ObjectId();
  
      const res = await request(app).get(`/api/games/${fakeId}`);
  
      expect(res.status).toBe(404);
    });
  });