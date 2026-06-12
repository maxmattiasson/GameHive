import request from "supertest";
import app from "../src/app.js";
import { createUser } from "./helpers/createUser.js";

describe("Friendship routes", () => {
  test("POST /api/friends/requests sends friend request", async () => {
    const user1 = await createUser("user1", "user1@test.com");
    const user2 = await createUser("user2", "user2@test.com");

    const res = await request(app)
      .post("/api/friends/requests")
      .set("Cookie", user1.cookie)
      .send({ recipient: user2.user._id });

    expect(res.status).toBe(201);
    expect(res.body.status).toBe("pending");
    expect(res.body.requester).toBe(user1.user._id);
    expect(res.body.recipient).toBe(user2.user._id);
  });

  test("POST /api/friends/requests returns 401 when not logged in", async () => {
    const user2 = await createUser("user2", "user2@test.com");

    const res = await request(app)
      .post("/api/friends/requests")
      .send({ recipient: user2.user._id });

    expect(res.status).toBe(401);
  });

  test("POST /api/friends/requests returns 400 when adding yourself", async () => {
    const user1 = await createUser("user1", "user1@test.com");

    const res = await request(app)
      .post("/api/friends/requests")
      .set("Cookie", user1.cookie)
      .send({ recipient: user1.user._id });

    expect(res.status).toBe(400);
  });

  test("POST /api/friends/requests returns 409 for duplicate request", async () => {
    const user1 = await createUser("user1", "user1@test.com");
    const user2 = await createUser("user2", "user2@test.com");

    await request(app)
      .post("/api/friends/requests")
      .set("Cookie", user1.cookie)
      .send({ recipient: user2.user._id });

    const res = await request(app)
      .post("/api/friends/requests")
      .set("Cookie", user1.cookie)
      .send({ recipient: user2.user._id });

    expect(res.status).toBe(409);
  });

  test("GET /api/friends/requests returns pending requests", async () => {
    const user1 = await createUser("user1", "user1@test.com");
    const user2 = await createUser("user2", "user2@test.com");

    await request(app)
      .post("/api/friends/requests")
      .set("Cookie", user1.cookie)
      .send({ recipient: user2.user._id });

    const res = await request(app)
      .get("/api/friends/requests")
      .set("Cookie", user2.cookie);

    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].requester.username).toBe("user1");
  });

  test("PATCH /api/friends/requests/:id/accept accepts request", async () => {
    const user1 = await createUser("user1", "user1@test.com");
    const user2 = await createUser("user2", "user2@test.com");

    const requestRes = await request(app)
      .post("/api/friends/requests")
      .set("Cookie", user1.cookie)
      .send({ recipient: user2.user._id });

    const res = await request(app)
      .patch(`/api/friends/requests/${requestRes.body._id}/accept`)
      .set("Cookie", user2.cookie);

    expect(res.status).toBe(200);
    expect(res.body.status).toBe("accepted");
  });

  test("PATCH /api/friends/requests/:id/accept returns 404 for non-recipient", async () => {
    const user1 = await createUser("user1", "user1@test.com");
    const user2 = await createUser("user2", "user2@test.com");
    const user3 = await createUser("user3", "user3@test.com");

    const requestRes = await request(app)
      .post("/api/friends/requests")
      .set("Cookie", user1.cookie)
      .send({ recipient: user2.user._id });

    const res = await request(app)
      .patch(`/api/friends/requests/${requestRes.body._id}/accept`)
      .set("Cookie", user3.cookie);

    expect(res.status).toBe(404);
  });

  test("GET /api/friends/friends returns accepted friends", async () => {
    const user1 = await createUser("user1", "user1@test.com");
    const user2 = await createUser("user2", "user2@test.com");

    const requestRes = await request(app)
      .post("/api/friends/requests")
      .set("Cookie", user1.cookie)
      .send({ recipient: user2.user._id });

    await request(app)
      .patch(`/api/friends/requests/${requestRes.body._id}/accept`)
      .set("Cookie", user2.cookie);

    const res = await request(app)
      .get("/api/friends/friends")
      .set("Cookie", user1.cookie);

    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].status).toBe("accepted");
  });
});