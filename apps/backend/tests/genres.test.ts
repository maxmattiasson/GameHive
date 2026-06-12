import request from "supertest";
import app from "../src/app.js";
import Genre from "../src/models/Genre.js";

describe("Genre routes", () => {
  test("GET /api/genres returns created genre", async () => {
    await Genre.create({
      name: "RPG",
      slug: "rpg",
    });

    const res = await request(app).get("/api/genres");

    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].name).toBe("RPG");
    expect(res.body[0].slug).toBe("rpg");
  });
});