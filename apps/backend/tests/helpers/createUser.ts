import request from "supertest";
import app from "../../src/app.js";
import { signUpAndLogin } from "./auth.js";

export const createUser = async (
    username: string,
    email: string
  ) => {
    const cookie = await signUpAndLogin("user", username, email);
  
    const meRes = await request(app)
      .get("/api/auth/me")
      .set("Cookie", cookie);
  
    return {
      cookie,
      user: meRes.body,
    };
  };