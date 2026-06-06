import request from "supertest";
import app from "../../src/app.js";
import UserModel from "../../src/models/User.js";

export async function signUpAndLogin(  role: "user" | "dev" | "admin" = "user"
) {
    await request(app).post("/api/auth/signup").send({
      username: "testuser",
      email: "test@test.com",
      password: "123456",
    });
  
    if (role !== "user") {
      await UserModel.updateOne(
        { email: "test@test.com" },
        { role }
      );
    }
  
    const loginRes = await request(app)
      .post("/api/auth/login")
      .send({
        email: "test@test.com",
        password: "123456",
      });
  
    const cookie = loginRes.headers["set-cookie"];

if (!cookie) {
  throw new Error("Login did not return cookie");
}

return cookie;
  }