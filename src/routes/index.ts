import express from "express";
import testemonials from "./testimonialsRoutes";
import users from "./usersRoutes";
import destinations from "./destinationRoutes";
import cors, { CorsOptions } from "cors";

const whiteList = process.env.CORS_ORIGINS_ALLOWED.split(";");
const allowedMethods = process.env.CORS_METHOD_ALLOWED.split(",");

const corOptions: CorsOptions = {
	methods: allowedMethods,
	origin: whiteList,
};

const routes = (app: any) => {
	app.use(cors(corOptions));
	app.use(express.static("uploads"));
	app.use(express.json(), testemonials, users, destinations);
};

export default routes;
