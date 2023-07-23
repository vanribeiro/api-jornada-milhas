import request from "supertest";
import http from 'http';
import app from "../../app";
import { appDataSource } from "../../config/data-source";

let server: any;

beforeEach(async () => {
    const PORT = 3000;
    server = http.createServer(app).listen(PORT);
    await appDataSource.initialize();
});

afterEach(async () => {
    await appDataSource.destroy();
    server.close();
});

describe('GET /depoimentos', () => {

    test('should fetch all testimonials', async () => {
        const responseUser = await request(app).get('/depoimentos');
        expect(responseUser.statusCode).toBe(200);
    });

    test('should return 404 when the route is wrong', async () => {
        const responseUser = await request(app).get('/depoimento');
        expect(responseUser.statusCode).toBe(404);
    });

});
