import request from "supertest";
import app from "../src/app.js";
// import { signUpAndLogin } from "./helpers/auth.js";

test.skip("reviews tests not implemented yet", () => {});
// describe("Review endpoints", () => {
//     test("POST // User can post reviews"), async () => {
//         const cookie  = await signUpAndLogin();
//         const res = await request(app)
//         .post(`/api/games/${game._id}/reviews`)
//         .set("Cookie", cookie)
//         .send({
//           text: "Great game",
//           rating: 5,
//         });
    
//       expect(res.status).toBe(201);
//     }
// })