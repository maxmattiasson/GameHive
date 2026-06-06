import request from "supertest";
import app from "../src/app.js";
import { createTestGame } from "./helpers/createGame.js";
import mongoose from "mongoose";
import { signUpAndLogin } from "./helpers/auth.js";

const validGameBody = (title = "New Game") => ({
    title,
    release: "2024-01-01",
    dev: "Test Dev",
    multiplayer: false,
    platforms: ["PC"],
    genres: [],
    thumb: "test.jpg",
  });

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

  test("POST /api/games returns 401 when not logged in", async () => {
    const res = await request(app).post("/api/games").send(validGameBody());

    expect(res.status).toBe(401);
  });

  test("POST /api/games returns 403 for user", async () => {
    const cookie = await signUpAndLogin("user");

    const res = await request(app)
      .post("/api/games")
      .set("Cookie", cookie)
      .send(validGameBody());

    expect(res.status).toBe(403);
  });

  test("POST /api/games creates game for dev", async () => {
    const cookie = await signUpAndLogin("dev");

    const res = await request(app)
      .post("/api/games")
      .set("Cookie", cookie)
      .send(validGameBody("Dev Test Game"));

      console.log(res.status, res.body);
    expect(res.status).toBe(201);
    expect(res.body.title).toBe("Dev Test Game");
  });

  test("POST /api/games creates game for admin", async () => {
    const cookie = await signUpAndLogin("admin");

    const res = await request(app)
      .post("/api/games")
      .set("Cookie", cookie)
      .send(validGameBody("Admin Test Game"));

      console.log(res.status, res.body);
    expect(res.status).toBe(201);
    expect(res.body.title).toBe("Admin Test Game");
  });
});