import request from "supertest";
import http from "http";
import app from "../../app";
import fs from "fs-extra";
import { appDataSource } from "../../config/data-source";
import { imageRepository } from "../../repositories/image";
import Image from "../../models/Image";
import { userRepository } from "../../repositories/user";
import User from "../../models/User";

let server: any;
let userAddedId: any;
const PORT = 3000 || process.env.PORT;

beforeEach(async () => {
	server = http.createServer(app).listen(PORT);
	await appDataSource.initialize();
});

describe("GET /usuarios", () => {
	test("should return 200 when try to fetch all users", async () => {
		const responseUser = await request(app).get("/usuarios");
		expect(responseUser.statusCode).toBe(200);
	});

	test("should return 404 when try to fetch all users when route is wrong", async () => {
		const responseUser = await request(app).get("/usuario");
		expect(responseUser.statusCode).toBe(404);
	});
});

describe("POST /usuarios", () => {
	test("should be able to create a new user", async () => {
		const imagePath = `${__dirname}/mocks/avatar.jpg`;
		const newImage: Image = new Image(
			`http://localhost:${PORT}/users/avatars/mocks/avatar.jpg`
		);

		const imageAdded: Image = await imageRepository.save(newImage);

		await fs.exists(imagePath).then(async (exists) => {
			if (!exists) throw new Error("Essa imagem não exite");
			const result: request.Response = await request(app)
				.post("/usuarios")
				.field("name", "Talita tested")
				.field("photoId", imageAdded.id)
				.attach("avatar", imagePath);
			const { message } = result.body;
			expect(message).toBe("usuario adicionado com sucesso!");
			expect(result.statusCode).toBe(201);

			userAddedId = result.body.userId;
			return result;
		});
	});
});

describe("DELETE /usuarios/:id", () => {
	test("should return 200 when a user is deleted", async () => {
		const result: request.Response = await request(app).delete(
			`/usuarios/${userAddedId}`
		);

		expect(result.statusCode).toBe(200);
	});

	test("should return 404 when there is an attempt to delete a user but the id does not exist", async () => {
		const ID: number = -1;
		const result: request.Response = await request(app).delete(
			`/usuarios/${ID}`
		);
		expect(result.statusCode).toBe(404);
	});
});

describe("UPDATE /usuarios/:id", () => {
	test("should return 201 when a user name is updated", async () => {
		const ID_TO_BE_UPDATE = 23;

		const result: request.Response = await request(app)
			.put(`/usuarios/${ID_TO_BE_UPDATE}`)
			.send({ name: "Marta Tested" });
		expect(result.statusCode).toBe(201);
	});

	test("should return 404 when there is an attempt to update a user name but the id does not exist", async () => {
		const ID: number = 1000;
		const result: request.Response = await request(app)
			.put(`/usuarios/${ID}`)
			.send({ name: "Ana Tested 404" });
		expect(result.statusCode).toBe(404);
	});

	test("should return 201 only when the image is updated", async () => {
		const ID_TO_BE_UPDATE = 27;

		const imagePath: string = `${__dirname}/mocks/avatar.jpg`;
		const user: User | null = await userRepository.findOneBy({ id: ID_TO_BE_UPDATE }); 

		await fs.exists(imagePath).then(async (exists) => {
			if (!exists) throw new Error("Essa imagem não exite");
			const result: request.Response = await request(app)
				.put(`/usuarios/${ID_TO_BE_UPDATE}`)
				.field("name", `${user?.name}`)
				.field("photoId", `${user?.photo}`)
				.attach("avatar", imagePath);
			const { message } = result.body;
			expect(message).toBe("usuario atualizado com sucesso!");
			expect(result.statusCode).toBe(201);

			return result;
		});
	});
});

afterEach(async () => {
	await appDataSource.destroy();
	server.close();
});
