import request from "supertest";
import app from "../src/app.js";
import { createTestGame } from "./helpers/createGame.js";
import { signUpAndLogin } from "./helpers/auth.js";

describe("Library routes", () => {
  test("GET /api/library returns 401 when not logged in", async () => {
    const res = await request(app).get("/api/library");

    expect(res.status).toBe(401);
  });

  test("GET /api/library returns array when logged in", async () => {
    const cookie = await signUpAndLogin();

    const res = await request(app)
      .get("/api/library")
      .set("Cookie", cookie);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("POST /api/library adds game to library", async () => {
    const game = await createTestGame();
    const cookie = await signUpAndLogin();

    const res = await request(app)
      .post("/api/library")
      .set("Cookie", cookie)
      .send({
        gameId: game._id,
      });

    expect(res.status).toBe(201);
    expect(res.body.populated.gameId._id).toBe(game._id.toString());
  });

  test("POST /api/library returns 409 when game is already in library", async () => {
    const game = await createTestGame();
    const cookie = await signUpAndLogin();

    await request(app)
      .post("/api/library")
      .set("Cookie", cookie)
      .send({
        gameId: game._id,
      });

    const res = await request(app)
      .post("/api/library")
      .set("Cookie", cookie)
      .send({
        gameId: game._id,
      });

    expect(res.status).toBe(409);
  });

  test("PATCH /api/library/:gameId updates playtime", async () => {
    const game = await createTestGame();
    const cookie = await signUpAndLogin();

    await request(app)
      .post("/api/library")
      .set("Cookie", cookie)
      .send({
        gameId: game._id,
      });

    const res = await request(app)
      .patch(`/api/library/${game._id}`)
      .set("Cookie", cookie)
      .send({
        playtimeMinutes: 120,
      });

    expect(res.status).toBe(200);
    expect(res.body.playtimeMinutes).toBe(120);
  });

  test("DELETE /api/library/:gameId removes game from library", async () => {
    const game = await createTestGame();
    const cookie = await signUpAndLogin();

    await request(app)
      .post("/api/library")
      .set("Cookie", cookie)
      .send({
        gameId: game._id,
      });

    const res = await request(app)
      .delete(`/api/library/${game._id}`)
      .set("Cookie", cookie);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Library entry removed");
  });

  test("PATCH /api/library/:gameId returns 401 when not logged in", async () => {
    const game = await createTestGame();
  
    const res = await request(app)
      .patch(`/api/library/${game._id}`)
      .send({
        playtimeMinutes: 120,
      });
  
    expect(res.status).toBe(401);
  });

  test("DELETE /api/library/:gameId returns 401 when not logged in", async () => {
    const game = await createTestGame();
  
    const res = await request(app)
      .delete(`/api/library/${game._id}`);
  
    expect(res.status).toBe(401);
  });
});