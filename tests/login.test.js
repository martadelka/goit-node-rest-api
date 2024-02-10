import mongoose from "mongoose";
import request from "supertest";
import dotenv from "dotenv";
dotenv.config();
import { app } from "../app";
import { login } from "../controllers/auth";

const { DB_HOST } = process.env;

const ENDPOINT = "/api/users/login";
const TEST_USER = {
  email: "testing@gmail.com",
  password: "test123",
};

describe("test login controller", () => {
  beforeAll(async () => {
    await mongoose.connect(DB_HOST);
  });
  afterAll(async () => {
    await mongoose.disconnect(DB_HOST);
  });

  test("login controller returns status code 200", async () => {
    const response = await request(app).post(ENDPOINT).send(TEST_USER);
    expect(response.status).toBe(200);
  });
  test("login controller returns token", async () => {
    const response = await request(app).post(ENDPOINT).send(TEST_USER);
    expect(response.body.token).toBeDefined();
  });
  test("login controller returns object user with 2 fields: email and subscription with typeof string", async () => {
    const response = await request(app).post(ENDPOINT).send(TEST_USER);

    expect(response).toBeDefined();
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.user).toMatchObject({
      email: expect.any(String),
      subscription: expect.any(String),
    });
  });
});