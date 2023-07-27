import "reflect-metadata";
import app from "./app";
import http from "http";
import dotenv from "dotenv";
import { appDataSource } from "./config/data-source";

dotenv.config();

const port: number = Number(process.env.PORT) || 8120;

if (process.env.NODE_ENV !== "test") {

	appDataSource
		.initialize()
		.then(async () => {
			http.createServer(app).listen(port, () => {
				console.log(`listening at http://localhost:${port}`);
			});
		})
		.catch((error) => console.log(error));
}
