const supertest = require('supertest');
const app       = require('../../app');
const db        = require('../db');


const request   = supertest(app);


beforeAll(async ()  => await db.connect());
beforeEach(async () => await db.clear());
afterAll(async ()   => await db.close());


describe('Testing login API', () => {
    test("Testing an invalid login request", async () => {
        const test_data = {
            email    : "test@test.com",
            password : "testpassw0rd"
        }

        const s_response = await request.post('/auth/signup').send(test_data);
        expect(s_response.status).toBe(201);
        expect(s_response.body.result).toBe(true);
        test_data.email = "invalid@test.com";
        const l_response = await request.post('/auth/login').send(test_data);
        expect(l_response.status).toBe(400);
        expect(l_response.body.result).toBe(false);
        expect(l_response.body.message).toContain("email address not found");
        test_data.email = "test@test.com";
        test_data.password = "invalidpassword";
        const i_l_response = await request.post('/auth/login').send(test_data);
        expect(i_l_response.status).toBe(400);
        expect(i_l_response.body.result).toBe(false);
        expect(i_l_response.body.message).toContain("Password doesn't match");
    })

    test("Testing a valid login request", async () => {
        const test_data = {
            email    : "test@test.com",
            password : "testpassw0rd"
        }

        const response = await request.post('/auth/signup').send(test_data);
        expect(response.status).toBe(201);
        expect(response.body.result).toBe(true);
        const l_response = await request.post('/auth/login').send(test_data);
        expect(l_response.status).toBe(200);
        expect(l_response.body.result).toBe(true);
        expect(l_response.body.message).toContain("Logged in successfully");
    })

});