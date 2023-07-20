import express from 'express';
import testemonials from './testimonialsRoutes.js';
import users from './userRoutes.js';

const routes = (app: any) => {
    app.use(
        express.json(),
        testemonials,
        users
    );
};

export default routes;
