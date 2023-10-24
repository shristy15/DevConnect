const request = require("supertest");
const app = require("../index.js");
let id;
describe("POST /signup", () => {
  test("Given an email and password", async () => {
    const response = await request(app).post("/auth/signup").send({
      email: "test@gmail.com",
      password: "password",
    });
    id = response.body.userId;
    expect(response.statusCode).toBe(201);
    expect(response.body.userId).toBeDefined();
  });
  test("Miss either email/passoword or both", async () => {
    const bodyData = [
      { email: "test@gmail.com" },
      { password: "password" },
      {},
    ];
    for (const body of bodyData) {
      const response = await request(app).post("/auth/signup").send(body);
      expect(response.status).toBe(409);
    }
  });
});

describe("POST /login", () => {
  test("Given a wrong email", async () => {
    const response = await request(app).post("/auth/login").send({
      email: "tet@gmail.com",
      password: "password",
    });
    expect(response.status).toBe(401);
  });
  test("Given a wrong password", async () => {
    const response = await request(app).post("/auth/login").send({
      email: "test@gmail.com",
      password: "passsword",
    });
    expect(response.status).toBe(401);
  });
  test("Given a correct email and password", async () => {
    const response = await request(app).post("/auth/login").send({
      email: "test@gmail.com",
      password: "password",
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.userId).toBeDefined();
  });
  test("Miss either email/pass2word or both", async () => {
    const bodyData = [
      { email: "test@gmail.com" },
      { password: "password" },
      {},
    ];
    for (const body of bodyData) {
      const response = await request(app).post("/auth/login").send(body);
      expect(response.status).toBe(401);
    }
  });
});

describe("DELETE /delete", () => {
  test("When correct userId is provided", async () => {
    const response = await request(app).delete(`/users/delete?user_id=${id}`);
    expect(response.statusCode).toBe(200);
  });
  test("When incorrect userId is provided", async () => {
    const response = await request(app).delete(
      `/users/delete?user_id=${id}abx`
    );
    expect(response.statusCode).toBe(400);
  });
  test("When no userId is provided", async () => {
    const response = await request(app).delete(`/users/delete`);
    expect(response.statusCode).toBe(400);
  });
});
