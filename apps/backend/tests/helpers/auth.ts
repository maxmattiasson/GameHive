import request from "supertest";
import app from "../../src/app.js";

export async function signUpAndLogin( email = "test@test.com", username = "testuser", password = "123456"){
    const signupRes = await request(app).post("api/auth/signup").send({
        username, email, password,
    });

    const loginRes = await request(app).post("api/auth/login").send({
        email, password
    })
    const cookie = loginRes.headers["set-cookie"];

    if (!cookie){
        throw new Error("Login did not return cookie")
    }
    return cookie
}