import express from "express";
import cors from 'cors';
import testemonials from "./testimonialsRoutes";
import users from "./userRoutes";
import { corOptions } from "../config/cors-options";

const routes = (app: any) => {
    
    app.options('*', cors());
    app.use(cors(corOptions));
    app.use(express.static('uploads'));
	app.use(express.json(), testemonials, users);

};

export default routes;
