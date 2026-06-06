import request from "supertest";
import app from "../src/app.js";
import UserModel from "../src/models/User.js";
import { signUpAndLogin } from "./helpers/auth.js";

describe("User routes", () => {
  test("GET /api/users returns 401 when not logged in", async () => {
    const res = await request(app).get("/api/users");

    expect(res.status).toBe(401);
  });

  test("GET /api/users returns users for normal user", async () => {
    const cookie = await signUpAndLogin("user");

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
    const cookie = await signUpAndLogin("user");

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
});