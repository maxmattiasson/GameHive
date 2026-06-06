import request from "supertest";
import app from "../src/app.js";

describe("Auth endpoints", () => {
  test("GET /api/auth/me returns 401 when not logged in", async () => {
    const res = await request(app).get("/api/auth/me");

    expect(res.status).toBe(401);
  });

  test("user can signup, login and access /me", async () => {
    const signupRes = await request(app).post("/api/auth/signup").send({
      username: "testuser",
      email: "test@test.com",
      password: "123456",
    });

    expect(signupRes.status).toBe(201);

    const loginRes = await request(app).post("/api/auth/login").send({
      email: "test@test.com",
      password: "123456",
    });

    expect(loginRes.status).toBe(200);

    const cookie = loginRes.headers["set-cookie"];

    if (!cookie) {
      throw new Error("Login did not return a cookie");
    }

    const meRes = await request(app)
      .get("/api/auth/me")
      .set("Cookie", cookie);

    expect(meRes.status).toBe(200);
    expect(meRes.body.email).toBe("test@test.com");
    expect(meRes.body.username).toBe("testuser");
  });

  test("signup fails with invalid body", async () => {
    const res = await request(app).post("/api/auth/signup").send({
      username: "a",
      email: "not-an-email",
      password: "123",
    });

    expect(res.status).toBe(400);
  });

  test("signup fails if email already exists", async () => {
    await request(app).post("/api/auth/signup").send({
      username: "user1",
      email: "duplicate@test.com",
      password: "123456",
    });

    const res = await request(app).post("/api/auth/signup").send({
      username: "user2",
      email: "duplicate@test.com",
      password: "123456",
    });

    expect(res.status).toBe(400);
  });

  test("login fails with wrong password", async () => {
    await request(app).post("/api/auth/signup").send({
      username: "wrongpassuser",
      email: "wrongpass@test.com",
      password: "123456",
    });

    const res = await request(app).post("/api/auth/login").send({
      email: "wrongpass@test.com",
      password: "wrongpassword",
    });

    expect(res.status).toBe(401);
  });

  test("logout returns 200", async () => {
    const res = await request(app).post("/api/auth/logout");

    expect(res.status).toBe(200);
  });
});