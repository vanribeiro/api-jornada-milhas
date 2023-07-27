import request from "supertest";
import http from "http";
import app from "../../app";
import fs from "fs-extra";
import { appDataSource } from "../../config/data-source";
import dotenv from "dotenv";

dotenv.config();

let server: any;
let userAddedId: any;
const PORT = 8080 || process.env.PORT;
const TIMEOUT: number = 6 * 1000;

function getRandomInt(min: number, max: number) {
	const MIN = Math.ceil(min);
	const MAX = Math.floor(max);
	return Math.floor(Math.random() * (MAX - MIN) + MIN);
}

beforeAll(async () => {
	await appDataSource.initialize().then(() => {
		server = http.createServer(app).listen(PORT);
	});
});

describe("GET /usuarios", () => {
	
	test("should return 200 when try to fetch all users", async () => {
		const responseUser = await request(app).get("/usuarios");
		expect(responseUser.statusCode).toBe(200);
	}, TIMEOUT);

	test("should return 200 when try to fetch one user", async () => {
		const responseUser = await request(app).get("/usuarios/21");
		expect(responseUser.statusCode).toBe(200);
	}, TIMEOUT);

	test("should return an object with one user data and photo", async () => {

		const data = [{
			"id": 21,
			"name": "Marcia",
			"photo": {
				"id": 15,
				"photo": "http://127.0.0.1:3000/users/avatars/mNSGFa+jkgQJVZJh1t1jnxg6HUVkyZuZPgsdT2ENOx8=.jpg"
			}
		}];

		const responseUser = await request(app).get("/usuarios/21");
		expect(responseUser.body).toEqual(data);
		expect(responseUser.statusCode).toEqual(200);

	}, TIMEOUT);

	test("should return 404 when try to fetch all users when route is wrong", async () => {
		const responseUser = await request(app).get("/usuario");
		expect(responseUser.statusCode).toBe(404);
	}, TIMEOUT);

});

describe.skip("POST /usuarios", () => {

	test("should return 201 when create a new user", async () => {
		const imagePath = `${__dirname}/mocks/avatar.jpg`;

		await fs.exists(imagePath).then(async (exists) => {

			if (!exists) throw new Error("Essa imagem não exite");

			const result: request.Response = await request(app)
				.post("/usuarios")
				.set("Content-Type", "application/json")
				.field("name", "Talita tested")
				.attach("avatar", imagePath);

			const { message } = result.body;
			expect(message).toBe("usuario adicionado com sucesso!");
			expect(result.statusCode).toBe(201);

			userAddedId = result.body.userId;
			return result;
		});
	}, TIMEOUT);

	test("should return 400 when try add a empty body", async () => {
		const imagePath = `${__dirname}/mocks/avatar.jpg`;
			await request(app)
				.post("/usuarios")
				.set("Content-Type", "application/json")
				.field("name", "")
				.attach("avatar", imagePath)
				.expect(400);

	}, TIMEOUT);

});

describe.skip("DELETE /usuarios/:id", () => {
	test("should return 200 when a user is deleted", async () => {
		const result: request.Response = await request(app).delete(
			`/usuarios/${userAddedId}`
		);

		expect(result.statusCode).toBe(200);
	}, 10 * 1000);

	test("should return 404 when there is an attempt to delete a user but the id does not exist", async () => {
		const ID: number = -1;
		const result: request.Response = await request(app).delete(
			`/usuarios/${ID}`
		);
		expect(result.statusCode).toBe(404);
	}, 10 * 1000);
});

describe.skip("UPDATE /usuarios/:id", () => {

	test("should return 201 when a user name is updated", async () => {
		const ID_TO_BE_UPDATE = 23;

		await request(app)
			.put(`/usuarios/${ID_TO_BE_UPDATE}`)
			.set("Content-Type", "application/json")
			.send({ name: `Marta Tested ${getRandomInt(1, 30)}` })
			.expect(201);
		
	}, 10 * 1000);

	test("should return 404 when there is an attempt to update a user name but the id does not exist", async () => {
		const ID_TO_BE_UPDATE: number = 1000;

		await request(app)
			.put(`/usuarios/${ID_TO_BE_UPDATE}`)
			.send({ name: "Ana Tested 404" }).expect(404);

	}, TIMEOUT);

	test("should return 201 only when the image is updated", async () => {
		const ID_TO_BE_UPDATE = 27;

		const imagePath: string = `${__dirname}/mocks/avatar.jpg`;
		
		await fs.exists(imagePath).then(async (exists) => {
			if (!exists) throw new Error("Essa imagem não exite");

			const result: request.Response = await request(app)
				.put(`/usuarios/${ID_TO_BE_UPDATE}`)
				.set("Content-Type", "application/json")
				.attach("avatar", imagePath);

			const { message } = result.body;
			expect(message).toBe("usuario atualizado com sucesso!");
			expect(result.statusCode).toBe(201);

			return result;
		});
	}, TIMEOUT);

	test("should return 201 only when image and name are updated", async () => {
		const ID_TO_BE_UPDATE = 25;

		const imagePath: string = `${__dirname}/mocks/avatar.jpg`;
		
		await fs.exists(imagePath).then(async (exists) => {
			if (!exists) throw new Error("Essa imagem não exite");

			const result: request.Response = await request(app)
				.put(`/usuarios/${ID_TO_BE_UPDATE}`)
				.set("Content-Type", "application/json")
				.field("name", `Livia Tested ${getRandomInt(1, 30)}`)
				.attach("avatar", imagePath);

			const { message } = result.body;
			expect(message).toBe("usuario atualizado com sucesso!");
			expect(result.statusCode).toBe(201);

			return result;
		});
	}, TIMEOUT);
});

afterAll(async () => {
	await appDataSource.destroy();
	server.close();
});
