import request from "supertest";
import http from 'http';
import app from "../../app";
import { appDataSource } from "../../config/data-source";
import { imageRepository } from "../../repositories/image";
import Image from "../../models/Image";

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

describe('GET /usuarios', () => {

    test('should fetch all users', async () => {

        const responseUser = await request(app).get('/usuarios');
        expect(responseUser.statusCode).toBe(200);

    });

    test('should be able to create a new user', async () => {

        const responseUser = await request(app).post('/usuarios').send({
            name: 'Talita',
            photoId: 22
        });

        const newImage: Image = new Image('uma_imagem_qualquer.png');
        await imageRepository.save(newImage);
        expect(responseUser.statusCode).toBe(201);

    });

});
