import request from "supertest";
import http from "http";
import app from "../../app";
import { appDataSource } from "../../config/data-source";

let server: any;
let testimonialAddedId: any;

beforeEach(async () => {
	const PORT = 3000;
	server = http.createServer(app).listen(PORT);
	await appDataSource.initialize();
});

describe("GET /depoimentos", () => {
	test("should fetch all testimonials", async () => {
		const result: request.Response = await request(app).get("/depoimentos");
		expect(result.statusCode).toBe(200);
	});

	test("should return 404 when the route is wrong", async () => {
		const result: request.Response = await request(app).get("/depoimento");
		expect(result.statusCode).toBe(404);
	});

	test("should return 200 when one user is fetched", async () => {
		const result: request.Response = await request(app).get(
			"/depoimentos/usuarios/21"
		);
		expect(result.statusCode).toBe(200);
	});

	test("should return 404 when one user is fetched but not found", async () => {
		const result: request.Response = await request(app).get(
			"/depoimentos/usuarios/1000"
		);
		expect(result.statusCode).toBe(404);
	});

	describe("GET /depoimentos-home", () => {
		test("should return 404 when this route was written in the wrong way", async () => {
			const result: request.Response = await request(app).get(
				"/depoiments-home"
			);
			expect(result.statusCode).toBe(404);
		});

		test("should return 200 when /depoimentos-home endpoint is acessed", async () => {
			const result: request.Response = await request(app).get(
				"/depoimentos-home"
			);
			expect(result.statusCode).toBe(200);
		});

		test("should return an array with size equal 03 when /depoimentos-home endpoint is accessed", async () => {
			await request(app)
				.get("/depoimentos-home")
				.then((res) => {
					expect(res.body instanceof Array).toBeTruthy();
					expect(res.body.length).toBe(3);
				});
		});
	});
});

describe("POST /depoimentos", () => {
	test("should return 201 when a testimonial is added", async () => {
		const testemonialUser: any = {
			userId: 125,
			text: "Nunc non lobortis nibh.",
		};

		const result: request.Response = await request(app)
			.post("/depoimentos")
			.send(testemonialUser);

		expect(result.statusCode).toBe(201);
		testimonialAddedId = result.body.testimonialId;
	});

	test("should return 404 when user id null", async () => {
		const testemonial404: any = {
			userId: 1000,
			text: "Nunc non lobortis nibh. [Not Found]",
		};

		const result: request.Response = await request(app)
			.post("/depoimentos")
			.send(testemonial404);

		expect(result.statusCode).toBe(404);
	});
});

describe("DELETE /depoimentos/:id", () => {
	test("should return 200 when a testimonial is deleted", async () => {
		const result: request.Response = await request(app).delete(
			`/depoimentos/${testimonialAddedId}`
		);
		expect(result.statusCode).toBe(200);
	});

	test("should return 404 when there is an attempt to delete a testimonial but the id does not exist", async () => {
		const ID: number = 30;
		const result: request.Response = await request(app).delete(
			`/depoimentos/${ID}`
		);
		expect(result.statusCode).toBe(404);
	});
});

describe("UPDATE /depoimentos/:id", () => {
	test("should return 200 when a testimonial is updated", async () => {
		const ID_TO_BE_UPDATE = 46;
		const testemonialToBeUpDate = {
			userId: 27,
			text: "lorem lorem! update",
		};

		const result: request.Response = await request(app)
			.put(`/depoimentos/${ID_TO_BE_UPDATE}`)
			.send(testemonialToBeUpDate);
		expect(result.statusCode).toBe(201);
	});

	test("should return 404 when there is an attempt to update a testimonial but the id does not exist", async () => {
	    const ID: number = 1000;
		const result: request.Response = await request(app).put(
			`/depoimentos/${ID}`
		);
		expect(result.statusCode).toBe(404);
	});
});

afterEach(async () => {
	await appDataSource.destroy();
	server.close();
});
