import request from "supertest";
import app from "../src/app.js";
import { signUpAndLogin } from "./helpers/auth.js";

describe("Profile routes", () => {
  test("GET /api/profile returns 401 when not logged in", async () => {
    const res = await request(app).get("/api/profile");

    expect(res.status).toBe(401);
  });

  test("GET /api/profile returns user when logged in", async () => {
    const cookie = await signUpAndLogin();

    const res = await request(app)
      .get("/api/profile")
      .set("Cookie", cookie);

    expect(res.status).toBe(200);
    expect(res.body.user).toBeDefined();
    expect(res.body.message).toBe("User profile");
  });

  test("GET /api/profile/dev returns 403 for normal user", async () => {
    const cookie = await signUpAndLogin();

    const res = await request(app)
      .get("/api/profile/dev")
      .set("Cookie", cookie);

    expect(res.status).toBe(403);
  });

  test("GET /api/profile/dev returns 200 for dev user", async () => {
    const cookie = await signUpAndLogin(
      "dev",
      "devuser",
      "dev@test.com"
    );

    const res = await request(app)
      .get("/api/profile/dev")
      .set("Cookie", cookie);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("dev profile");
    expect(res.body.user).toBeDefined();
    expect(res.body.user.role).toBe("dev");
  });
});