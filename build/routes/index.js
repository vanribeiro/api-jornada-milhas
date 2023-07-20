import express from 'express';
import testemonials from './testimonialsRoutes.js';
import users from './userRoutes.js';
const routes = (app) => {
    app.use(express.json(), testemonials, users);
};
export default routes;
