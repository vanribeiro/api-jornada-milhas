import request from "supertest";
import http from "http";
import app from "../../app";
import fs from "fs-extra";
import { appDataSource } from "../../config/data-source";
import dotenv from "dotenv";

dotenv.config();

let server: any;
let destinationAddedId: any;
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

describe.skip("Destinations Routes", () => {
	describe("GET /destinos", () => {
		test(
			"should return 200 when fetched all destinations",
			async () => {
				const responseDestination = await request(app).get(
					"/destinos/"
				);
				expect(responseDestination.statusCode).toBe(200);
			},
			TIMEOUT
		);

		test(
			"should return 200 when try to fetch one destination",
			async () => {
				const responseDestination = await request(app).get(
					"/destinos/5"
				);
				expect(responseDestination.statusCode).toBe(200);
			},
			TIMEOUT
		);

		test(
			"should return an object with one destination found by id",
			async () => {
				const data = [
					{
						id: 5,
						name: "Bora Bora",
						price: 4000,
						photo: {
							id: 402,
							photo: "http://127.0.0.1:3000/destinos/bora-bora-zSf7Iw==.jpg",
						},
					},
				];

				const responseDestination = await request(app).get(
					"/destinos/5"
				);
				expect(responseDestination.body).toEqual(data);
				expect(responseDestination.statusCode).toEqual(200);
			},
			TIMEOUT
		);

		test(
			"should return 404 when try to fetch all destinations when route is wrong",
			async () => {
				const responseDestination = await request(app).get(
					"/destinos100"
				);
				expect(responseDestination.statusCode).toBe(404);
			},
			TIMEOUT
		);

		test("should return the total of items in destinations array", async () => {
			const responseDestination = await request(app).get("/destinos/");
			expect(responseDestination.body.count).toBe(responseDestination.body.destinations.length);
		});

		test("should return an object fetched via query param", async () => {
			const data = {
				count: 1,
				destinations: [
					{
						id: 9,
						name: "Paris",
						price: 7415,
						photo: {
							id: 406,
							photo: "http://127.0.0.1:3000/destinos/paris-K9MgXg==.jpg",
						},
					},
				],
			};

			const responseDestination = await request(app).get(
				"/destinos/?nome=paris"
			);
			expect(responseDestination.body).toEqual(data);
		});

		test("should return 404 and the 'Nenhum destino foi encontrado' any destination isn't avaiable", async () => {
			const responseDestination = await request(app).get(
				"/destinos/?nome=canal"
			);
			expect(responseDestination.body.message).toBe(
				"Nenhum destino foi encontrado"
			);
			expect(responseDestination.statusCode).toBe(404);
		});
	});

	describe("POST /destinos", () => {
		test(
			"should return 201 when create a new destination",
			async () => {
				const imagePath = `${__dirname}/mocks/avatar.jpg`;

				await fs.exists(imagePath).then(async (exists) => {
					if (!exists) throw new Error("Essa imagem não exite");

					const result: request.Response = await request(app)
						.post("/destinos")
						.set("Content-Type", "application/json")
						.field("name", "Lugar Teste")
						.field("price", 1880)
						.attach("destination", imagePath);

					const { message } = result.body;
					expect(message).toBe("destino adicionado com sucesso!");
					expect(result.statusCode).toBe(201);

					destinationAddedId = result.body.destinationId;

					return result;
				});
			},
			TIMEOUT
		);

		test(
			"should return 400 when try add a empty body",
			async () => {
				await request(app)
					.post("/destinos")
					.set("Content-Type", "application/json")
					.field("name", "")
					.field("price", "")
					.expect(400);
			},
			TIMEOUT
		);

		test(
			"should return 400 when try add a destination but with only price field empty",
			async () => {
				await request(app)
					.post("/destinos")
					.set("Content-Type", "application/json")
					.field("name", "Miami")
					.field("price", "")
					.expect(400)
					.then((item) => {
						expect(item.body.message).toBe(
							"o campo price é obrigatório"
						);
					});
			},
			TIMEOUT
		);

		test(
			"should return 400 when try add a destination but with only name field empty",
			async () => {
				await request(app)
					.post("/destinos")
					.set("Content-Type", "application/json")
					.field("name", "")
					.field("price", 2000)
					.expect(400)
					.then((item) => {
						expect(item.body.message).toBe(
							"o campo name é obrigatório"
						);
					});
			},
			TIMEOUT
		);
	});

	describe("DELETE /destinos/:id", () => {
		test(
			"should return 200 when a destination is deleted",
			async () => {
				const result: request.Response = await request(app).delete(
					`/destinos/${destinationAddedId}`
				);

				expect(result.statusCode).toBe(200);
			},
			10 * 1000
		);

		test(
			"should return 404 when there is an attempt to delete a destination but the id does not exist",
			async () => {
				const ID: number = -1;
				const result: request.Response = await request(app).delete(
					`/destinos/${ID}`
				);
				expect(result.statusCode).toBe(404);
			},
			10 * 1000
		);
	});

	describe("UPDATE /destinos/:id", () => {
		test(
			"should return 201 when a destination name was updated",
			async () => {
				const ID_TO_BE_UPDATE = 53;
				const data = {
					name: `Destino Teste ${getRandomInt(1, 30)}`,
					price: Number(`300${getRandomInt(1, 9)}`),
				};

				await request(app)
					.put(`/destinos/${ID_TO_BE_UPDATE}`)
					.set("Content-Type", "application/json")
					.send(data)
					.expect(201);
			},
			10 * 1000
		);

		test(
			"should return 201 only when the image is updated",
			async () => {
				const ID_TO_BE_UPDATE = 53;

				const imagePath: string = `${__dirname}/mocks/avatar.jpg`;

				await fs.exists(imagePath).then(async (exists) => {
					if (!exists) throw new Error("Essa imagem não exite");

					const result: request.Response = await request(app)
						.put(`/destinos/${ID_TO_BE_UPDATE}`)
						.set("Content-Type", "application/json")
						.attach("destination", imagePath);

					const { message } = result.body;
					expect(message).toBe("destino atualizado com sucesso!");
					expect(result.statusCode).toBe(201);

					return result;
				});
			},
			TIMEOUT
		);

		test(
			"should return 201 only when image and name are updated",
			async () => {
				const ID_TO_BE_UPDATE = 54;

				const imagePath: string = `${__dirname}/mocks/avatar.jpg`;

				await fs.exists(imagePath).then(async (exists) => {
					if (!exists) throw new Error("Essa imagem não exite");

					const result: request.Response = await request(app)
						.put(`/destinos/${ID_TO_BE_UPDATE}`)
						.set("Content-Type", "application/json")
						.field("name", `Destino Testado ${getRandomInt(1, 30)}`)
						.attach("destination", imagePath);

					const { message } = result.body;
					expect(message).toBe("destino atualizado com sucesso!");
					expect(result.statusCode).toBe(201);

					return result;
				});
			},
			TIMEOUT
		);

		test(
			"should return 201 only when image and price are updated",
			async () => {
				const ID_TO_BE_UPDATE = 53;

				const imagePath: string = `${__dirname}/mocks/avatar.jpg`;

				await fs.exists(imagePath).then(async (exists) => {
					if (!exists) throw new Error("Essa imagem não exite");

					const result: request.Response = await request(app)
						.put(`/destinos/${ID_TO_BE_UPDATE}`)
						.set("Content-Type", "application/json")
						.field("price", Number(`500${getRandomInt(1, 30)}`))
						.attach("destination", imagePath);

					const { message } = result.body;
					expect(message).toBe("destino atualizado com sucesso!");
					expect(result.statusCode).toBe(201);

					return result;
				});
			},
			TIMEOUT
		);

		test(
			"should return 404 when there is an attempt to update a destination name but the id does not exist",
			async () => {
				const ID_TO_BE_UPDATE: number = 1001;

				await request(app)
					.put(`/destinos/${ID_TO_BE_UPDATE}`)
					.send({ name: "Destino Não Existe - 404" })
					.expect(404);
			},
			TIMEOUT
		);
	});
});

afterAll(async () => {
	await appDataSource.destroy();
	server.close();
});
