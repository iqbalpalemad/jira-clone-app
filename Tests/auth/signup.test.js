const supertest = require('supertest');
const app       = require('../../app');
const db        = require('../db');


const request   = supertest(app);


beforeAll(async ()  => await db.connect());
beforeEach(async () => await db.clear());
afterAll(async ()   => await db.close());


describe('Testing signup API', () => {
    test("Testing an invalid signup request", async () => {
        const test_data = {
            email    : "test@test.",
            password : "testpassw0rd"
        }

        const response = await request.post('/auth/signup').send(test_data);
        expect(response.status).toBe(400);
        expect(response.body.result).toBe(false);
    })

    test("Testing a valid signup request and duplicate entry", async () => {
        const test_data = {
            email    : "test@test.com",
            password : "testpassw0rd"
        }

        const response = await request.post('/auth/signup').send(test_data);
        expect(response.status).toBe(201);
        expect(response.body.result).toBe(true);
        const response_re = await request.post('/auth/signup').send(test_data);
        expect(response_re.body.result).toBe(false);
        expect(response_re.body.errors[0].msg).toContain("Email address already taken");
    })

});