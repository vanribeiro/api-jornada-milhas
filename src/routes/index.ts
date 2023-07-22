import express from "express";
import cors from 'cors';
import testemonials from "./testimonialsRoutes.js";
import users from "./userRoutes.js";
import { corOptions } from "../config/cors-options.js";

const routes = (app: any) => {
    
    app.options('*', cors());
    app.use(cors(corOptions));
    app.use(express.static('uploads'));
	app.use(express.json(), testemonials, users);

};

export default routes;
