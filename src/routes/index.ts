import express from "express";
import testemonials from "./testimonialsRoutes";
import users from "./userRoutes";

const routes = (app: any) => {
    
    app.use(express.static('uploads'));
	app.use(express.json(), testemonials, users);

};

export default routes;
