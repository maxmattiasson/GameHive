import request from "supertest";
import app from "../src/app.js";
import Game from "../src/models/Game.js";
import { createTestGame } from "./helpers/createGame.js";
import { signUpAndLogin } from "./helpers/auth.js";

describe("Review routes", () => {
  test("GET /api/games/:gameId/reviews returns reviews for game", async () => {
    const game = await createTestGame();

    const res = await request(app).get(`/api/games/${game._id}/reviews`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("POST /api/games/:gameId/reviews returns 401 when not logged in", async () => {
    const game = await createTestGame();

    const res = await request(app)
      .post(`/api/games/${game._id}/reviews`)
      .send({
        text: "Great game",
        rating: 5,
      });

    expect(res.status).toBe(401);
  });

  test("POST /api/games/:gameId/reviews creates review when logged in", async () => {
    const game = await createTestGame();
    const cookie = await signUpAndLogin("user");

    const res = await request(app)
      .post(`/api/games/${game._id}/reviews`)
      .set("Cookie", cookie)
      .send({
        text: "Great game",
        rating: 5,
      });

    expect(res.status).toBe(201);
    expect(res.body.text).toBe("Great game");
    expect(res.body.rating).toBe(5);
  });

  test("POST /api/games/:gameId/reviews updates game average rating", async () => {
    const game = await createTestGame();
    const cookie = await signUpAndLogin("user");

    await request(app)
      .post(`/api/games/${game._id}/reviews`)
      .set("Cookie", cookie)
      .send({
        text: "Great game",
        rating: 4,
      });

    const updatedGame = await Game.findById(game._id);

    expect(updatedGame?.avg_rating).toBe(4);
  });

  test("POST /api/games/:gameId/reviews returns 400 for invalid body", async () => {
    const game = await createTestGame();
    const cookie = await signUpAndLogin("user");

    const res = await request(app)
      .post(`/api/games/${game._id}/reviews`)
      .set("Cookie", cookie)
      .send({});

    expect(res.status).toBe(400);
  });
});

test("PATCH /api/reviews/:reviewId updates own review", async () => {
    const game = await createTestGame();
    const cookie = await signUpAndLogin("user");
  
    const createRes = await request(app)
      .post(`/api/games/${game._id}/reviews`)
      .set("Cookie", cookie)
      .send({
        text: "Original review",
        rating: 3,
      });
  
    const reviewId = createRes.body._id;
  
    const res = await request(app)
      .patch(`/api/reviews/${reviewId}`)
      .set("Cookie", cookie)
      .send({
        text: "Updated review",
        rating: 5,
      });
  
    expect(res.status).toBe(200);
    expect(res.body.text).toBe("Updated review");
    expect(res.body.rating).toBe(5);
  });

  test("PATCH /api/reviews/:reviewId returns 403 for non-owner", async () => {
    const game = await createTestGame();
  
    const ownerCookie = await signUpAndLogin(
      "user",
      "owneruser",
      "owner@test.com"
    );
  
    const createRes = await request(app)
      .post(`/api/games/${game._id}/reviews`)
      .set("Cookie", ownerCookie)
      .send({
        text: "Owner review",
        rating: 4,
      });
  
    const reviewId = createRes.body._id;
  
    const otherCookie = await signUpAndLogin(
      "user",
      "otheruser",
      "other@test.com"
    );
  
    const res = await request(app)
      .patch(`/api/reviews/${reviewId}`)
      .set("Cookie", otherCookie)
      .send({
        text: "Hacked review",
      });
  
    expect(res.status).toBe(403);
  });

  test("DELETE /api/reviews/:reviewId deletes own review", async () => {
    const game = await createTestGame();
  
    const cookie = await signUpAndLogin();
  
    const createRes = await request(app)
      .post(`/api/games/${game._id}/reviews`)
      .set("Cookie", cookie)
      .send({
        text: "Delete me",
        rating: 4,
      });
  
    const reviewId = createRes.body._id;
  
    const res = await request(app)
      .delete(`/api/reviews/${reviewId}`)
      .set("Cookie", cookie);
  
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Review deleted");
  });