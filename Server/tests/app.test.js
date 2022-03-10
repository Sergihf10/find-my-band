import request from "supertest";
import app from "../index";
import { deleteUserById } from "../controllers/userController";
import UserModel from "../models/UserModel";
import mongoose from "../models/index";

describe("Post /users", () => {
  describe("given a username and password", () => {
    afterEach(() => {
      UserModel.remove({}, function (e) {});
    });

    //   should save username and password to database

    //   should respond with 200 status code
    test("should respond with a 200 status code", async () => {
      const response = await request(app).post("/users").send({
        email: "user",
        password: "password",
        firstName: "m",
        lastName: "w",
      });
      expect(response.statusCode).toBe(201);
    });
    //should specify json in the content type header
    test("should specify json in the content type header", async () => {
      const response = await request(app).post("/users").send({
        email: "username",
        password: "password",
        firstName: "m",
        lastName: "w",
      });
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    });

    //   should respond with json object containing user Id
    test("response has userID", async () => {
      const response = await request(app).post("/users").send({
        email: "username",
        password: "password",
        firstName: "m",
        lastName: "w",
      });
      console.log(response.body, "response");
      expect(response.body._id).toBeDefined();
    });
  });

  describe("when the username and password is missing", () => {
    // should respond with a status code of 400
    test("should respond with a status code 400 username", async () => {
      const response = await request(app).post("/users").send({
        email: "username",
      });
      expect(response.statusCode).toBe(400);
    });
    test("should respond with a status code 400 password", async () => {
      const response = await request(app).post("/users").send({
        password: "password",
      });
      expect(response.statusCode).toBe(400);
    });
    // if i get time hash password before it getsto database
  });
});
