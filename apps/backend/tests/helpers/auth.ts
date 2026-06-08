import request from "supertest";
import app from "../../src/app.js";
import UserModel from "../../src/models/User.js";

export async function signUpAndLogin(
    role: "user" | "dev" | "admin" = "user",
    username = `${role}-${Date.now()}`,
    email = `${role}-${Date.now()}@test.com`
  ) {
    const password = "123456";
  
    await request(app).post("/api/auth/signup").send({
      username,
      email,
      password,
    });
  
    if (role !== "user") {
      await UserModel.updateOne({ email }, { role });
    }
  
    const loginRes = await request(app).post("/api/auth/login").send({
      email,
      password,
    });
  
    const cookie = loginRes.headers["set-cookie"];
  
    if (!cookie) {
      throw new Error("Login did not return cookie");
    }
  
    return cookie;
  }