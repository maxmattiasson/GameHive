import request from "supertest";
import app from "../src/app.js";
import UserModel from "../src/models/User.js";
import { createUser } from "./helpers/createUser.js";

describe("User routes", () => {
  test("GET /api/users returns 401 when not logged in", async () => {
    const res = await request(app).get("/api/users");

    expect(res.status).toBe(401);
  });

  test("GET /api/users returns users for normal user", async () => {
    const { cookie } = await createUser("normaluser", "normal@test.com");

    await UserModel.create({
      username: "otheruser",
      email: "other@test.com",
      passwordHash: "fake-hash",
      role: "user",
    });

    const res = await request(app)
      .get("/api/users")
      .set("Cookie", cookie);

    expect(res.status).toBe(200);
    expect(res.body.some((u: any) => u.username === "otheruser")).toBe(true);
  });

  test("GET /api/users/:id returns one user", async () => {
    const { cookie } = await createUser("viewer", "viewer@test.com");

    const targetUser = await UserModel.create({
      username: "targetuser",
      email: "target@test.com",
      passwordHash: "fake-hash",
      role: "user",
    });

    const res = await request(app)
      .get(`/api/users/${targetUser._id}`)
      .set("Cookie", cookie);

    expect(res.status).toBe(200);
    expect(res.body.username).toBe("targetuser");
  });

  test("GET /api/users/:id returns 404 for missing user", async () => {
    const { cookie } = await createUser("viewer", "viewer@test.com");

    const fakeId = new UserModel()._id;

    const res = await request(app)
      .get(`/api/users/${fakeId}`)
      .set("Cookie", cookie);

    expect(res.status).toBe(404);
  });

  test("GET /api/users/search returns matching users", async () => {
    const { cookie } = await createUser("viewer", "viewer@test.com");

    await UserModel.create({
      username: "searchtarget",
      email: "search@test.com",
      passwordHash: "fake-hash",
      role: "user",
    });

    const res = await request(app)
      .get("/api/users/search?query=search")
      .set("Cookie", cookie);

    expect(res.status).toBe(200);
    expect(res.body.some((u: any) => u.username === "searchtarget")).toBe(true);
  });

  test("GET /api/users/search returns 400 for missing query", async () => {
    const { cookie } = await createUser("viewer", "viewer@test.com");

    const res = await request(app)
      .get("/api/users/search")
      .set("Cookie", cookie);

    expect(res.status).toBe(400);
  });
});