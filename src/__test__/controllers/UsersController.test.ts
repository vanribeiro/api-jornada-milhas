import request from "supertest";
import { app } from "../../app";
import { imageRepository } from "../../repositories/image";
import Image from "../../models/Image";

describe('Create a new user', () => {
    
    test('should be able to create a new user', async () => {

        const responseUser = await request(app).post('/usuarios').send({
            name: 'Talita',
            photoId: 22
        });

        const newImage: Image = new Image('uma_imagem_qualquer.png');
        await imageRepository.save(newImage);
        expect(responseUser.statusCode).toBe(200);

    });

    test('should fetch all users', async () => {

        const responseUser = await request(app).get('/usuarios');
        expect(responseUser.statusCode).toBe(200);

    });

});
