const mongoose = require("mongoose");
const request = require("supertest");
require("dotenv").config();

const app = require("../../app");
const { User } = require("../../models/user");

const { DB_TEST_HOST, PORT } = process.env;

describe("test users routes", () => {
    //   jest.setTimeout(20000);

    let server;
    beforeAll((done) => {
        server = app.listen(PORT);
        done();
    });
    afterAll((done) => {
        server.close();
        mongoose.disconnect();
        done();
    });

    beforeEach((done) => {
        mongoose.connect(DB_TEST_HOST).then(() => done());
    });

    afterEach((done) => {
        mongoose.disconnect();
        done();
    });

    test("test signup route", async () => {
        const newUser = {
            email: "example@example.com",
            password: "examplePassword",
        };
        const signupResponse = await request(app)
            .post("/api/users/signup")
            .send(newUser);
        expect(signupResponse.statusCode).toBe(201);
    });

    test("test login route", async () => {
        const loginUser = {
            email: "example@example.com",
            password: "examplePassword",
        };
        const loginResponse = await request(app)
            .post("/api/users/login")
            .send(loginUser);
        expect(loginResponse.statusCode).toBe(200);
        const { body } = loginResponse;
        expect(body.token).toBeTruthy();
        expect(body.user).toBeTruthy();
        expect(body.user).toMatchObject({
            email: expect.any(String),
            subscription: expect.any(String),
        });
    });
});
